/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { transformSync } = require('@babel/core');
const stylexPlugin = require('../src/index').default;
const { utils } = require('../src/shared');

const token = (group, key) =>
  `var(--x${utils.hash(`arithmetic.stylex.js//${group}.${key}`)})`;
const a = token('constants', 'a');
const gap = token('variables', 'gap');

function transform(source, filename = '/src/main.js') {
  return transformSync(source, {
    filename,
    babelrc: false,
    plugins: [[stylexPlugin, { unstable_moduleResolution: { type: 'haste' } }]],
  });
}

function compile(value, { setup = '', property = 'zIndex' } = {}) {
  const result = transform(`
    import * as stylex from '@stylexjs/stylex';
    import { constants, variables } from 'arithmetic.stylex';
    ${setup}
    export const styles = stylex.create({ root: { ${property}: ${value} } });
  `);
  return result.metadata.stylex.map(([, rule]) => rule.ltr).join('\n');
}

describe('CSS token arithmetic through local bindings', () => {
  test.each([
    ['value alias', 'const local = constants.a;', 'local + 2'],
    [
      'alias chain',
      'const first = constants.a; const local = first;',
      'local + 2',
    ],
    ['group alias', 'const local = constants;', 'local.a + 2'],
    ['computed member', "const key = 'a';", 'constants[key] + 2'],
    [
      'object member',
      'const local = { value: constants.a };',
      'local.value + 2',
    ],
    ['array member', 'const local = [constants.a];', 'local[0] + 2'],
    ['computed expression alias', 'const local = constants.a + 2;', 'local'],
    ['arrow helper', 'const add = (value) => value + 2;', 'add(constants.a)'],
    ['Number alias', 'const local = Number(constants.a);', 'local + 2'],
    ['String alias', 'const local = String(constants.a);', 'local + 2'],
  ])('%s retains the imported token', (_name, setup, expression) => {
    expect(compile(expression, { setup })).toContain(`z-index:calc(${a} + 2)`);
  });

  test('reuses a derived alias without losing expression grouping', () => {
    const css = compile('derived / (derived - 1)', {
      setup: 'const local = constants.a; const derived = (local + 2) * 3;',
    });
    expect(css).toContain(
      `z-index:calc(((${a} + 2) * 3) / (((${a} + 2) * 3) - 1))`,
    );
  });

  test.each([
    ['2 - constants.a', `2 - ${a}`],
    ['2 / constants.a', `2 / ${a}`],
    [
      'constants.a - (constants.b - 2)',
      `${a} - (${token('constants', 'b')} - 2)`,
    ],
    ['-(constants.a + 2)', `-1 * (${a} + 2)`],
    ['constants.a * -2', `${a} * -2`],
    ['constants.a * 0', `${a} * 0`],
  ])('preserves the meaning of %s', (expression, expected) => {
    expect(compile(expression)).toContain(`z-index:calc(${expected})`);
  });
});

describe('Math functions with CSS tokens', () => {
  test.each([
    ['Math.abs(-2)', 2],
    ['Math.ceil(1.1)', 2],
    ['Math.floor(2.9)', 2],
    ['Math.round(1.6)', 2],
    ['Math.trunc(2.9)', 2],
    ['Math.min(2, 3)', 2],
    ['Math.max(1, 2)', 2],
    ['Math.pow(2, 3)', 8],
    ['Math.sqrt(4)', 2],
    ['Math.cbrt(8)', 2],
    ['Math.hypot(3, 4)', 5],
    ['Math.sign(-2)', -1],
    ['Math.sin(0)', 0],
    ['Math.cos(0)', 1],
    ['Math.tan(0)', 0],
    ['Math.log(1)', 0],
    ['Math.exp(0)', 1],
  ])('evaluates numeric %s before token arithmetic', (expression, expected) => {
    expect(
      compile('local * scale', {
        setup: `const local = constants.a; const scale = ${expression};`,
      }),
    ).toContain(`z-index:calc(${a} * ${expected})`);
  });

  test.each([
    'abs',
    'ceil',
    'floor',
    'round',
    'trunc',
    'min',
    'max',
    'sqrt',
    'cbrt',
    'sign',
    'sin',
    'cos',
    'tan',
    'asin',
    'acos',
    'atan',
    'log',
    'log2',
    'log10',
    'exp',
    'expm1',
    'fround',
    'clz32',
  ])('rejects Math.%s on a locally aliased token', (method) => {
    expect(() =>
      compile(`Math.${method}(local)`, {
        setup: 'const local = constants.a;',
      }),
    ).toThrow(`"Math.${method}" function cannot be applied`);
  });

  test.each(['min', 'max', 'pow', 'hypot', 'atan2', 'imul'])(
    'rejects Math.%s with a token in either argument',
    (method) => {
      for (const args of ['local, 2', '2, local']) {
        expect(() =>
          compile(`Math.${method}(${args})`, {
            setup: 'const local = constants.a + 1;',
          }),
        ).toThrow(`"Math.${method}" function cannot be applied`);
      }
    },
  );

  test.each(['NaN', 'Infinity', '-Infinity', 'Math.sqrt(-1)', 'Math.log(0)'])(
    'rejects non-finite operand %s',
    (expression) => {
      expect(() => compile(`constants.a * (${expression})`)).toThrow(
        /requires the other operand/,
      );
    },
  );
});

describe('CSS variable composition', () => {
  test.each([
    ["'var(--gap)'", 'var(--gap)'],
    ["'var(--gap, 8px)'", 'var(--gap,8px)'],
    ["'calc(var(--gap) + 8px)'", '(var(--gap) + 8px)'],
    ['variables.gap', gap],
    ["variables['--größe']", 'var(--größe)'],
  ])('multiplies %s through a local alias', (expression, expected) => {
    expect(
      compile('local * 2', {
        setup: `const local = ${expression};`,
        property: 'width',
      }),
    ).toContain(`width:calc(${expected} * 2)`);
  });

  test.each(['8px', '1.5rem', '50%', '-2em', '2dvh', '2PX', '1e2px'])(
    'subtracts a %s length from a variable',
    (length) => {
      const css = compile(`variables.gap - '${length}'`, { property: 'width' });
      expect(css).toContain(`width:calc(${gap} - ${length})`);
    },
  );

  test('sets a custom property using a computed token key', () => {
    expect(
      compile('constants.a * 2', { property: '[variables.gap]' }),
    ).toContain(`${gap.slice(4, -1)}:calc(${a} * 2)`);
  });

  test.each([
    [
      '`translateX(${variables.gap * 2})`',
      'transform',
      `translateX(calc(${gap} * 2))`,
    ],
    ['`min(${variables.gap}, 40px)`', 'width', `min(${gap},40px)`],
    ['`max(10px, ${variables.gap})`', 'width', `max(10px,${gap})`],
    [
      '`clamp(8px, ${variables.gap * 2}, 40px)`',
      'width',
      `clamp(8px,calc(${gap} * 2),40px)`,
    ],
    ['variables.gap + " 4px"', 'margin', `${gap} 4px`],
    ['`var(--override, ${variables.gap})`', 'width', `var(--override,${gap})`],
  ])('preserves CSS composition: %s', (expression, property, expected) => {
    expect(compile(expression, { property })).toContain(expected);
  });

  test('arithmetic inside fallback arrays and conditional values', () => {
    const css = compile(
      `{
      default: [variables.gap, variables.gap * 2],
      ':hover': variables.gap * 3,
      '@media (min-width: 600px)': variables.gap / 2,
    }`,
      { property: 'width' },
    );
    expect(css).toContain(`width:${gap};width:calc(${gap} * 2)`);
    expect(css).toContain(`:hover{width:calc(${gap} * 3)}`);
    expect(css).toContain('@media (min-width: 600px)');
    expect(css).toContain(`width:calc(${gap} / 2)`);
  });

  test('same-file sibling variable arithmetic preserves CSS references', () => {
    const { metadata } = transform(
      `
      import * as stylex from '@stylexjs/stylex';
      export const variables = stylex.defineVars({
        gap: '8px',
        doubled: () => variables.gap * Math.max(1, 2),
        negative: () => -variables.gap,
      });
    `,
      '/src/arithmetic.stylex.js',
    );
    const css = metadata.stylex.map(([, rule]) => rule.ltr).join('\n');
    expect(css).toContain(`calc(${gap} * 2)`);
    expect(css).toContain(`calc(-1 * ${gap})`);
  });
});

describe('CSS arithmetic after cross-file constant substitution', () => {
  const definitions = `
    import * as stylex from '@stylexjs/stylex';
    export const constants = stylex.defineConsts({ a: 26, b: 14, gutter: '16px' });
    export const variables = stylex.defineVars({ gap: '8px' });
  `;

  test('resolves alias chains, numeric Math, mixed variables, and CSS functions', () => {
    const tokens = transform(definitions, '/src/arithmetic.stylex.js');
    const main = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants as imported, variables } from 'arithmetic.stylex';
      const local = imported.a;
      const alias = local;
      const scale = Math.max(Math.floor(2.9), Math.sqrt(4));
      const combined = (alias + imported.b) / scale;
      const gutter = imported.gutter;
      export const styles = stylex.create({ root: {
        zIndex: combined,
        paddingTop: gutter * scale,
        marginTop: gutter + variables.gap,
        width: \`clamp(8px, \${gutter * scale}, 100px)\`,
      } });
    `);
    const rules = [...tokens.metadata.stylex, ...main.metadata.stylex];
    for (const metadata of [rules, [...rules].reverse()]) {
      const css = stylexPlugin.processStylexRules(metadata, {
        useLayers: false,
      });
      expect(css).toContain('z-index:calc((26 + 14) / 2)');
      expect(css).toContain('padding-top:calc(16px * 2)');
      expect(css).toContain(`margin-top:calc(16px + ${gap})`);
      expect(css).toContain('width:clamp(8px,calc(16px * 2),100px)');
      expect(css).not.toContain(a);
    }
  });
});

describe('error propagation through aliases and style containers', () => {
  test.each([
    ['local', 'const local = Math.round(constants.a);'],
    ['local.value', 'const local = { value: Math.round(constants.a) };'],
    ['local[0]', 'const local = [Math.round(constants.a)];'],
    ['[0, local]', 'const local = Math.round(constants.a);'],
    [
      '{ default: 0, ":hover": local }',
      'const local = Math.round(constants.a);',
    ],
  ])('keeps the Math diagnostic for %s', (expression, setup) => {
    expect(() => compile(expression, { setup })).toThrow(
      '"Math.round" function cannot be applied',
    );
  });

  test.each(['==', '!=', '===', '!==', '<', '<=', '>', '>='])(
    'rejects aliased token comparison with %s',
    (operator) => {
      expect(() =>
        compile(`local ${operator} 2 ? 1 : 0`, {
          setup: 'const local = constants.a;',
        }),
      ).toThrow(`cannot be compared with "${operator}"`);
    },
  );

  test.each([
    ['local == null', 0],
    ['local != null', 1],
    ['null === local', 0],
    ['null !== local', 1],
    ['local === undefined', 0],
    ['local !== undefined', 1],
  ])('preserves nullish guard %s', (condition, expected) => {
    expect(
      compile(`${condition} ? 1 : 0`, {
        setup: 'const local = constants.a;',
      }),
    ).toContain(`z-index:${expected}`);
  });

  test.each(['%', '**', '&', '|', '^', '<<', '>>', '>>>'])(
    'rejects aliased token operator %s',
    (operator) => {
      expect(() =>
        compile(`local ${operator} 2`, {
          setup: 'const local = constants.a;',
        }),
      ).toThrow(`"${operator}" operator cannot be applied`);
    },
  );

  test('rejects token misuse in a static part of a dynamic style', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: (opacity) => ({ opacity, zIndex: Math.round(local) }),
      });
    `),
    ).toThrow('"Math.round" function cannot be applied');
  });
});

describe('arithmetic regression coverage', () => {
  test.each([
    '`${variables.gap}/${variables.other}`',
    "variables.gap + '/' + variables.other",
  ])('allows the CSS slash separator in %s', (expression) => {
    expect(compile(expression, { property: 'borderRadius' })).toContain(
      `${gap} / ${token('variables', 'other')}`,
    );
  });

  test.each([
    ['`calc(${constants.a}*2)`', `calc(${a}*2)`],
    ['`calc(2*${constants.a})`', `calc(2*${a})`],
    ['`calc(${constants.a}/2)`', `calc(${a}/2)`],
    ['`calc(2/${constants.a})`', `calc(2/${a})`],
  ])('preserves CSS math template %s', (expression, expected) => {
    expect(compile(expression)).toContain(expected);
  });

  test('does not round a nonzero divisor down to zero', () => {
    expect(compile('constants.a / Math.pow(10, -5)')).toContain(
      `z-index:calc(${a} / .00001)`,
    );
  });

  test.each([
    'rex',
    'rch',
    'rcap',
    'ric',
    'svb',
    'svi',
    'svmin',
    'svmax',
    'lvb',
    'lvi',
    'lvmin',
    'lvmax',
    'dvb',
    'dvi',
    'dvmin',
    'dvmax',
    'cqw',
    'cqh',
    'cqi',
    'cqb',
    'cqmin',
    'cqmax',
  ])('accepts modern CSS length %s in arithmetic', (unit) => {
    expect(
      compile(`constants.gutter - '2${unit}'`, {
        property: 'width',
      }),
    ).toContain(`width:calc(${token('constants', 'gutter')} - 2${unit})`);
  });

  test.each([
    '`translateX(${constants.gutter}px)`',
    '`translateX(${constants.gutter}${""}px)`',
    '`translateX(${constants.gutter * 2}px)`',
    '`translate(${constants.gutter}px, 0)`',
    '`translate(${constants.gutter}${constants.gutter})`',
    '`translateX(px${constants.gutter})`',
  ])('rejects jammed interpolation in %s', (expression) => {
    expect(() => compile(expression, { property: 'transform' })).toThrow(
      /would\s+produce invalid CSS/,
    );
  });

  test.each([
    '`translateX(${constants.gutter})`',
    '`translateX(${""}${constants.gutter}${""})`',
  ])('preserves separated interpolation in %s', (expression) => {
    expect(compile(expression, { property: 'transform' })).toContain(
      `translateX(${token('constants', 'gutter')})`,
    );
  });
});

// Snapshot the final CSS after resolving imported constants, as well as the
// diagnostic for an invalid interpolation, so these fixes can be reviewed directly.
describe('arithmetic regression snapshots', () => {
  function cssFor(body) {
    const tokens = transform(
      `
      import * as stylex from '@stylexjs/stylex';
      export const constants = stylex.defineConsts({
        a: 26,
        gutter: '16px',
      });
      export const variables = stylex.defineVars({ gap: '8px' });
    `,
      '/src/arithmetic.stylex.js',
    );
    const main = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const gutter = constants.gutter;
      const local = constants.a;
      export const styles = stylex.create({ root: { ${body} } });
    `);
    return stylexPlugin.processStylexRules(
      [...tokens.metadata.stylex, ...main.metadata.stylex],
      { useLayers: false },
    );
  }

  test('slash-separated imported constants and variables in templates', () => {
    expect(cssFor('borderRadius: `${gutter}/${variables.gap}`'))
      .toMatchInlineSnapshot(`
      ":root, .x1w9femo{--x1ez17s4:8px;}
      .x1d5sp0r:not(#\\#){border-radius:16px / var(--x1ez17s4)}"
    `);
  });

  test('template prefixes retain the offending token boundary in diagnostics', () => {
    expect(() =>
      compile('`translateX(${constants.gutter}px)`', {
        property: 'transform',
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Joining a StyleX variable or constant directly to other text with "+" would
      produce invalid CSS. For arithmetic, use numbers or other variables or
      constants (compiles to a CSS calc() expression). For a list of values,
      include an explicit separator, e.g. 'solid ' + token.


        3 |     import { constants, variables } from 'arithmetic.stylex';
        4 |     
      > 5 |     export const styles = stylex.create({ root: { transform: \`translateX(\${constants.gutter}px)\` } });
          |                                                              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        6 |   "
    `);
  });

  test('modern CSS length units survive constant substitution', () => {
    expect(
      cssFor(`
      width: gutter - '2cqw',
      height: gutter - '2cqi',
      marginTop: gutter - '2svmin',
      paddingTop: gutter - '2dvb',
      fontSize: gutter - '2rcap',
    `),
    ).toMatchInlineSnapshot(`
      ":root, .x1w9femo{--x1ez17s4:8px;}
      .x1gogj6f:not(#\\#){font-size:calc(16px - 2rcap)}
      .xfgf0vk:not(#\\#):not(#\\#){height:calc(16px - 2cqi)}
      .x11rugz5:not(#\\#):not(#\\#){margin-top:calc(16px - 2svmin)}
      .xe27ax8:not(#\\#):not(#\\#){padding-top:calc(16px - 2dvb)}
      .x20rgyk:not(#\\#):not(#\\#){width:calc(16px - 2cqw)}"
    `);
  });

  test('Math-derived divisors retain their precision after constant substitution', () => {
    expect(cssFor('zIndex: local / Math.pow(10, -5)')).toMatchInlineSnapshot(`
      ":root, .x1w9femo{--x1ez17s4:8px;}
      .x4pdra:not(#\\#){z-index:calc(26 / .00001)}"
    `);
  });
});
