/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { transform } = require('./__fixtures__/css-arithmetic');

describe('Math functions with CSS tokens', () => {
  test('evaluates numeric Math.abs(-2) before token arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      const scale = Math.abs(-2);
      export const styles = stylex.create({
        root: {
          zIndex: local * scale,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xsym0bk",
          {
            "ltr": ".xsym0bk{z-index:calc(var(--xkc4to4) * 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('evaluates numeric Math.ceil(1.1) before token arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      const scale = Math.ceil(1.1);
      export const styles = stylex.create({
        root: {
          zIndex: local * scale,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xsym0bk",
          {
            "ltr": ".xsym0bk{z-index:calc(var(--xkc4to4) * 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('evaluates numeric Math.floor(2.9) before token arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      const scale = Math.floor(2.9);
      export const styles = stylex.create({
        root: {
          zIndex: local * scale,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xsym0bk",
          {
            "ltr": ".xsym0bk{z-index:calc(var(--xkc4to4) * 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('evaluates numeric Math.round(1.6) before token arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      const scale = Math.round(1.6);
      export const styles = stylex.create({
        root: {
          zIndex: local * scale,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xsym0bk",
          {
            "ltr": ".xsym0bk{z-index:calc(var(--xkc4to4) * 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('evaluates numeric Math.trunc(2.9) before token arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      const scale = Math.trunc(2.9);
      export const styles = stylex.create({
        root: {
          zIndex: local * scale,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xsym0bk",
          {
            "ltr": ".xsym0bk{z-index:calc(var(--xkc4to4) * 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('evaluates numeric Math.min(2, 3) before token arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      const scale = Math.min(2, 3);
      export const styles = stylex.create({
        root: {
          zIndex: local * scale,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xsym0bk",
          {
            "ltr": ".xsym0bk{z-index:calc(var(--xkc4to4) * 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('evaluates numeric Math.max(1, 2) before token arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      const scale = Math.max(1, 2);
      export const styles = stylex.create({
        root: {
          zIndex: local * scale,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xsym0bk",
          {
            "ltr": ".xsym0bk{z-index:calc(var(--xkc4to4) * 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('evaluates numeric Math.pow(2, 3) before token arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      const scale = Math.pow(2, 3);
      export const styles = stylex.create({
        root: {
          zIndex: local * scale,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1sale8n",
          {
            "ltr": ".x1sale8n{z-index:calc(var(--xkc4to4) * 8)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('evaluates numeric Math.sqrt(4) before token arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      const scale = Math.sqrt(4);
      export const styles = stylex.create({
        root: {
          zIndex: local * scale,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xsym0bk",
          {
            "ltr": ".xsym0bk{z-index:calc(var(--xkc4to4) * 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('evaluates numeric Math.cbrt(8) before token arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      const scale = Math.cbrt(8);
      export const styles = stylex.create({
        root: {
          zIndex: local * scale,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xsym0bk",
          {
            "ltr": ".xsym0bk{z-index:calc(var(--xkc4to4) * 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('evaluates numeric Math.hypot(3, 4) before token arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      const scale = Math.hypot(3, 4);
      export const styles = stylex.create({
        root: {
          zIndex: local * scale,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xe3fiij",
          {
            "ltr": ".xe3fiij{z-index:calc(var(--xkc4to4) * 5)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('evaluates numeric Math.sign(-2) before token arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      const scale = Math.sign(-2);
      export const styles = stylex.create({
        root: {
          zIndex: local * scale,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xcbbdz",
          {
            "ltr": ".xcbbdz{z-index:calc(var(--xkc4to4) * -1)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('evaluates numeric Math.sin(0) before token arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      const scale = Math.sin(0);
      export const styles = stylex.create({
        root: {
          zIndex: local * scale,
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

  test('evaluates numeric Math.cos(0) before token arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      const scale = Math.cos(0);
      export const styles = stylex.create({
        root: {
          zIndex: local * scale,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xwhy52z",
          {
            "ltr": ".xwhy52z{z-index:calc(var(--xkc4to4) * 1)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('evaluates numeric Math.tan(0) before token arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      const scale = Math.tan(0);
      export const styles = stylex.create({
        root: {
          zIndex: local * scale,
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

  test('evaluates numeric Math.log(1) before token arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      const scale = Math.log(1);
      export const styles = stylex.create({
        root: {
          zIndex: local * scale,
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

  test('evaluates numeric Math.exp(0) before token arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      const scale = Math.exp(0);
      export const styles = stylex.create({
        root: {
          zIndex: local * scale,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xwhy52z",
          {
            "ltr": ".xwhy52z{z-index:calc(var(--xkc4to4) * 1)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });
});
