/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { transform } = require('./__fixtures__/css-arithmetic');

describe('CSS validation at style boundaries', () => {
  test('rejects arithmetic keys in other CSS consumers: stylex.keyframes({ from: { [key]: 1 } })', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants } from 'arithmetic.stylex';
      const key = constants.a + 1;
      export const result = stylex.keyframes({
        from: {
          [key]: 1,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Arithmetic on a StyleX variable or constant cannot be used as a style property key.

      "
    `);
  });

  test('rejects arithmetic keys in other CSS consumers: stylex.keyframes({ [key]: { opacity: 1 } })', () => {
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

  test('rejects arithmetic keys in other CSS consumers: stylex.positionTry({ [key]: 1 })', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants } from 'arithmetic.stylex';
      const key = constants.a + 1;
      export const result = stylex.positionTry({
        [key]: 1,
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Invalid property in \`positionTry()\` call. It may only contain, positionAnchor, positionArea, inset properties (top, left, insetInline etc.), margin properties, size properties (height, inlineSize, etc.), and self-alignment properties (alignSelf, justifySelf, placeSelf)
        3 |       import { constants } from 'arithmetic.stylex';
        4 |       const key = constants.a + 1;
      > 5 |       export const result = stylex.positionTry({
          |                                                ^
        6 |         [key]: 1,
        7 |       });
        8 |     "
    `);
  });

  test('rejects arithmetic keys in other CSS consumers: stylex.viewTransitionClass({ old: { [key]: 1 } })', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants } from 'arithmetic.stylex';
      const key = constants.a + 1;
      export const result = stylex.viewTransitionClass({
        old: {
          [key]: 1,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Arithmetic on a StyleX variable or constant cannot be used as a style property key.

      "
    `);
  });

  test('rejects a calc-shaped key consumed as a style: root: { [key]: 1 }', () => {
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

  test('rejects a calc-shaped key consumed as a style: root: { ...{ [key]: 1 } }', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      const key = 'calc(100% - 10px)';
      export const styles = stylex.create({
        root: {
          ...{
            [key]: 1,
          },
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Arithmetic on a StyleX variable or constant cannot be used as a style property key.

      "
    `);
  });

  test('rejects a calc-shaped key consumed as a style: root: { opacity: { default: 1, [key]: 0.5 } }', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      const key = 'calc(100% - 10px)';
      export const styles = stylex.create({
        root: {
          opacity: {
            default: 1,
            [key]: 0.5,
          },
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Arithmetic on a StyleX variable or constant cannot be used as a style property key.

      "
    `);
  });

  test('rejects a calc-shaped key consumed as a style: root: (value) => ({ [key]: value })', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      const key = 'calc(100% - 10px)';
      export const styles = stylex.create({
        root: (value) => ({
          [key]: value,
        }),
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Arithmetic on a StyleX variable or constant cannot be used as a style property key.

      "
    `);
  });

  test('rejects a calc-shaped key consumed as a style: root: (value) => ({ ...{ [key]: 1 }, opacity: value })', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      const key = 'calc(100% - 10px)';
      export const styles = stylex.create({
        root: (value) => ({
          ...{
            [key]: 1,
          },
          opacity: value,
        }),
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Arithmetic on a StyleX variable or constant cannot be used as a style property key.

      "
    `);
  });

  test('ignores failures on an unused logical branch: false && Math.round(constants.a)', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: String(false && Math.round(constants.a)),
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

  test('ignores failures on an unused logical branch: true || Math.round(constants.a)', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: String(true || Math.round(constants.a)),
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

  test('ignores failures on an unused logical branch: 0 ?? Math.round(constants.a)', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: String(0 ?? Math.round(constants.a)),
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

  test('retains a CSS failure in [Math.round(constants.a)][0]', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: [Math.round(constants.a)][0],
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.round" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           zIndex: [Math.round(constants.a)][0],
          |                    ^^^^^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('retains a CSS failure in ({ value: Math.round(constants.a) }).value', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: {
            value: Math.round(constants.a),
          }.value,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.round" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


         5 |         root: {
         6 |           zIndex: {
      >  7 |             value: Math.round(constants.a),
           |                    ^^^^^^^^^^^^^^^^^^^^^^^
         8 |           }.value,
         9 |         },
        10 |       });"
    `);
  });

  test('retains a CSS failure in ((value) => Math.round(value))(constants.a)', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: ((value) => Math.round(value))(constants.a),
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Unsupported expression: CallExpression


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           zIndex: ((value) => Math.round(value))(constants.a),
          |                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('preserves interpolation context in `"prefix ${constants.text} suffix"`', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          content: \`"prefix \${constants.text} suffix"\`,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x2xyo1x",
          {
            "ltr": ".x2xyo1x{content:"prefix var(--x1nahs8e) suffix"}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('preserves interpolation context in `url(${constants.url})`', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          backgroundImage: \`url(\${constants.url})\`,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xy65ch8",
          {
            "ltr": ".xy65ch8{background-image:url(var(--x1fhnzir))}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('preserves interpolation context in `[start ${constants.line} end] 1fr`', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          gridTemplateColumns: \`[start \${constants.line} end] 1fr\`,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xw25cvi",
          {
            "ltr": ".xw25cvi{grid-template-columns:[start var(--x1idfbv) end] 1fr}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test("preserves interpolation context in '\"' + constants.text + '\"'", () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          content: '"' + constants.text + '"',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1319nye",
          {
            "ltr": ".x1319nye{content:"var(--x1nahs8e)"}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });
});
