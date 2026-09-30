/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { transform } = require('./__fixtures__/css-arithmetic');

describe('error propagation through aliases and style containers', () => {
  test('keeps the Math diagnostic for local', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = Math.round(constants.a);
      export const styles = stylex.create({
        root: {
          zIndex: local,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.round" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


        2 |       import * as stylex from '@stylexjs/stylex';
        3 |       import { constants, variables } from 'arithmetic.stylex';
      > 4 |       const local = Math.round(constants.a);
          |                     ^^^^^^^^^^^^^^^^^^^^^^^
        5 |       export const styles = stylex.create({
        6 |         root: {
        7 |           zIndex: local,"
    `);
  });

  test('keeps the Math diagnostic for local.value', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = {
        value: Math.round(constants.a),
      };
      export const styles = stylex.create({
        root: {
          zIndex: local.value,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.round" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


        3 |       import { constants, variables } from 'arithmetic.stylex';
        4 |       const local = {
      > 5 |         value: Math.round(constants.a),
          |                ^^^^^^^^^^^^^^^^^^^^^^^
        6 |       };
        7 |       export const styles = stylex.create({
        8 |         root: {"
    `);
  });

  test('keeps the Math diagnostic for local[0]', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = [Math.round(constants.a)];
      export const styles = stylex.create({
        root: {
          zIndex: local[0],
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.round" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


        2 |       import * as stylex from '@stylexjs/stylex';
        3 |       import { constants, variables } from 'arithmetic.stylex';
      > 4 |       const local = [Math.round(constants.a)];
          |                      ^^^^^^^^^^^^^^^^^^^^^^^
        5 |       export const styles = stylex.create({
        6 |         root: {
        7 |           zIndex: local[0],"
    `);
  });

  test('keeps the Math diagnostic for [0, local]', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = Math.round(constants.a);
      export const styles = stylex.create({
        root: {
          zIndex: [0, local],
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.round" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


        2 |       import * as stylex from '@stylexjs/stylex';
        3 |       import { constants, variables } from 'arithmetic.stylex';
      > 4 |       const local = Math.round(constants.a);
          |                     ^^^^^^^^^^^^^^^^^^^^^^^
        5 |       export const styles = stylex.create({
        6 |         root: {
        7 |           zIndex: [0, local],"
    `);
  });

  test('keeps the Math diagnostic for { default: 0, ":hover": local }', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = Math.round(constants.a);
      export const styles = stylex.create({
        root: {
          zIndex: {
            default: 0,
            ':hover': local,
          },
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: The "Math.round" function cannot be applied to a StyleX variable or constant at compile time.
      Its value is a CSS variable reference that is only resolved in the browser.
      Use CSS calc() arithmetic directly instead.


        2 |       import * as stylex from '@stylexjs/stylex';
        3 |       import { constants, variables } from 'arithmetic.stylex';
      > 4 |       const local = Math.round(constants.a);
          |                     ^^^^^^^^^^^^^^^^^^^^^^^
        5 |       export const styles = stylex.create({
        6 |         root: {
        7 |           zIndex: {"
    `);
  });

  test('preserves nullish guard local == null', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local == null ? 1 : 0,
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

  test('preserves nullish guard local != null', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local != null ? 1 : 0,
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

  test('preserves nullish guard null === local', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: null === local ? 1 : 0,
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

  test('preserves nullish guard null !== local', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: null !== local ? 1 : 0,
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

  test('preserves nullish guard local === undefined', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local === undefined ? 1 : 0,
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

  test('preserves nullish guard local !== undefined', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = constants.a;
      export const styles = stylex.create({
        root: {
          zIndex: local !== undefined ? 1 : 0,
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
});
