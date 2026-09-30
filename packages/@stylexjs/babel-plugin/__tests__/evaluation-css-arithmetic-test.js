/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { transform, stylexPlugin } = require('./__fixtures__/css-arithmetic');
function transformWithConstants(source) {
  const tokens = transform(
    `
      import * as stylex from '@stylexjs/stylex';
      export const constants = stylex.defineConsts({
        a: 26,
        gutter: '16px',
        text: 'hello',
        url: 'https://example.com/x.png',
        line: 'sidebar',
      });
      export const variables = stylex.defineVars({ gap: '8px' });
    `,
    '/src/arithmetic.stylex.js',
  );
  const main = transform(source);
  return {
    metadata: main.metadata.stylex,
    css: stylexPlugin.processStylexRules(
      [...tokens.metadata.stylex, ...main.metadata.stylex],
      {
        useLayers: false,
      },
    ),
  };
}

describe('arithmetic regression snapshots', () => {
  test('calc-shaped keys in intermediate JavaScript lookup tables', () => {
    expect(
      transformWithConstants(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const gutter = constants.gutter;
      const local = constants.a;
      const key = 'calc(100% - 10px)';
      const values = {
        [key]: 0.5,
      };
      export const styles = stylex.create({
        root: {
          opacity: values[key],
        },
      });
    `),
    ).toMatchInlineSnapshot(`
      {
        "css": ":root, .x1w9femo{--x1ez17s4:8px;}
      .xbyyjgo:not(#\\#){opacity:.5}",
        "metadata": [
          [
            "xbyyjgo",
            {
              "ltr": ".xbyyjgo{opacity:.5}",
              "rtl": null,
            },
            3000,
          ],
        ],
      }
    `);
  });

  test('imported constants inside quoted content', () => {
    expect(
      transformWithConstants(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const gutter = constants.gutter;
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          content: \`"\${constants.text}"\`,
        },
      });
    `),
    ).toMatchInlineSnapshot(`
      {
        "css": ":root, .x1w9femo{--x1ez17s4:8px;}
      .x1319nye:not(#\\#){content:"hello"}",
        "metadata": [
          [
            "x1319nye",
            {
              "ltr": ".x1319nye{content:"var(--x1nahs8e)"}",
              "rtl": null,
            },
            3000,
          ],
        ],
      }
    `);
  });

  test('imported constants inside quoted URLs', () => {
    expect(
      transformWithConstants(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const gutter = constants.gutter;
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          backgroundImage: \`url("\${constants.url}")\`,
        },
      });
    `),
    ).toMatchInlineSnapshot(`
      {
        "css": ":root, .x1w9femo{--x1ez17s4:8px;}
      .x1xmaqyp:not(#\\#){background-image:url("https://example.com/x.png")}",
        "metadata": [
          [
            "x1xmaqyp",
            {
              "ltr": ".x1xmaqyp{background-image:url("var(--x1fhnzir)")}",
              "rtl": null,
            },
            3000,
          ],
        ],
      }
    `);
  });

  test('imported constants inside grid line brackets', () => {
    expect(
      transformWithConstants(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const gutter = constants.gutter;
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          gridTemplateColumns: \`[\${constants.line}] 1fr\`,
        },
      });
    `),
    ).toMatchInlineSnapshot(`
      {
        "css": ":root, .x1w9femo{--x1ez17s4:8px;}
      .x1w9nni0:not(#\\#){grid-template-columns:[sidebar] 1fr}",
        "metadata": [
          [
            "x1w9nni0",
            {
              "ltr": ".x1w9nni0{grid-template-columns:[var(--x1idfbv)] 1fr}",
              "rtl": null,
            },
            3000,
          ],
        ],
      }
    `);
  });

  test('CSS failures retain the original expression through an arrow helper', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const round = (value) => Math.round(value);
      export const styles = stylex.create({
        root: {
          zIndex: round(constants.a),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.round" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


        2 |       import * as stylex from '@stylexjs/stylex';
        3 |       import { constants, variables } from 'arithmetic.stylex';
      > 4 |       const round = (value) => Math.round(value);
          |                                ^^^^^^^^^^^^^^^^^
        5 |       export const styles = stylex.create({
        6 |         root: {
        7 |           zIndex: round(constants.a),"
    `);
  });

  test('slash-separated imported constants and variables in templates', () => {
    expect(
      transformWithConstants(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const gutter = constants.gutter;
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          borderRadius: \`\${gutter}/\${variables.gap}\`,
        },
      });
    `),
    ).toMatchInlineSnapshot(`
      {
        "css": ":root, .x1w9femo{--x1ez17s4:8px;}
      .x1d5sp0r:not(#\\#){border-radius:16px / var(--x1ez17s4)}",
        "metadata": [
          [
            "x1d5sp0r",
            {
              "ltr": ".x1d5sp0r{border-radius:var(--x42dvfa) / var(--x1ez17s4)}",
              "rtl": null,
            },
            2000,
          ],
        ],
      }
    `);
  });

  test('template prefixes retain the offending token boundary in diagnostics', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          transform: \`translateX(\${constants.gutter}px)\`,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Joining a StyleX variable or constant directly to other text with "+" would
      produce invalid CSS. For arithmetic, use numbers or other variables or
      constants (compiles to a CSS calc() expression). For a list of values,
      include an explicit separator, e.g. 'solid ' + token.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           transform: \`translateX(\${constants.gutter}px)\`,
          |                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('modern CSS length units survive constant substitution', () => {
    expect(
      transformWithConstants(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const gutter = constants.gutter;
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          width: gutter - '2cqw',
          height: gutter - '2cqi',
          marginTop: gutter - '2svmin',
          paddingTop: gutter - '2dvb',
          fontSize: gutter - '2rcap',
        },
      });
    `),
    ).toMatchInlineSnapshot(`
      {
        "css": ":root, .x1w9femo{--x1ez17s4:8px;}
      .x1gogj6f:not(#\\#){font-size:calc(16px - 2rcap)}
      .xfgf0vk:not(#\\#):not(#\\#){height:calc(16px - 2cqi)}
      .x11rugz5:not(#\\#):not(#\\#){margin-top:calc(16px - 2svmin)}
      .xe27ax8:not(#\\#):not(#\\#){padding-top:calc(16px - 2dvb)}
      .x20rgyk:not(#\\#):not(#\\#){width:calc(16px - 2cqw)}",
        "metadata": [
          [
            "x20rgyk",
            {
              "ltr": ".x20rgyk{width:calc(var(--x42dvfa) - 2cqw)}",
              "rtl": null,
            },
            4000,
          ],
          [
            "xfgf0vk",
            {
              "ltr": ".xfgf0vk{height:calc(var(--x42dvfa) - 2cqi)}",
              "rtl": null,
            },
            4000,
          ],
          [
            "x11rugz5",
            {
              "ltr": ".x11rugz5{margin-top:calc(var(--x42dvfa) - 2svmin)}",
              "rtl": null,
            },
            4000,
          ],
          [
            "xe27ax8",
            {
              "ltr": ".xe27ax8{padding-top:calc(var(--x42dvfa) - 2dvb)}",
              "rtl": null,
            },
            4000,
          ],
          [
            "x1gogj6f",
            {
              "ltr": ".x1gogj6f{font-size:calc(var(--x42dvfa) - 2rcap)}",
              "rtl": null,
            },
            3000,
          ],
        ],
      }
    `);
  });

  test('Math-derived divisors retain their precision after constant substitution', () => {
    expect(
      transformWithConstants(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const gutter = constants.gutter;
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local / Math.pow(10, -5),
        },
      });
    `),
    ).toMatchInlineSnapshot(`
      {
        "css": ":root, .x1w9femo{--x1ez17s4:8px;}
      .x4pdra:not(#\\#){z-index:calc(26 / .00001)}",
        "metadata": [
          [
            "x4pdra",
            {
              "ltr": ".x4pdra{z-index:calc(var(--xkc4to4) / .00001)}",
              "rtl": null,
            },
            3000,
          ],
        ],
      }
    `);
  });
});
