/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { transform, stylexPlugin } = require('./__fixtures__/css-arithmetic');
const definitions = `
      import * as stylex from '@stylexjs/stylex';
      export const constants = stylex.defineConsts({ a: 26, b: 14, gutter: '16px' });
      export const variables = stylex.defineVars({ gap: '8px' });
    `;
describe('CSS arithmetic after cross-file constant substitution', () => {
  test('resolves alias chains, numeric Math, mixed variables, and CSS functions: definitions first', () => {
    const tokens = transform(definitions, '/src/arithmetic.stylex.js');
    const main = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants as imported, variables } from 'arithmetic.stylex';
      const local = imported.a;
      const alias = local;
      const scale = Math.max(Math.floor(2.9), Math.sqrt(4));
      const combined = (alias + imported.b) / scale;
      const gutter = imported.gutter;
      export const styles = stylex.create({
        root: {
          zIndex: combined,
          paddingTop: gutter * scale,
          marginTop: gutter + variables.gap,
          width: \`clamp(8px, \${gutter * scale}, 100px)\`,
        },
      });
    `);
    const rules = [...tokens.metadata.stylex, ...main.metadata.stylex];
    const css = stylexPlugin.processStylexRules(rules, {
      useLayers: false,
    });
    expect(main.metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x6llc3m",
          {
            "ltr": ".x6llc3m{z-index:calc((var(--xkc4to4) + var(--xm3quem)) / 2)}",
            "rtl": null,
          },
          3000,
        ],
        [
          "x1mcz15a",
          {
            "ltr": ".x1mcz15a{padding-top:calc(var(--x42dvfa) * 2)}",
            "rtl": null,
          },
          4000,
        ],
        [
          "xuukq4p",
          {
            "ltr": ".xuukq4p{margin-top:calc(var(--x42dvfa) + var(--x1ez17s4))}",
            "rtl": null,
          },
          4000,
        ],
        [
          "x1f5zy5f",
          {
            "ltr": ".x1f5zy5f{width:clamp(8px,calc(var(--x42dvfa) * 2),100px)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
    expect(css).toMatchInlineSnapshot(`
      ":root, .x1w9femo{--x1ez17s4:8px;}
      .x6llc3m:not(#\\#){z-index:calc((26 + 14) / 2)}
      .xuukq4p:not(#\\#):not(#\\#){margin-top:calc(16px + var(--x1ez17s4))}
      .x1mcz15a:not(#\\#):not(#\\#){padding-top:calc(16px * 2)}
      .x1f5zy5f:not(#\\#):not(#\\#){width:clamp(8px,calc(16px * 2),100px)}"
    `);
  });

  test('resolves alias chains, numeric Math, mixed variables, and CSS functions: definitions last', () => {
    const tokens = transform(definitions, '/src/arithmetic.stylex.js');
    const main = transform(`
      import * as stylex from '@stylexjs/stylex';
      import { constants as imported, variables } from 'arithmetic.stylex';
      const local = imported.a;
      const alias = local;
      const scale = Math.max(Math.floor(2.9), Math.sqrt(4));
      const combined = (alias + imported.b) / scale;
      const gutter = imported.gutter;
      export const styles = stylex.create({
        root: {
          zIndex: combined,
          paddingTop: gutter * scale,
          marginTop: gutter + variables.gap,
          width: \`clamp(8px, \${gutter * scale}, 100px)\`,
        },
      });
    `);
    const rules = [...tokens.metadata.stylex, ...main.metadata.stylex];
    const css = stylexPlugin.processStylexRules([...rules].reverse(), {
      useLayers: false,
    });
    expect(main.metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "x6llc3m",
          {
            "ltr": ".x6llc3m{z-index:calc((var(--xkc4to4) + var(--xm3quem)) / 2)}",
            "rtl": null,
          },
          3000,
        ],
        [
          "x1mcz15a",
          {
            "ltr": ".x1mcz15a{padding-top:calc(var(--x42dvfa) * 2)}",
            "rtl": null,
          },
          4000,
        ],
        [
          "xuukq4p",
          {
            "ltr": ".xuukq4p{margin-top:calc(var(--x42dvfa) + var(--x1ez17s4))}",
            "rtl": null,
          },
          4000,
        ],
        [
          "x1f5zy5f",
          {
            "ltr": ".x1f5zy5f{width:clamp(8px,calc(var(--x42dvfa) * 2),100px)}",
            "rtl": null,
          },
          4000,
        ],
      ]
    `);
    expect(css).toMatchInlineSnapshot(`
      ":root, .x1w9femo{--x1ez17s4:8px;}
      .x6llc3m:not(#\\#){z-index:calc((26 + 14) / 2)}
      .xuukq4p:not(#\\#):not(#\\#){margin-top:calc(16px + var(--x1ez17s4))}
      .x1mcz15a:not(#\\#):not(#\\#){padding-top:calc(16px * 2)}
      .x1f5zy5f:not(#\\#):not(#\\#){width:clamp(8px,calc(16px * 2),100px)}"
    `);
  });
});
