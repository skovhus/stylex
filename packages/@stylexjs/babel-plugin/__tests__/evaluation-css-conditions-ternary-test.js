/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { transform } = require('./__fixtures__/css-arithmetic');

describe('CSS tokens in JavaScript conditions', () => {
  test('rejects imported constant when deciding a branch: constants.a ? 1 : 0', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: constants.a ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           zIndex: constants.a ? 1 : 0,
          |                   ^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('rejects imported variable when deciding a branch: variables.gap ? 1 : 0', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: variables.gap ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           zIndex: variables.gap ? 1 : 0,
          |                   ^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test("rejects literal CSS variable when deciding a branch: 'var(--gap)' ? 1 : 0", () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: 'var(--gap)' ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           zIndex: 'var(--gap)' ? 1 : 0,
          |                   ^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test("rejects literal CSS calculation when deciding a branch: 'calc(1)' ? 1 : 0", () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: 'calc(1)' ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           zIndex: 'calc(1)' ? 1 : 0,
          |                   ^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('rejects local alias when deciding a branch: local ? 1 : 0', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local ? 1 : 0,
           |                   ^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects alias chain when deciding a branch: local ? 1 : 0', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const first = constants.a;
      const local = first;
      export const styles = stylex.create({
        root: {
          zIndex: local ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


         6 |       export const styles = stylex.create({
         7 |         root: {
      >  8 |           zIndex: local ? 1 : 0,
           |                   ^^^^^
         9 |         },
        10 |       });
        11 |     "
    `);
  });

  test('rejects arithmetic when deciding a branch: (constants.a * 2) ? 1 : 0', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: constants.a * 2 ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           zIndex: constants.a * 2 ? 1 : 0,
          |                   ^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('rejects zero-valued arithmetic when deciding a branch: (constants.b - constants.b) ? 1 : 0', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: constants.b - constants.b ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           zIndex: constants.b - constants.b ? 1 : 0,
          |                   ^^^^^^^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('rejects arithmetic alias when deciding a branch: local ? 1 : 0', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a * 2;
      export const styles = stylex.create({
        root: {
          zIndex: local ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local ? 1 : 0,
           |                   ^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects object lookup when deciding a branch: local.value ? 1 : 0', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = {
        value: constants.a,
      };
      export const styles = stylex.create({
        root: {
          zIndex: local.value ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


         7 |       export const styles = stylex.create({
         8 |         root: {
      >  9 |           zIndex: local.value ? 1 : 0,
           |                   ^^^^^^^^^^^
        10 |         },
        11 |       });
        12 |     "
    `);
  });

  test('rejects array lookup when deciding a branch: local[0] ? 1 : 0', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = [constants.a];
      export const styles = stylex.create({
        root: {
          zIndex: local[0] ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local[0] ? 1 : 0,
           |                   ^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects arrow helper when deciding a branch: identity(constants.a) ? 1 : 0', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const identity = (value) => value;
      export const styles = stylex.create({
        root: {
          zIndex: identity(constants.a) ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: identity(constants.a) ? 1 : 0,
           |                   ^^^^^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects arrow-helper predicate when deciding a branch: choose(constants.a) ? 1 : 0', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const choose = (value) => (value ? 1 : 0);
      export const styles = stylex.create({
        root: {
          zIndex: choose(constants.a) ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


        2 |       import * as stylex from '@stylexjs/stylex';
        3 |       import { constants, variables } from 'arithmetic.stylex';
      > 4 |       const choose = (value) => (value ? 1 : 0);
          |                                  ^^^^^
        5 |       export const styles = stylex.create({
        6 |         root: {
        7 |           zIndex: choose(constants.a) ? 1 : 0,"
    `);
  });

  test('rejects nested logical result when deciding a branch: (true && constants.a) ? 1 : 0', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: true && constants.a ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           zIndex: true && constants.a ? 1 : 0,
          |                   ^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('rejects nested ternary result when deciding a branch: (true ? constants.a : 0) ? 1 : 0', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: (true ? constants.a : 0) ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           zIndex: (true ? constants.a : 0) ? 1 : 0,
          |                    ^^^^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('rejects Number conversion when deciding a branch: Number(constants.a) ? 1 : 0', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: Number(constants.a) ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           zIndex: Number(constants.a) ? 1 : 0,
          |                   ^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('rejects String conversion when deciding a branch: String(constants.a) ? 1 : 0', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: String(constants.a) ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           zIndex: String(constants.a) ? 1 : 0,
          |                   ^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });
});
