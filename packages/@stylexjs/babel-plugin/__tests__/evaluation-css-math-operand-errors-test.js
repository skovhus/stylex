/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { transform } = require('./__fixtures__/css-arithmetic');

describe('Math functions with CSS tokens', () => {
  test('rejects Math.min with a token in either argument: local, 2', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a + 1;
      export const styles = stylex.create({
        root: {
          zIndex: Math.min(local, 2),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.min" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.min(local, 2),
           |                   ^^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.min with a token in either argument: 2, local', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a + 1;
      export const styles = stylex.create({
        root: {
          zIndex: Math.min(2, local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.min" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.min(2, local),
           |                   ^^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.max with a token in either argument: local, 2', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a + 1;
      export const styles = stylex.create({
        root: {
          zIndex: Math.max(local, 2),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.max" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.max(local, 2),
           |                   ^^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.max with a token in either argument: 2, local', () => {
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

  test('rejects Math.pow with a token in either argument: local, 2', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a + 1;
      export const styles = stylex.create({
        root: {
          zIndex: Math.pow(local, 2),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.pow" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.pow(local, 2),
           |                   ^^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.pow with a token in either argument: 2, local', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a + 1;
      export const styles = stylex.create({
        root: {
          zIndex: Math.pow(2, local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.pow" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.pow(2, local),
           |                   ^^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.hypot with a token in either argument: local, 2', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a + 1;
      export const styles = stylex.create({
        root: {
          zIndex: Math.hypot(local, 2),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.hypot" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.hypot(local, 2),
           |                   ^^^^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.hypot with a token in either argument: 2, local', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a + 1;
      export const styles = stylex.create({
        root: {
          zIndex: Math.hypot(2, local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.hypot" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.hypot(2, local),
           |                   ^^^^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.atan2 with a token in either argument: local, 2', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a + 1;
      export const styles = stylex.create({
        root: {
          zIndex: Math.atan2(local, 2),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.atan2" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.atan2(local, 2),
           |                   ^^^^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.atan2 with a token in either argument: 2, local', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a + 1;
      export const styles = stylex.create({
        root: {
          zIndex: Math.atan2(2, local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.atan2" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.atan2(2, local),
           |                   ^^^^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.imul with a token in either argument: local, 2', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a + 1;
      export const styles = stylex.create({
        root: {
          zIndex: Math.imul(local, 2),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.imul" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.imul(local, 2),
           |                   ^^^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.imul with a token in either argument: 2, local', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a + 1;
      export const styles = stylex.create({
        root: {
          zIndex: Math.imul(2, local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.imul" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.imul(2, local),
           |                   ^^^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects non-finite operand NaN', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: constants.a * NaN,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Arithmetic ("*") on a StyleX variable or constant requires the other operand
      to be a number, a numeric string with a CSS unit (e.g. '10px'), or another
      variable or constant, so it can compile to a CSS calc() expression.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           zIndex: constants.a * NaN,
          |                   ^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
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

  test('rejects non-finite operand -Infinity', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: constants.a * -Infinity,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Arithmetic ("*") on a StyleX variable or constant requires the other operand
      to be a number, a numeric string with a CSS unit (e.g. '10px'), or another
      variable or constant, so it can compile to a CSS calc() expression.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           zIndex: constants.a * -Infinity,
          |                   ^^^^^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('rejects non-finite operand Math.sqrt(-1)', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: constants.a * Math.sqrt(-1),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Arithmetic ("*") on a StyleX variable or constant requires the other operand
      to be a number, a numeric string with a CSS unit (e.g. '10px'), or another
      variable or constant, so it can compile to a CSS calc() expression.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           zIndex: constants.a * Math.sqrt(-1),
          |                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('rejects non-finite operand Math.log(0)', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: constants.a * Math.log(0),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Arithmetic ("*") on a StyleX variable or constant requires the other operand
      to be a number, a numeric string with a CSS unit (e.g. '10px'), or another
      variable or constant, so it can compile to a CSS calc() expression.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           zIndex: constants.a * Math.log(0),
          |                   ^^^^^^^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });
});
