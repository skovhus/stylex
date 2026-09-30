/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

jest.autoMockOff();
jest.mock('@dual-bundle/import-meta-resolve');

/* eslint-disable quotes */
const { transformSync } = require('@babel/core');
const stylexPlugin = require('../src/index');
const jsx = require('@babel/plugin-syntax-jsx');
const options = {
  classNamePrefix: '__hashed_var__',
};

function transform(source, opts = options) {
  return transformSync(source, {
    filename: opts.filename ?? 'test.js',
    parserOpts: {
      flow: 'all',
    },
    babelrc: false,
    plugins: [
      jsx,
      [
        stylexPlugin,
        {
          treeshakeCompensation: true,
          runtimeInjection: true,
          unstable_moduleResolution: {
            type: 'haste',
          },
          ...opts,
        },
      ],
    ],
  });
}

describe('Invalid imported token operations', () => {
  test("token + jammed string throws instead of emitting broken CSS: MyTheme.a + '10px'", () => {
    expect(() =>
      transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme.a + '10px',
        },
      });
      stylex(styles.box);
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/Users/nmn/Developer/myCode/stylex/packages/@stylexjs/babel-plugin/test.js: Joining a StyleX variable or constant directly to other text with "+" would
      produce invalid CSS. For arithmetic, use numbers or other variables or
      constants (compiles to a CSS calc() expression). For a list of values,
      include an explicit separator, e.g. 'solid ' + token.


        4 |       const styles = stylex.create({
        5 |         box: {
      > 6 |           zIndex: MyTheme.a + '10px',
          |                   ^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |       stylex(styles.box);"
    `);
  });

  test("token + jammed string throws instead of emitting broken CSS: MyTheme.a + 'px'", () => {
    expect(() =>
      transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme.a + 'px',
        },
      });
      stylex(styles.box);
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/Users/nmn/Developer/myCode/stylex/packages/@stylexjs/babel-plugin/test.js: Joining a StyleX variable or constant directly to other text with "+" would
      produce invalid CSS. For arithmetic, use numbers or other variables or
      constants (compiles to a CSS calc() expression). For a list of values,
      include an explicit separator, e.g. 'solid ' + token.


        4 |       const styles = stylex.create({
        5 |         box: {
      > 6 |           zIndex: MyTheme.a + 'px',
          |                   ^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |       stylex(styles.box);"
    `);
  });

  test("token + jammed string throws instead of emitting broken CSS: '10px' + MyTheme.a", () => {
    expect(() =>
      transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: '10px' + MyTheme.a,
        },
      });
      stylex(styles.box);
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/Users/nmn/Developer/myCode/stylex/packages/@stylexjs/babel-plugin/test.js: Joining a StyleX variable or constant directly to other text with "+" would
      produce invalid CSS. For arithmetic, use numbers or other variables or
      constants (compiles to a CSS calc() expression). For a list of values,
      include an explicit separator, e.g. 'solid ' + token.


        4 |       const styles = stylex.create({
        5 |         box: {
      > 6 |           zIndex: '10px' + MyTheme.a,
          |                   ^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |       stylex(styles.box);"
    `);
  });

  test('template literal interpolation uses the same concat rules: `${MyTheme.a}px`', () => {
    expect(() =>
      transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          width: \`\${MyTheme.a}px\`,
        },
      });
      stylex(styles.box);
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/Users/nmn/Developer/myCode/stylex/packages/@stylexjs/babel-plugin/test.js: Joining a StyleX variable or constant directly to other text with "+" would
      produce invalid CSS. For arithmetic, use numbers or other variables or
      constants (compiles to a CSS calc() expression). For a list of values,
      include an explicit separator, e.g. 'solid ' + token.


        4 |       const styles = stylex.create({
        5 |         box: {
      > 6 |           width: \`\${MyTheme.a}px\`,
          |                  ^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |       stylex(styles.box);"
    `);
  });

  test('unsupported operators throw a compile error: MyTheme.a % 2', () => {
    expect(() =>
      transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme.a % 2,
        },
      });
      stylex(styles.box);
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/Users/nmn/Developer/myCode/stylex/packages/@stylexjs/babel-plugin/test.js: The "%" operator cannot be applied to a StyleX variable or constant.
      Only +, -, * and / are supported and compile to a CSS calc() expression.


        4 |       const styles = stylex.create({
        5 |         box: {
      > 6 |           zIndex: MyTheme.a % 2,
          |                   ^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |       stylex(styles.box);"
    `);
  });

  test('unsupported operators throw a compile error: MyTheme.a ** 2', () => {
    expect(() =>
      transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme.a ** 2,
        },
      });
      stylex(styles.box);
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/Users/nmn/Developer/myCode/stylex/packages/@stylexjs/babel-plugin/test.js: The "**" operator cannot be applied to a StyleX variable or constant.
      Only +, -, * and / are supported and compile to a CSS calc() expression.


        4 |       const styles = stylex.create({
        5 |         box: {
      > 6 |           zIndex: MyTheme.a ** 2,
          |                   ^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |       stylex(styles.box);"
    `);
  });

  test('unsupported operators throw a compile error: MyTheme.a & 1', () => {
    expect(() =>
      transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme.a & 1,
        },
      });
      stylex(styles.box);
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/Users/nmn/Developer/myCode/stylex/packages/@stylexjs/babel-plugin/test.js: The "&" operator cannot be applied to a StyleX variable or constant.
      Only +, -, * and / are supported and compile to a CSS calc() expression.


        4 |       const styles = stylex.create({
        5 |         box: {
      > 6 |           zIndex: MyTheme.a & 1,
          |                   ^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |       stylex(styles.box);"
    `);
  });

  test('unsupported operators throw a compile error: ~MyTheme.a', () => {
    expect(() =>
      transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: ~MyTheme.a,
        },
      });
      stylex(styles.box);
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/Users/nmn/Developer/myCode/stylex/packages/@stylexjs/babel-plugin/test.js: The "~" operator cannot be applied to a StyleX variable or constant.
      Only +, -, * and / are supported and compile to a CSS calc() expression.


        4 |       const styles = stylex.create({
        5 |         box: {
      > 6 |           zIndex: ~MyTheme.a,
          |                   ^^^^^^^^^^
        7 |         },
        8 |       });
        9 |       stylex(styles.box);"
    `);
  });

  test('unsupported operators throw a compile error: !MyTheme.a', () => {
    expect(() =>
      transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: !MyTheme.a,
        },
      });
      stylex(styles.box);
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/Users/nmn/Developer/myCode/stylex/packages/@stylexjs/babel-plugin/test.js: The "!" operator cannot be applied to a StyleX variable or constant.
      Only +, -, * and / are supported and compile to a CSS calc() expression.


        4 |       const styles = stylex.create({
        5 |         box: {
      > 6 |           zIndex: !MyTheme.a,
          |                   ^^^^^^^^^^
        7 |         },
        8 |       });
        9 |       stylex(styles.box);"
    `);
  });

  test('unsupported operators throw a compile error: +MyTheme.a', () => {
    expect(() =>
      transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: +MyTheme.a,
        },
      });
      stylex(styles.box);
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/Users/nmn/Developer/myCode/stylex/packages/@stylexjs/babel-plugin/test.js: The "+" operator cannot be applied to a StyleX variable or constant.
      Only +, -, * and / are supported and compile to a CSS calc() expression.


        4 |       const styles = stylex.create({
        5 |         box: {
      > 6 |           zIndex: +MyTheme.a,
          |                   ^^^^^^^^^^
        7 |         },
        8 |       });
        9 |       stylex(styles.box);"
    `);
  });

  test('comparisons on tokens throw a compile error: MyTheme.a > MyTheme.b ? 1 : 2', () => {
    expect(() =>
      transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme.a > MyTheme.b ? 1 : 2,
        },
      });
      stylex(styles.box);
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/Users/nmn/Developer/myCode/stylex/packages/@stylexjs/babel-plugin/test.js: A StyleX variable or constant cannot be compared with ">" at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Branch on a plain JavaScript value instead. (Comparing against null or
      undefined is allowed.)


        4 |       const styles = stylex.create({
        5 |         box: {
      > 6 |           zIndex: MyTheme.a > MyTheme.b ? 1 : 2,
          |                   ^^^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |       stylex(styles.box);"
    `);
  });

  test("comparisons on tokens throw a compile error: MyTheme.a === 'red' ? 1 : 2", () => {
    expect(() =>
      transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme.a === 'red' ? 1 : 2,
        },
      });
      stylex(styles.box);
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/Users/nmn/Developer/myCode/stylex/packages/@stylexjs/babel-plugin/test.js: A StyleX variable or constant cannot be compared with "===" at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Branch on a plain JavaScript value instead. (Comparing against null or
      undefined is allowed.)


        4 |       const styles = stylex.create({
        5 |         box: {
      > 6 |           zIndex: MyTheme.a === 'red' ? 1 : 2,
          |                   ^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |       stylex(styles.box);"
    `);
  });

  test('arithmetic in a computed style key throws a compile error', () => {
    expect(() =>
      transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          [MyTheme.a + MyTheme.b]: 'red',
        },
      });
      stylex(styles.box);
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/Users/nmn/Developer/myCode/stylex/packages/@stylexjs/babel-plugin/test.js: Arithmetic on a StyleX variable or constant cannot be used as a style property key.

      "
    `);
  });

  test('token misuse inside a dynamic style throws instead of degrading', () => {
    expect(() =>
      transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: (opacity) => ({
          opacity,
          zIndex: MyTheme.a === 'big' ? 1 : 2,
        }),
      });
      stylex.props(styles.box(0.5));
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/Users/nmn/Developer/myCode/stylex/packages/@stylexjs/babel-plugin/test.js: A StyleX variable or constant cannot be compared with "===" at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Branch on a plain JavaScript value instead. (Comparing against null or
      undefined is allowed.)


         5 |         box: (opacity) => ({
         6 |           opacity,
      >  7 |           zIndex: MyTheme.a === 'big' ? 1 : 2,
           |                   ^^^^^^^^^^^^^^^^^^^
         8 |         }),
         9 |       });
        10 |       stylex.props(styles.box(0.5));"
    `);
  });

  test("arithmetic with a non-numeric operand throws a compile error: MyTheme.a - 'foo'", () => {
    expect(() =>
      transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme.a - 'foo',
        },
      });
      stylex(styles.box);
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/Users/nmn/Developer/myCode/stylex/packages/@stylexjs/babel-plugin/test.js: Arithmetic ("-") on a StyleX variable or constant requires the other operand
      to be a number, a numeric string with a CSS unit (e.g. '10px'), or another
      variable or constant, so it can compile to a CSS calc() expression.


        4 |       const styles = stylex.create({
        5 |         box: {
      > 6 |           zIndex: MyTheme.a - 'foo',
          |                   ^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |       stylex(styles.box);"
    `);
  });

  test("arithmetic with a non-numeric operand throws a compile error: MyTheme.a * 'auto'", () => {
    expect(() =>
      transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme.a * 'auto',
        },
      });
      stylex(styles.box);
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/Users/nmn/Developer/myCode/stylex/packages/@stylexjs/babel-plugin/test.js: Arithmetic ("*") on a StyleX variable or constant requires the other operand
      to be a number, a numeric string with a CSS unit (e.g. '10px'), or another
      variable or constant, so it can compile to a CSS calc() expression.


        4 |       const styles = stylex.create({
        5 |         box: {
      > 6 |           zIndex: MyTheme.a * 'auto',
          |                   ^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |       stylex(styles.box);"
    `);
  });

  test('global numeric functions on tokens throw instead of coercing to NaN', () => {
    expect(() =>
      transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: Math.round(MyTheme.a) + 1,
        },
      });
      stylex(styles.box);
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/Users/nmn/Developer/myCode/stylex/packages/@stylexjs/babel-plugin/test.js: The "Math.round" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


        4 |       const styles = stylex.create({
        5 |         box: {
      > 6 |           zIndex: Math.round(MyTheme.a) + 1,
          |                   ^^^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |       stylex(styles.box);"
    `);
  });
});
