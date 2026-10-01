/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { transform } = require('./__fixtures__/css-arithmetic');

describe('CSS tokens in JavaScript conditions', () => {
  test('rejects nullish coalescing on an imported constant', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: constants.a ?? 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its value cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           zIndex: constants.a ?? 0,
          |                   ^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('rejects nullish coalescing through an imported alias in a dynamic style', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants } from 'arithmetic.stylex';
      const local = constants.missing;
      export const styles = stylex.create({
        root: (fallback) => ({
          zIndex: local ?? fallback,
        }),
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its value cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


         5 |       export const styles = stylex.create({
         6 |         root: (fallback) => ({
      >  7 |           zIndex: local ?? fallback,
           |                   ^^^^^
         8 |         }),
         9 |       });
        10 |     "
    `);
  });

  test('rejects a null comparison on an imported constant', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: constants.a == null ? 0 : 1,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be compared with "==" at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Branch on a plain JavaScript value instead.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           zIndex: constants.a == null ? 0 : 1,
          |                   ^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('rejects an undefined comparison with an imported alias on the right', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: undefined !== local ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be compared with "!==" at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Branch on a plain JavaScript value instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: undefined !== local ? 1 : 0,
           |                   ^^^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects an imported constant as a ternary condition', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const fallback = 0;
      export const styles = stylex.create({
        root: {
          zIndex: constants.a ? 1 : fallback,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its value cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: constants.a ? 1 : fallback,
           |                   ^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects an arithmetic alias as the left operand of &&', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a * 2;
      export const styles = stylex.create({
        root: {
          zIndex: local && 0.5,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its value cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local && 0.5,
           |                   ^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects an imported alias as the left operand of ||', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local || 0.5,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its value cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: local || 0.5,
           |                   ^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects typeof on unresolved imported arithmetic', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a * 2;
      export const styles = stylex.create({
        root: {
          zIndex: typeof local === 'number' ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "typeof" operator cannot be applied to a StyleX variable or constant.
      Only +, -, * and / are supported and compile to a CSS calc() expression.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: typeof local === 'number' ? 1 : 0,
           |                   ^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('allows a token selected by a known ternary condition', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: true ? constants.a : 0,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xz3gssr",
          {
            "ltr": ".xz3gssr{z-index:var(--xkc4to4)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('allows a token selected by a known logical condition', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: false || constants.a,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xz3gssr",
          {
            "ltr": ".xz3gssr{z-index:var(--xkc4to4)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('allows a token as the fallback for a known null value', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: null ?? constants.a,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xz3gssr",
          {
            "ltr": ".xz3gssr{z-index:var(--xkc4to4)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('does not evaluate an unused nullish fallback', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: String(0 ?? (constants.a || 0.5)),
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1ja2u2z",
          {
            "ltr": ".x1ja2u2z{z-index:0}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('does not evaluate an unused ternary branch', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: String(true ? 1 : typeof constants.a),
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1vjfegm",
          {
            "ltr": ".x1vjfegm{z-index:1}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });
});
