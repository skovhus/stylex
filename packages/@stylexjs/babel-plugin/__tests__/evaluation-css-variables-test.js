/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { transform } = require('./__fixtures__/css-arithmetic');

describe('CSS variable composition', () => {
  test("multiplies 'var(--gap)' through a local alias", () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = 'var(--gap)';
      export const styles = stylex.create({
        root: {
          width: local * 2,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1endxt5",
          {
            "ltr": ".x1endxt5{width:calc(var(--gap) * 2)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test("multiplies 'var(--gap, 8px)' through a local alias", () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = 'var(--gap, 8px)';
      export const styles = stylex.create({
        root: {
          width: local * 2,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xqrxdnb",
          {
            "ltr": ".xqrxdnb{width:calc(var(--gap,8px) * 2)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test("multiplies 'calc(var(--gap) + 8px)' through a local alias", () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = 'calc(var(--gap) + 8px)';
      export const styles = stylex.create({
        root: {
          width: local * 2,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1jqfn2c",
          {
            "ltr": ".x1jqfn2c{width:calc((var(--gap) + 8px) * 2)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('multiplies variables.gap through a local alias', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = variables.gap;
      export const styles = stylex.create({
        root: {
          width: local * 2,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1lyrjdi",
          {
            "ltr": ".x1lyrjdi{width:calc(var(--x1ez17s4) * 2)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test("multiplies variables['--gr\xF6\xDFe'] through a local alias", () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      const local = variables['--größe'];
      export const styles = stylex.create({
        root: {
          width: local * 2,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1a350m5",
          {
            "ltr": ".x1a350m5{width:calc(var(--größe) * 2)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('subtracts a 8px length from a variable', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: variables.gap - '8px',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xeasgz2",
          {
            "ltr": ".xeasgz2{width:calc(var(--x1ez17s4) - 8px)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('subtracts a 1.5rem length from a variable', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: variables.gap - '1.5rem',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1n01cwv",
          {
            "ltr": ".x1n01cwv{width:calc(var(--x1ez17s4) - 1.5rem)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('subtracts a 50% length from a variable', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: variables.gap - '50%',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xmwr1qu",
          {
            "ltr": ".xmwr1qu{width:calc(var(--x1ez17s4) - 50%)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('subtracts a -2em length from a variable', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: variables.gap - '-2em',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x7wod94",
          {
            "ltr": ".x7wod94{width:calc(var(--x1ez17s4) - -2em)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('subtracts a 2dvh length from a variable', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: variables.gap - '2dvh',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x18luzhs",
          {
            "ltr": ".x18luzhs{width:calc(var(--x1ez17s4) - 2dvh)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('subtracts a 2PX length from a variable', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: variables.gap - '2PX',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xp4de8m",
          {
            "ltr": ".xp4de8m{width:calc(var(--x1ez17s4) - 2PX)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('subtracts a 1e2px length from a variable', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: variables.gap - '1e2px',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x132xeid",
          {
            "ltr": ".x132xeid{width:calc(var(--x1ez17s4) - 1e2px)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('sets a custom property using a computed token key', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          [variables.gap]: constants.a * 2,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1ltxabd",
          {
            "ltr": ".x1ltxabd{--x1ez17s4:calc(var(--xkc4to4) * 2)}",
            "rtl": null,
          },
          1,
        ],
      ]
    `);
  });

  test('preserves CSS composition: `translateX(${variables.gap * 2})`', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          transform: \`translateX(\${variables.gap * 2})\`,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x12k14zk",
          {
            "ltr": ".x12k14zk{transform:translateX(calc(var(--x1ez17s4) * 2))}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('preserves CSS composition: `min(${variables.gap}, 40px)`', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: \`min(\${variables.gap}, 40px)\`,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xh33ahx",
          {
            "ltr": ".xh33ahx{width:min(var(--x1ez17s4),40px)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('preserves CSS composition: `max(10px, ${variables.gap})`', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: \`max(10px, \${variables.gap})\`,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xv6fans",
          {
            "ltr": ".xv6fans{width:max(10px,var(--x1ez17s4))}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('preserves CSS composition: `clamp(8px, ${variables.gap * 2}, 40px)`', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: \`clamp(8px, \${variables.gap * 2}, 40px)\`,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1qgjuvp",
          {
            "ltr": ".x1qgjuvp{width:clamp(8px,calc(var(--x1ez17s4) * 2),40px)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('preserves CSS composition: variables.gap + " 4px"', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          margin: variables.gap + ' 4px',
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1hbe5so",
          {
            "ltr": ".x1hbe5so{margin:var(--x1ez17s4) 4px}",
            "rtl": null,
          },
          1000,
        ],
      ]
    `);
  });

  test('preserves CSS composition: `var(--override, ${variables.gap})`', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: \`var(--override, \${variables.gap})\`,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x5bvw31",
          {
            "ltr": ".x5bvw31{width:var(--override,var(--x1ez17s4))}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
  });

  test('arithmetic inside fallback arrays and conditional values', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          width: {
            default: [variables.gap, variables.gap * 2],
            ':hover': variables.gap * 3,
            '@media (min-width: 600px)': variables.gap / 2,
          },
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x4uyozk",
          {
            "ltr": ".x4uyozk{width:var(--x1ez17s4);width:calc(var(--x1ez17s4) * 2)}",
            "rtl": null,
          },
          4000,
        ],
        [
          "x16tcvvl",
          {
            "ltr": ".x16tcvvl:hover{width:calc(var(--x1ez17s4) * 3)}",
            "rtl": null,
          },
          4130,
        ],
        [
          "xzlu0ra",
          {
            "ltr": "@media (min-width: 600px){.xzlu0ra.xzlu0ra{width:calc(var(--x1ez17s4) / 2)}}",
            "rtl": null,
          },
          4200,
        ],
      ]
    `);
  });

  test('same-file sibling variable arithmetic preserves CSS references', () => {
    const { metadata } = transform(
      `
      import * as stylex from '@stylexjs/stylex';
      export const variables = stylex.defineVars({
        gap: '8px',
        doubled: () => variables.gap * Math.max(1, 2),
        negative: () => -variables.gap,
      });
    `,
      '/src/arithmetic.stylex.js',
    );
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x1w9femo",
          {
            "ltr": ":root, .x1w9femo{--x1ez17s4:8px;--x13kugpu:calc(var(--x1ez17s4) * 2);--xzw2ik9:calc(-1 * var(--x1ez17s4));}",
            "rtl": null,
          },
          0.1,
        ],
      ]
    `);
  });
});
