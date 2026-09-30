/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { transform } = require('./__fixtures__/css-arithmetic');

describe('CSS token arithmetic through local bindings', () => {
  test('value alias retains the imported token', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local + 2,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xoqvakk",
          {
            "ltr": ".xoqvakk{z-index:calc(var(--xkc4to4) + 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('alias chain retains the imported token', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const first = constants.a;
      const local = first;
      export const styles = stylex.create({
        root: {
          zIndex: local + 2,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xoqvakk",
          {
            "ltr": ".xoqvakk{z-index:calc(var(--xkc4to4) + 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('group alias retains the imported token', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants;
      export const styles = stylex.create({
        root: {
          zIndex: local.a + 2,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xoqvakk",
          {
            "ltr": ".xoqvakk{z-index:calc(var(--xkc4to4) + 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('computed member retains the imported token', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const key = 'a';
      export const styles = stylex.create({
        root: {
          zIndex: constants[key] + 2,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xoqvakk",
          {
            "ltr": ".xoqvakk{z-index:calc(var(--xkc4to4) + 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('object member retains the imported token', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = {
        value: constants.a,
      };
      export const styles = stylex.create({
        root: {
          zIndex: local.value + 2,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xoqvakk",
          {
            "ltr": ".xoqvakk{z-index:calc(var(--xkc4to4) + 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('array member retains the imported token', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = [constants.a];
      export const styles = stylex.create({
        root: {
          zIndex: local[0] + 2,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xoqvakk",
          {
            "ltr": ".xoqvakk{z-index:calc(var(--xkc4to4) + 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('computed expression alias retains the imported token', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a + 2;
      export const styles = stylex.create({
        root: {
          zIndex: local,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xoqvakk",
          {
            "ltr": ".xoqvakk{z-index:calc(var(--xkc4to4) + 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('arrow helper retains the imported token', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const add = (value) => value + 2;
      export const styles = stylex.create({
        root: {
          zIndex: add(constants.a),
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xoqvakk",
          {
            "ltr": ".xoqvakk{z-index:calc(var(--xkc4to4) + 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('Number alias retains the imported token', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = Number(constants.a);
      export const styles = stylex.create({
        root: {
          zIndex: local + 2,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xoqvakk",
          {
            "ltr": ".xoqvakk{z-index:calc(var(--xkc4to4) + 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('String alias retains the imported token', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = String(constants.a);
      export const styles = stylex.create({
        root: {
          zIndex: local + 2,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xoqvakk",
          {
            "ltr": ".xoqvakk{z-index:calc(var(--xkc4to4) + 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('reuses a derived alias without losing expression grouping', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      const derived = (local + 2) * 3;
      export const styles = stylex.create({
        root: {
          zIndex: derived / (derived - 1),
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1xutyev",
          {
            "ltr": ".x1xutyev{z-index:calc(((var(--xkc4to4) + 2) * 3) / (((var(--xkc4to4) + 2) * 3) - 1))}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('preserves the meaning of 2 - constants.a', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: 2 - constants.a,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xodxbh0",
          {
            "ltr": ".xodxbh0{z-index:calc(2 - var(--xkc4to4))}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('preserves the meaning of 2 / constants.a', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: 2 / constants.a,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1nifqsr",
          {
            "ltr": ".x1nifqsr{z-index:calc(2 / var(--xkc4to4))}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('preserves the meaning of constants.a - (constants.b - 2)', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: constants.a - (constants.b - 2),
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xkt3dyv",
          {
            "ltr": ".xkt3dyv{z-index:calc(var(--xkc4to4) - (var(--xm3quem) - 2))}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('preserves the meaning of -(constants.a + 2)', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: -(constants.a + 2),
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xvj3xgs",
          {
            "ltr": ".xvj3xgs{z-index:calc(-1 * (var(--xkc4to4) + 2))}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('preserves the meaning of constants.a * -2', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: constants.a * -2,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x10hy5hn",
          {
            "ltr": ".x10hy5hn{z-index:calc(var(--xkc4to4) * -2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('preserves the meaning of constants.a * 0', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: constants.a * 0,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x4cheug",
          {
            "ltr": ".x4cheug{z-index:calc(var(--xkc4to4) * 0)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });
});
