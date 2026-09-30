/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import { Length } from '../length';

describe('Test CSS Type: <length>', () => {
  test('parses font-based units', () => {
    expect(Length.parser.parse('10ch')).toEqual(new Length(10, 'ch'));
    expect(Length.parser.parse('2em')).toEqual(new Length(2, 'em'));
    expect(Length.parser.parse('1.5ex')).toEqual(new Length(1.5, 'ex'));
    expect(Length.parser.parse('3ic')).toEqual(new Length(3, 'ic'));
    expect(Length.parser.parse('1.2lh')).toEqual(new Length(1.2, 'lh'));
    expect(Length.parser.parse('2rem')).toEqual(new Length(2, 'rem'));
    expect(Length.parser.parse('1rlh')).toEqual(new Length(1, 'rlh'));
  });

  test('parses viewport-based units', () => {
    expect(Length.parser.parse('50vh')).toEqual(new Length(50, 'vh'));
    expect(Length.parser.parse('100vw')).toEqual(new Length(100, 'vw'));
    expect(Length.parser.parse('80svh')).toEqual(new Length(80, 'svh'));
    expect(Length.parser.parse('90lvw')).toEqual(new Length(90, 'lvw'));
    expect(Length.parser.parse('70dvh')).toEqual(new Length(70, 'dvh'));
    expect(Length.parser.parse('60vmin')).toEqual(new Length(60, 'vmin'));
    expect(Length.parser.parse('85vmax')).toEqual(new Length(85, 'vmax'));
  });

  test('parses container-based units', () => {
    expect(Length.parser.parse('30cqw')).toEqual(new Length(30, 'cqw'));
    expect(Length.parser.parse('40cqi')).toEqual(new Length(40, 'cqi'));
    expect(Length.parser.parse('50cqh')).toEqual(new Length(50, 'cqh'));
    expect(Length.parser.parse('60cqb')).toEqual(new Length(60, 'cqb'));
    expect(Length.parser.parse('45cqmin')).toEqual(new Length(45, 'cqmin'));
    expect(Length.parser.parse('75cqmax')).toEqual(new Length(75, 'cqmax'));
  });

  test('parses absolute units', () => {
    expect(Length.parser.parse('16px')).toEqual(new Length(16, 'px'));
    expect(Length.parser.parse('2cm')).toEqual(new Length(2, 'cm'));
    expect(Length.parser.parse('10mm')).toEqual(new Length(10, 'mm'));
    expect(Length.parser.parse('1in')).toEqual(new Length(1, 'in'));
    expect(Length.parser.parse('12pt')).toEqual(new Length(12, 'pt'));
  });

  test('parses modern and case-insensitive length unit pc', () => {
    expect(Length.parser.parseToEnd(`2${'pc'}`)).toEqual(new Length(2, 'pc'));
  });

  test('parses modern and case-insensitive length unit q', () => {
    expect(Length.parser.parseToEnd(`2${'q'}`)).toEqual(new Length(2, 'q'));
  });

  test('parses modern and case-insensitive length unit cap', () => {
    expect(Length.parser.parseToEnd(`2${'cap'}`)).toEqual(new Length(2, 'cap'));
  });

  test('parses modern and case-insensitive length unit rex', () => {
    expect(Length.parser.parseToEnd(`2${'rex'}`)).toEqual(new Length(2, 'rex'));
  });

  test('parses modern and case-insensitive length unit rch', () => {
    expect(Length.parser.parseToEnd(`2${'rch'}`)).toEqual(new Length(2, 'rch'));
  });

  test('parses modern and case-insensitive length unit rcap', () => {
    expect(Length.parser.parseToEnd(`2${'rcap'}`)).toEqual(
      new Length(2, 'rcap'),
    );
  });

  test('parses modern and case-insensitive length unit ric', () => {
    expect(Length.parser.parseToEnd(`2${'ric'}`)).toEqual(new Length(2, 'ric'));
  });

  test('parses modern and case-insensitive length unit vb', () => {
    expect(Length.parser.parseToEnd(`2${'vb'}`)).toEqual(new Length(2, 'vb'));
  });

  test('parses modern and case-insensitive length unit vi', () => {
    expect(Length.parser.parseToEnd(`2${'vi'}`)).toEqual(new Length(2, 'vi'));
  });

  test('parses modern and case-insensitive length unit svb', () => {
    expect(Length.parser.parseToEnd(`2${'svb'}`)).toEqual(new Length(2, 'svb'));
  });

  test('parses modern and case-insensitive length unit svi', () => {
    expect(Length.parser.parseToEnd(`2${'svi'}`)).toEqual(new Length(2, 'svi'));
  });

  test('parses modern and case-insensitive length unit lvb', () => {
    expect(Length.parser.parseToEnd(`2${'lvb'}`)).toEqual(new Length(2, 'lvb'));
  });

  test('parses modern and case-insensitive length unit lvi', () => {
    expect(Length.parser.parseToEnd(`2${'lvi'}`)).toEqual(new Length(2, 'lvi'));
  });

  test('parses modern and case-insensitive length unit dvb', () => {
    expect(Length.parser.parseToEnd(`2${'dvb'}`)).toEqual(new Length(2, 'dvb'));
  });

  test('parses modern and case-insensitive length unit dvi', () => {
    expect(Length.parser.parseToEnd(`2${'dvi'}`)).toEqual(new Length(2, 'dvi'));
  });

  test('parses modern and case-insensitive length unit svmin', () => {
    expect(Length.parser.parseToEnd(`2${'svmin'}`)).toEqual(
      new Length(2, 'svmin'),
    );
  });

  test('parses modern and case-insensitive length unit lvmin', () => {
    expect(Length.parser.parseToEnd(`2${'lvmin'}`)).toEqual(
      new Length(2, 'lvmin'),
    );
  });

  test('parses modern and case-insensitive length unit dvmin', () => {
    expect(Length.parser.parseToEnd(`2${'dvmin'}`)).toEqual(
      new Length(2, 'dvmin'),
    );
  });

  test('parses modern and case-insensitive length unit svmax', () => {
    expect(Length.parser.parseToEnd(`2${'svmax'}`)).toEqual(
      new Length(2, 'svmax'),
    );
  });

  test('parses modern and case-insensitive length unit lvmax', () => {
    expect(Length.parser.parseToEnd(`2${'lvmax'}`)).toEqual(
      new Length(2, 'lvmax'),
    );
  });

  test('parses modern and case-insensitive length unit dvmax', () => {
    expect(Length.parser.parseToEnd(`2${'dvmax'}`)).toEqual(
      new Length(2, 'dvmax'),
    );
  });

  test('parses modern and case-insensitive length unit RCAP', () => {
    expect(Length.parser.parseToEnd(`2${'RCAP'}`)).toEqual(
      new Length(2, 'RCAP'),
    );
  });

  test('rejects invalid units', () => {
    expect(() => Length.parser.parseToEnd('10abc')).toThrow();
    expect(() => Length.parser.parseToEnd('30')).toThrow();
    expect(() => Length.parser.parseToEnd('xyz')).toThrow();
  });
});
