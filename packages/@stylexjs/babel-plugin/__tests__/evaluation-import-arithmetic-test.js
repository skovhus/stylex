/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

jest.autoMockOff();
jest.mock('@dual-bundle/import-meta-resolve');

/* eslint-disable quotes */
const { transformSync } = require('@babel/core');
const stylexPlugin = require('../src/index');
const jsx = require('@babel/plugin-syntax-jsx');
const options = {
  classNamePrefix: '__hashed_var__',
};

function transform(source, opts = options) {
  return transformSync(source, {
    filename: opts.filename ?? 'test.js',
    parserOpts: {
      flow: 'all',
    },
    babelrc: false,
    plugins: [
      jsx,
      [
        stylexPlugin,
        {
          treeshakeCompensation: true,
          runtimeInjection: true,
          unstable_moduleResolution: {
            type: 'haste',
          },
          ...opts,
        },
      ],
    ],
  });
}

describe('Arithmetic on imported tokens', () => {
  test('token + token', () => {
    const { metadata } = transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme.a + MyTheme.b,
        },
      });
      stylex(styles.box);
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "__hashed_var__d3ce1",
          {
            "ltr": ".__hashed_var__d3ce1{z-index:calc(var(--__hashed_var__11dj200) + var(--__hashed_var__swdua))}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('token + number and number + token: MyTheme.a + 4', () => {
    const { metadata } = transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme.a + 4,
        },
      });
      stylex(styles.box);
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "__hashed_var__v1er1n",
          {
            "ltr": ".__hashed_var__v1er1n{z-index:calc(var(--__hashed_var__11dj200) + 4)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('token + number and number + token: 4 + MyTheme.a', () => {
    const { metadata } = transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: 4 + MyTheme.a,
        },
      });
      stylex(styles.box);
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "__hashed_var__edy5ma",
          {
            "ltr": ".__hashed_var__edy5ma{z-index:calc(4 + var(--__hashed_var__11dj200))}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('token - number, token * number, token / number: MyTheme.a - 1', () => {
    const { metadata } = transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme.a - 1,
        },
      });
      stylex(styles.box);
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "__hashed_var__1xcare8",
          {
            "ltr": ".__hashed_var__1xcare8{z-index:calc(var(--__hashed_var__11dj200) - 1)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('token - number, token * number, token / number: MyTheme.a * 2', () => {
    const { metadata } = transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme.a * 2,
        },
      });
      stylex(styles.box);
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "__hashed_var__1itb14a",
          {
            "ltr": ".__hashed_var__1itb14a{z-index:calc(var(--__hashed_var__11dj200) * 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('token - number, token * number, token / number: MyTheme.a / 2', () => {
    const { metadata } = transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme.a / 2,
        },
      });
      stylex(styles.box);
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "__hashed_var__1v3cu49",
          {
            "ltr": ".__hashed_var__1v3cu49{z-index:calc(var(--__hashed_var__11dj200) / 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('unary minus on a token', () => {
    const { metadata } = transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: -MyTheme.a,
        },
      });
      stylex(styles.box);
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "__hashed_var__1af2qnl",
          {
            "ltr": ".__hashed_var__1af2qnl{z-index:calc(-1 * var(--__hashed_var__11dj200))}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('nested arithmetic flattens to parens: MyTheme.a + MyTheme.b * MyTheme.c', () => {
    const { metadata } = transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme.a + MyTheme.b * MyTheme.c,
        },
      });
      stylex(styles.box);
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "__hashed_var__s82mnh",
          {
            "ltr": ".__hashed_var__s82mnh{z-index:calc(var(--__hashed_var__11dj200) + (var(--__hashed_var__swdua) * var(--__hashed_var__ujjbii)))}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('nested arithmetic flattens to parens: (MyTheme.a + MyTheme.b) * 2', () => {
    const { metadata } = transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: (MyTheme.a + MyTheme.b) * 2,
        },
      });
      stylex(styles.box);
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "__hashed_var__h5opg",
          {
            "ltr": ".__hashed_var__h5opg{z-index:calc((var(--__hashed_var__11dj200) + var(--__hashed_var__swdua)) * 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('nested arithmetic flattens to parens: (MyTheme.a + (MyTheme.b - MyTheme.c)) / 2', () => {
    const { metadata } = transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: (MyTheme.a + (MyTheme.b - MyTheme.c)) / 2,
        },
      });
      stylex(styles.box);
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "__hashed_var__182eov3",
          {
            "ltr": ".__hashed_var__182eov3{z-index:calc((var(--__hashed_var__11dj200) + (var(--__hashed_var__swdua) - var(--__hashed_var__ujjbii))) / 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('token + separated string stays list concatenation', () => {
    const { metadata } = transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme.a + ' 4px',
        },
      });
      stylex(styles.box);
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "__hashed_var__7d0yzc",
          {
            "ltr": ".__hashed_var__7d0yzc{z-index:var(--__hashed_var__11dj200) 4px}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('string concatenation with non-numeric strings is preserved', () => {
    const { metadata } = transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          fontFamily: 'Arial, ' + MyTheme.font,
        },
      });
      stylex(styles.box);
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "__hashed_var__57qnmo",
          {
            "ltr": ".__hashed_var__57qnmo{font-family:Arial,var(--__hashed_var__cwwif)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('function-like string concatenation around a token is preserved', () => {
    const { metadata } = transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          transform: 'translateX(' + MyTheme.a + ')',
        },
      });
      stylex(styles.box);
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "__hashed_var__1dzyc08",
          {
            "ltr": ".__hashed_var__1dzyc08{transform:translateX(var(--__hashed_var__11dj200))}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('template literal interpolation uses the same concat rules: `${MyTheme.a} 4px`', () => {
    const { metadata } = transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          margin: \`\${MyTheme.a} 4px\`,
        },
      });
      stylex(styles.box);
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "__hashed_var__1l1dkal",
          {
            "ltr": ".__hashed_var__1l1dkal{margin:var(--__hashed_var__11dj200) 4px}",
            "rtl": null,
          },
          1000,
        ],
      ]
    `);
  });

  test('null and undefined guards on tokens still compile: MyTheme.a != null ? 5 : 7', () => {
    const { metadata } = transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme.a != null ? 5 : 7,
        },
      });
      stylex(styles.box);
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "__hashed_var__1u8a7rm",
          {
            "ltr": ".__hashed_var__1u8a7rm{z-index:5}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('null and undefined guards on tokens still compile: MyTheme.a === undefined ? 5 : 7', () => {
    const { metadata } = transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme.a === undefined ? 5 : 7,
        },
      });
      stylex(styles.box);
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "__hashed_var__16tb26j",
          {
            "ltr": ".__hashed_var__16tb26j{z-index:7}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('null and undefined guards on tokens still compile: MyTheme.a ?? 7', () => {
    const { metadata } = transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme.a ?? 7,
        },
      });
      stylex(styles.box);
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "__hashed_var__if8ykl",
          {
            "ltr": ".__hashed_var__if8ykl{z-index:var(--__hashed_var__11dj200)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('unicode custom property keys work with arithmetic', () => {
    const { metadata } = transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const styles = stylex.create({
        box: {
          zIndex: MyTheme['--größe'] * 2,
        },
      });
      stylex(styles.box);
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "__hashed_var__w6duuo",
          {
            "ltr": ".__hashed_var__w6duuo{z-index:calc(var(--größe) * 2)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });

  test('Number() wrapped token arithmetic in a local constant compiles to calc()', () => {
    const { metadata } = transform(`
      import stylex from 'stylex';
      import { MyTheme } from 'otherFile.stylex';
      const PRESENTER_Z_INDEX = Number(MyTheme.dialog) + 1;
      const styles = stylex.create({
        box: {
          zIndex: PRESENTER_Z_INDEX,
        },
      });
      stylex(styles.box);
    `);
    expect(metadata.stylex).toMatchInlineSnapshot(`
      [
        [
          "__hashed_var__1ekpozs",
          {
            "ltr": ".__hashed_var__1ekpozs{z-index:calc(var(--__hashed_var__1cbrque) + 1)}",
            "rtl": null,
          },
          3000,
        ],
      ]
    `);
  });
});
