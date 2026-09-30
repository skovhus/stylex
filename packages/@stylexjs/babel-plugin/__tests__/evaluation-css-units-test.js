/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { transform } = require('./__fixtures__/css-arithmetic');

describe('arithmetic regression coverage', () => {
  test('accepts modern CSS length rex in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2rex',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xjkx5m3",
          {
            "ltr": ".xjkx5m3{width:calc(var(--x42dvfa) - 2rex)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length rch in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2rch',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x87gw1h",
          {
            "ltr": ".x87gw1h{width:calc(var(--x42dvfa) - 2rch)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length rcap in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2rcap',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xovjh9e",
          {
            "ltr": ".xovjh9e{width:calc(var(--x42dvfa) - 2rcap)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length ric in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2ric',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x12gpxge",
          {
            "ltr": ".x12gpxge{width:calc(var(--x42dvfa) - 2ric)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length svb in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2svb',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x18i97ii",
          {
            "ltr": ".x18i97ii{width:calc(var(--x42dvfa) - 2svb)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length svi in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2svi',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xvqtz25",
          {
            "ltr": ".xvqtz25{width:calc(var(--x42dvfa) - 2svi)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length svmin in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2svmin',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x14kn154",
          {
            "ltr": ".x14kn154{width:calc(var(--x42dvfa) - 2svmin)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length svmax in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2svmax',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x98hj7k",
          {
            "ltr": ".x98hj7k{width:calc(var(--x42dvfa) - 2svmax)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length lvb in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2lvb',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1r61s67",
          {
            "ltr": ".x1r61s67{width:calc(var(--x42dvfa) - 2lvb)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length lvi in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2lvi',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xahs28g",
          {
            "ltr": ".xahs28g{width:calc(var(--x42dvfa) - 2lvi)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length lvmin in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2lvmin',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x150k130",
          {
            "ltr": ".x150k130{width:calc(var(--x42dvfa) - 2lvmin)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length lvmax in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2lvmax',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xx3q52e",
          {
            "ltr": ".xx3q52e{width:calc(var(--x42dvfa) - 2lvmax)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length dvb in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2dvb',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xu681px",
          {
            "ltr": ".xu681px{width:calc(var(--x42dvfa) - 2dvb)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length dvi in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2dvi',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x156czxm",
          {
            "ltr": ".x156czxm{width:calc(var(--x42dvfa) - 2dvi)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length dvmin in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2dvmin',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xe9nss5",
          {
            "ltr": ".xe9nss5{width:calc(var(--x42dvfa) - 2dvmin)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length dvmax in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2dvmax',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xdn3k44",
          {
            "ltr": ".xdn3k44{width:calc(var(--x42dvfa) - 2dvmax)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length cqw in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2cqw',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x20rgyk",
          {
            "ltr": ".x20rgyk{width:calc(var(--x42dvfa) - 2cqw)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length cqh in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2cqh',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1ey67yq",
          {
            "ltr": ".x1ey67yq{width:calc(var(--x42dvfa) - 2cqh)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length cqi in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2cqi',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x2oiioc",
          {
            "ltr": ".x2oiioc{width:calc(var(--x42dvfa) - 2cqi)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length cqb in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2cqb',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1wbo7ba",
          {
            "ltr": ".x1wbo7ba{width:calc(var(--x42dvfa) - 2cqb)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length cqmin in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2cqmin',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1iwphfd",
          {
            "ltr": ".x1iwphfd{width:calc(var(--x42dvfa) - 2cqmin)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('accepts modern CSS length cqmax in arithmetic', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: constants.gutter - '2cqmax',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xmf88lz",
          {
            "ltr": ".xmf88lz{width:calc(var(--x42dvfa) - 2cqmax)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });
});
