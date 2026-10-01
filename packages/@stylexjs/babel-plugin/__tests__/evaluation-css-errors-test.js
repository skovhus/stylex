/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { transform } = require('./__fixtures__/css-arithmetic');

describe('Invalid CSS token operations', () => {
  test('rejects a non-numeric arithmetic operand', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter * 'auto',
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Arithmetic ("*") on a StyleX variable or constant requires the other operand
      to be a number, a numeric string with a CSS unit (e.g. '10px'), or another
      variable or constant, so it can compile to a CSS calc() expression.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           width: constants.gutter * 'auto',
          |                  ^^^^^^^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });
  test('rejects Math calls with an imported token in a later argument', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a + 1;
      export const styles = stylex.create({
        root: {
          zIndex: Math.max(2, local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.max" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.max(2, local),
           |                   ^^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects non-finite operand Infinity', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: constants.a * Infinity,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Arithmetic ("*") on a StyleX variable or constant requires the other operand
      to be a number, a numeric string with a CSS unit (e.g. '10px'), or another
      variable or constant, so it can compile to a CSS calc() expression.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           zIndex: constants.a * Infinity,
          |                   ^^^^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('rejects arithmetic that cannot be expressed with calc', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local % 2,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "%" operator cannot be applied to a StyleX variable or constant.
      Only +, -, * and / are supported and compile to a CSS calc() expression.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local % 2,
           |                   ^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects token misuse in a static part of a dynamic style', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: (opacity) => ({
          opacity,
          zIndex: Math.round(local),
        }),
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.round" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         6 |         root: (opacity) => ({
         7 |           opacity,
      >  8 |           zIndex: Math.round(local),
           |                   ^^^^^^^^^^^^^^^^^
         9 |         }),
        10 |       });
        11 |     "
    `);
  });

  test('rejects arithmetic used as a CSS property key', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      const key = 'calc(100% - 10px)';
      export const styles = stylex.create({
        root: {
          [key]: 1,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Arithmetic on a StyleX variable or constant cannot be used as a style property key.

      "
    `);
  });

  test('rejects arithmetic used as a keyframe selector', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants } from 'arithmetic.stylex';
      const key = constants.a + 1;
      export const result = stylex.keyframes({
        [key]: {
          opacity: 1,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Arithmetic on a StyleX variable or constant cannot be used as a style property key.

      "
    `);
  });
});
