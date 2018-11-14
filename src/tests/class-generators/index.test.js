/* eslint-env jest, node */

import { createModifierClassNames } from '../../class-generators';

describe('createModifierClassName', () => {
  it('generates classNames', () => {
    const height = { propName: 'h' };
    const sampleValues = ['1','2','3'];
    const pixelModifier = {
      name: 'pixel',
      indicator: 'px'
    };

    expect(createModifierClassNames({
      prop: height,
      modifier: pixelModifier,
      sampleValues
    })).toEqual(['h1px','h2px','h3px']);
  });

  it('generates classNames for modifierValues', () => {
    const opacityModifier = {
      separator: '_',
      indicator: '\\d+',
      sampleValues: ['black','pink'],
      sampleIndicatorValues: ['20','30']
    };

    const color = { propName: ''};

    expect(createModifierClassNames({
      prop: color,
      modifier: opacityModifier,
    })).toEqual(['black_20','black_30','pink_20','pink_30']);
  });

  it('generates classNames with indicator values', () => {
    const sampleValues = ['black','white','pink'];
    const opacityModifier = {
      separator: '_',
      indicator: '\\d+',
      sampleIndicatorValues: ['20','30','07','01','99']
    };

    const backgroundColor = { propName: 'bg', separator: '-' };

    expect(createModifierClassNames({
      prop: backgroundColor,
      modifier: opacityModifier,
      sampleValues
    })).toEqual([
      'bg-black_20','bg-black_30','bg-black_07','bg-black_01','bg-black_99',
      'bg-white_20','bg-white_30','bg-white_07','bg-white_01','bg-white_99',
      'bg-pink_20','bg-pink_30','bg-pink_07','bg-pink_01','bg-pink_99',
    ]);
  });
});
