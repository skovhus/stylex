/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { transform } = require('./__fixtures__/css-arithmetic');

describe('CSS tokens in JavaScript conditions', () => {
  test('rejects typeof on constants.a', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a * 2;
      export const styles = stylex.create({
        root: {
          zIndex: typeof constants.a === 'number' ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "typeof" operator cannot be applied to a StyleX variable or constant.
      Only +, -, * and / are supported and compile to a CSS calc() expression.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: typeof constants.a === 'number' ? 1 : 0,
           |                   ^^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects typeof on constants.a * 2', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a * 2;
      export const styles = stylex.create({
        root: {
          zIndex: typeof (constants.a * 2) === 'number' ? 1 : 0,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "typeof" operator cannot be applied to a StyleX variable or constant.
      Only +, -, * and / are supported and compile to a CSS calc() expression.


         5 |       export const styles = stylex.create({
         6 |         root: {
      >  7 |           zIndex: typeof (constants.a * 2) === 'number' ? 1 : 0,
           |                   ^^^^^^^^^^^^^^^^^^^^^^^^
         8 |         },
         9 |       });
        10 |     "
    `);
  });

  test('rejects typeof on local', () => {
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

  test('rejects token coercion in a dynamic style: constants.a ? opacity : 0', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: (opacity) => ({
          opacity: constants.a ? opacity : 0,
        }),
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


        4 |       export const styles = stylex.create({
        5 |         root: (opacity) => ({
      > 6 |           opacity: constants.a ? opacity : 0,
          |                    ^^^^^^^^^^^
        7 |         }),
        8 |       });
        9 |     "
    `);
  });

  test('rejects token coercion in a dynamic style: constants.a && opacity', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: (opacity) => ({
          opacity: constants.a && opacity,
        }),
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


        4 |       export const styles = stylex.create({
        5 |         root: (opacity) => ({
      > 6 |           opacity: constants.a && opacity,
          |                    ^^^^^^^^^^^
        7 |         }),
        8 |       });
        9 |     "
    `);
  });

  test('rejects token coercion in a dynamic style: constants.a || opacity', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: (opacity) => ({
          opacity: constants.a || opacity,
        }),
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: A StyleX variable or constant cannot be used as a condition at compile time.
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
      Branch on a plain JavaScript value instead.


        4 |       export const styles = stylex.create({
        5 |         root: (opacity) => ({
      > 6 |           opacity: constants.a || opacity,
          |                    ^^^^^^^^^^^
        7 |         }),
        8 |       });
        9 |     "
    `);
  });

  test("rejects token coercion in a dynamic style: typeof constants.a === 'number' ? opacity : 0", () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: (opacity) => ({
          opacity: typeof constants.a === 'number' ? opacity : 0,
        }),
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "typeof" operator cannot be applied to a StyleX variable or constant.
      Only +, -, * and / are supported and compile to a CSS calc() expression.


        4 |       export const styles = stylex.create({
        5 |         root: (opacity) => ({
      > 6 |           opacity: typeof constants.a === 'number' ? opacity : 0,
          |                    ^^^^^^^^^^^^^^^^^^
        7 |         }),
        8 |       });
        9 |     "
    `);
  });

  test('allows a reference selected by a known condition: true ? constants.a : 0', () => {
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

  test('allows a reference selected by a known condition: false ? 0 : constants.a', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: false ? 0 : constants.a,
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

  test('allows a reference selected by a known condition: true && constants.a', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: true && constants.a,
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

  test('allows a reference selected by a known condition: false || constants.a', () => {
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

  test('allows a reference selected by a known condition: constants.a ?? 0', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: constants.a ?? 0,
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

  test('allows a reference selected by a known condition: null ?? constants.a', () => {
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

  test('preserves ordinary and unused conditions: false && (constants.a ? 1 : 0)', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: String(false && (constants.a ? 1 : 0)),
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xkhvsjs",
          {
            "ltr": ".xkhvsjs{z-index:false}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('preserves ordinary and unused conditions: true || (constants.a && 0.5)', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: String(true || (constants.a && 0.5)),
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1v0r2cl",
          {
            "ltr": ".x1v0r2cl{z-index:true}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('preserves ordinary and unused conditions: 0 ?? (constants.a || 0.5)', () => {
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

  test('preserves ordinary and unused conditions: true ? 1 : typeof constants.a', () => {
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

  test('preserves ordinary and unused conditions: false ? (constants.a ? 1 : 0) : 0', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: String(false ? (constants.a ? 1 : 0) : 0),
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

  test('preserves ordinary and unused conditions: 0 ? 1 : 0', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: String(0 ? 1 : 0),
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

  test('preserves ordinary and unused conditions: 0 || 0.5', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: String(0 || 0.5),
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xqt31pd",
          {
            "ltr": ".xqt31pd{z-index:.5}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('preserves ordinary and unused conditions: 0 && 0.5', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: String(0 && 0.5),
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

  test("preserves ordinary and unused conditions: typeof (2 * 0) === 'number' ? 1 : 0", () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: String(typeof (2 * 0) === 'number' ? 1 : 0),
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

  test('snapshots direct imported constant in a ternary condition', () => {
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
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
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

  test('snapshots an arithmetic alias used with &&', () => {
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
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
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

  test('snapshots an imported alias used with ||', () => {
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
      Its truthiness cannot be determined from a CSS variable reference or calc() expression.
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

  test('snapshots typeof on imported arithmetic', () => {
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
});
