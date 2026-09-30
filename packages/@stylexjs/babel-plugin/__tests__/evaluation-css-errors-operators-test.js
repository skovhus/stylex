/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { transform } = require('./__fixtures__/css-arithmetic');

describe('error propagation through aliases and style containers', () => {
  test('rejects aliased token comparison with ==', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local == 2 ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be compared with "==" at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Branch on a plain JavaScript value instead. (Comparing against null or
      undefined is allowed.)


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local == 2 ? 1 : 0,
           |                   ^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects aliased token comparison with !=', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local != 2 ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be compared with "!=" at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Branch on a plain JavaScript value instead. (Comparing against null or
      undefined is allowed.)


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local != 2 ? 1 : 0,
           |                   ^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects aliased token comparison with ===', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local === 2 ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be compared with "===" at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Branch on a plain JavaScript value instead. (Comparing against null or
      undefined is allowed.)


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local === 2 ? 1 : 0,
           |                   ^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects aliased token comparison with !==', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local !== 2 ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be compared with "!==" at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Branch on a plain JavaScript value instead. (Comparing against null or
      undefined is allowed.)


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local !== 2 ? 1 : 0,
           |                   ^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects aliased token comparison with <', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local < 2 ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be compared with "<" at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Branch on a plain JavaScript value instead. (Comparing against null or
      undefined is allowed.)


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local < 2 ? 1 : 0,
           |                   ^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects aliased token comparison with <=', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local <= 2 ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be compared with "<=" at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Branch on a plain JavaScript value instead. (Comparing against null or
      undefined is allowed.)


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local <= 2 ? 1 : 0,
           |                   ^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects aliased token comparison with >', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local > 2 ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be compared with ">" at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Branch on a plain JavaScript value instead. (Comparing against null or
      undefined is allowed.)


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local > 2 ? 1 : 0,
           |                   ^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects aliased token comparison with >=', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local >= 2 ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be compared with ">=" at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Branch on a plain JavaScript value instead. (Comparing against null or
      undefined is allowed.)


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local >= 2 ? 1 : 0,
           |                   ^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects aliased token operator %', () => {
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

  test('rejects aliased token operator **', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local ** 2,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "**" operator cannot be applied to a StyleX variable or constant.
      Only +, -, * and / are supported and compile to a CSS calc() expression.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local ** 2,
           |                   ^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects aliased token operator &', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local & 2,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "&" operator cannot be applied to a StyleX variable or constant.
      Only +, -, * and / are supported and compile to a CSS calc() expression.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local & 2,
           |                   ^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects aliased token operator |', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local | 2,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "|" operator cannot be applied to a StyleX variable or constant.
      Only +, -, * and / are supported and compile to a CSS calc() expression.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local | 2,
           |                   ^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects aliased token operator ^', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local ^ 2,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "^" operator cannot be applied to a StyleX variable or constant.
      Only +, -, * and / are supported and compile to a CSS calc() expression.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local ^ 2,
           |                   ^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects aliased token operator <<', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local << 2,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "<<" operator cannot be applied to a StyleX variable or constant.
      Only +, -, * and / are supported and compile to a CSS calc() expression.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local << 2,
           |                   ^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects aliased token operator >>', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local >> 2,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The ">>" operator cannot be applied to a StyleX variable or constant.
      Only +, -, * and / are supported and compile to a CSS calc() expression.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local >> 2,
           |                   ^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects aliased token operator >>>', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local >>> 2,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The ">>>" operator cannot be applied to a StyleX variable or constant.
      Only +, -, * and / are supported and compile to a CSS calc() expression.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local >>> 2,
           |                   ^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });
});
