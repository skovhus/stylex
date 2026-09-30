/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { transform } = require('./__fixtures__/css-arithmetic');

describe('Math functions with CSS tokens', () => {
  test('rejects Math.abs on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.abs(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.abs" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.abs(local),
           |                   ^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.ceil on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.ceil(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.ceil" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.ceil(local),
           |                   ^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.floor on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.floor(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.floor" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.floor(local),
           |                   ^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.round on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.round(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.round" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.round(local),
           |                   ^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.trunc on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.trunc(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.trunc" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.trunc(local),
           |                   ^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.min on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.min(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.min" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.min(local),
           |                   ^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.max on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.max(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.max" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.max(local),
           |                   ^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.sqrt on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.sqrt(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.sqrt" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.sqrt(local),
           |                   ^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.cbrt on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.cbrt(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.cbrt" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.cbrt(local),
           |                   ^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.sign on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.sign(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.sign" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.sign(local),
           |                   ^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.sin on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.sin(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.sin" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.sin(local),
           |                   ^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.cos on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.cos(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.cos" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.cos(local),
           |                   ^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.tan on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.tan(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.tan" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.tan(local),
           |                   ^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.asin on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.asin(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.asin" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.asin(local),
           |                   ^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.acos on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.acos(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.acos" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.acos(local),
           |                   ^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.atan on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.atan(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.atan" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.atan(local),
           |                   ^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.log on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.log(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.log" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.log(local),
           |                   ^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.log2 on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.log2(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.log2" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.log2(local),
           |                   ^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.log10 on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.log10(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.log10" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.log10(local),
           |                   ^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.exp on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.exp(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.exp" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.exp(local),
           |                   ^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.expm1 on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.expm1(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.expm1" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.expm1(local),
           |                   ^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.fround on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.fround(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.fround" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.fround(local),
           |                   ^^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects Math.clz32 on a locally aliased token', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: Math.clz32(local),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.clz32" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: Math.clz32(local),
           |                   ^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });
});
