/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { transform } = require('./__fixtures__/css-arithmetic');

describe('arithmetic regression coverage', () => {
  test('allows the CSS slash separator in `${variables.gap}/${variables.other}`', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          borderRadius: \`\${variables.gap}/\${variables.other}\`,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x11vhpl6",
          {
            "ltr": ".x11vhpl6{border-radius:var(--x1ez17s4) / var(--x1710b57)}",
            "rtl": null,
          },
          2000,
        ],
      ]
    `);
  });

  test("allows the CSS slash separator in variables.gap + '/' + variables.other", () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          borderRadius: variables.gap + '/' + variables.other,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x11vhpl6",
          {
            "ltr": ".x11vhpl6{border-radius:var(--x1ez17s4) / var(--x1710b57)}",
            "rtl": null,
          },
          2000,
        ],
      ]
    `);
  });

  test('preserves CSS math template `calc(${constants.a}*2)`', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: \`calc(\${constants.a}*2)\`,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x185ovlg",
          {
            "ltr": ".x185ovlg{z-index:calc(var(--xkc4to4)*2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('preserves CSS math template `calc(2*${constants.a})`', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: \`calc(2*\${constants.a})\`,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x11vitg0",
          {
            "ltr": ".x11vitg0{z-index:calc(2*var(--xkc4to4))}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('preserves CSS math template `calc(${constants.a}/2)`', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: \`calc(\${constants.a}/2)\`,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x3aa2ec",
          {
            "ltr": ".x3aa2ec{z-index:calc(var(--xkc4to4)/2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('preserves CSS math template `calc(2/${constants.a})`', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: \`calc(2/\${constants.a})\`,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xtucy6i",
          {
            "ltr": ".xtucy6i{z-index:calc(2/var(--xkc4to4))}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('does not round a nonzero divisor down to zero', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          zIndex: constants.a / Math.pow(10, -5),
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x4pdra",
          {
            "ltr": ".x4pdra{z-index:calc(var(--xkc4to4) / .00001)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('rejects jammed interpolation in `translateX(${constants.gutter}px)`', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          transform: \`translateX(\${constants.gutter}px)\`,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Joining a StyleX variable or constant directly to other text with "+" would
      produce invalid CSS. For arithmetic, use numbers or other variables or
      constants (compiles to a CSS calc() expression). For a list of values,
      include an explicit separator, e.g. 'solid ' + token.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           transform: \`translateX(\${constants.gutter}px)\`,
          |                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('rejects jammed interpolation in `translateX(${constants.gutter}${""}px)`', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          transform: \`translateX(\${constants.gutter}\${''}px)\`,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Joining a StyleX variable or constant directly to other text with "+" would
      produce invalid CSS. For arithmetic, use numbers or other variables or
      constants (compiles to a CSS calc() expression). For a list of values,
      include an explicit separator, e.g. 'solid ' + token.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           transform: \`translateX(\${constants.gutter}\${''}px)\`,
          |                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('rejects jammed interpolation in `translateX(${constants.gutter * 2}px)`', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          transform: \`translateX(\${constants.gutter * 2}px)\`,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Joining a StyleX variable or constant directly to other text with "+" would
      produce invalid CSS. For arithmetic, use numbers or other variables or
      constants (compiles to a CSS calc() expression). For a list of values,
      include an explicit separator, e.g. 'solid ' + token.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           transform: \`translateX(\${constants.gutter * 2}px)\`,
          |                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('rejects jammed interpolation in `translate(${constants.gutter}px, 0)`', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          transform: \`translate(\${constants.gutter}px, 0)\`,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Joining a StyleX variable or constant directly to other text with "+" would
      produce invalid CSS. For arithmetic, use numbers or other variables or
      constants (compiles to a CSS calc() expression). For a list of values,
      include an explicit separator, e.g. 'solid ' + token.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           transform: \`translate(\${constants.gutter}px, 0)\`,
          |                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('rejects jammed interpolation in `translate(${constants.gutter}${constants.gutter})`', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          transform: \`translate(\${constants.gutter}\${constants.gutter})\`,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Joining a StyleX variable or constant directly to other text with "+" would
      produce invalid CSS. For arithmetic, use numbers or other variables or
      constants (compiles to a CSS calc() expression). For a list of values,
      include an explicit separator, e.g. 'solid ' + token.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           transform: \`translate(\${constants.gutter}\${constants.gutter})\`,
          |                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('rejects jammed interpolation in `translateX(px${constants.gutter})`', () => {
    expect(() =>
      transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          transform: \`translateX(px\${constants.gutter})\`,
        },
      });
    `),
    ).toThrowErrorMatchingInlineSnapshot(`
      "/src/main.js: Joining a StyleX variable or constant directly to other text with "+" would
      produce invalid CSS. For arithmetic, use numbers or other variables or
      constants (compiles to a CSS calc() expression). For a list of values,
      include an explicit separator, e.g. 'solid ' + token.


        4 |       export const styles = stylex.create({
        5 |         root: {
      > 6 |           transform: \`translateX(px\${constants.gutter})\`,
          |                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        7 |         },
        8 |       });
        9 |     "
    `);
  });

  test('preserves separated interpolation in `translateX(${constants.gutter})`', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          transform: \`translateX(\${constants.gutter})\`,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xp0bbli",
          {
            "ltr": ".xp0bbli{transform:translateX(var(--x42dvfa))}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('preserves separated interpolation in `translateX(${""}${constants.gutter}${""})`', () => {
    const { metadata } = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants, variables } from 'arithmetic.stylex';
      export const styles = stylex.create({
        root: {
          transform: \`translateX(\${''}\${constants.gutter}\${''})\`,
        },
      });
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "xp0bbli",
          {
            "ltr": ".xp0bbli{transform:translateX(var(--x42dvfa))}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });
});
