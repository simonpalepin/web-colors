import { rgbaParser, rgbaToText, textToRgba, isRgb, isRgba, isRgbText, isRgbaText, rgbaRegExp } from './rgba';

/**
 * rgbaParser Tests
 */
describe('rgbaParser extracts values and returns string[] or null if invalid', () => {
  it('should return an array of 4 values given a valid rgba text', () => {
    expect(rgbaParser(`rgba(100.0%, 10%, 5%, 1)`)).toEqual([
      '100.0%',
      '10%',
      '5%',
      '1',
    ]);
    expect(rgbaParser(`rgba(100.0, 255, .5, 100.0%)`)).toEqual([
      '100.0',
      '255',
      '.5',
      '100.0%',
    ]);
    expect(rgbaParser(`rgba(100.0, 255, .5, 100.0%)`)).not.toEqual([
      '100.0',
      255,
      '.5',
      '100.0%',
    ]);
  });

  it('should return an array of 3 values given a valid rgb text', () => {
    expect(rgbaParser(`rgb(100.0%, 10%, 5%)`)).toEqual(['100.0%', '10%', '5%']);
    expect(rgbaParser(`rgb(100.0, 255, .5)`)).toEqual(['100.0', '255', '.5']);
    expect(rgbaParser(`rgb(100.0, 255, .5, 100.0%)`)).not.toEqual([
      '100.0',
      '255',
      '.5',
      '100.0%',
    ]);
  });

  it('should return undefined goven an invalid rgb text', () => {
    expect(rgbaParser(`rgb 100.0%, 10%, 5%`)).not.toBeDefined();
    expect(rgbaParser(null)).not.toBeDefined();
    expect(rgbaParser({})).not.toBeDefined();
  });
});

/**
 * rgbaToText Tests
 */
 describe('rgbaToText converts RGB/RGBA object to text', () => {
  it('should convert object to rgb or rgba', () => {
    expect(rgbaToText({R: 100, G: 100.55, B: 255.0})).toEqual('rgb(100, 100.55, 255)');
    expect(rgbaToText({R: 100, G: 100.55, B: 255.0, A: 99.45})).toEqual('rgba(100, 100.55, 255, 0.39)');
  });
});

/**
 * textToRgba Tests
 */
 describe('textToRgba converts RGB/RGBA text to object', () => {
  it('should convert object to rgb or rgba', () => {
    expect(textToRgba('rgb(100, 100.55, 255)')).toEqual({R: 100, G: 100.55, B: 255.0});
    expect(textToRgba('rgba(100, 100.55, 255.0, .39)')).toEqual({R: 100, G: 100.55, B: 255.0, A: 99.45});
  });
});

/**
 * isRgb, isRgba, isRgbText, isRgbaText Tests
 */
 describe('Validates RGB/RGBA type text/object value (isRgb/isRgba/isRgbText/isRgbaText)', () => {
  it('should be a valid RGB Object', () => {
    expect(isRgb({R: 100, G: 100.55, B: 255.0})).toBeTruthy();
    expect(isRgb({R: 100, G: 100.55, B: -1})).toBeFalsy();
    expect(isRgb({R: 100, G: 100.55, B: 260})).toBeFalsy();
  });

  it('should be a valid RGBA Object', () => {
    expect(isRgba({R: 100, G: 100.55, B: 255.0, A: 255.0})).toBeTruthy();
    expect(isRgba({R: 100, G: 100.55, B: 255.0, A: -1.0})).toBeFalsy();
    expect(isRgba({R: 100, G: 100.55, B: -1})).toBeFalsy();
    expect(isRgba({R: 100, G: 100.55, B: 260, A: 0})).toBeFalsy();
  });

  it('should be a valid RGB text', () => {
    expect(isRgbText('rgb(100, 100.55, 255)')).toBeTruthy();
    expect(isRgbText('rgb(100, 100.55, 265)')).toBeFalsy();
    expect(isRgbText('rgba(100, 100.55, 255, 0)')).toBeFalsy();
  });

  it('should be a valid RGBA text', () => {
    expect(isRgbaText('rgba(100, 100.55, 25, 1)')).toBeTruthy();
    expect(isRgbaText('rgba(100  100.55 25 /1)')).toBeTruthy();
    expect(isRgbaText('rgba(100% 10% 25% /10%)')).toBeTruthy();
    expect(isRgbaText('rgba(100, 100.55, 25, 100%)')).toBeTruthy();
    expect(isRgbaText('rgba(100%, 10.55%, 25%, 100%)')).toBeTruthy();
    expect(isRgbaText('rgba(100, 100.55, 255, 255)')).toBeFalsy();
    expect(isRgbaText('rgba(100, 100.55, 26, 101%)')).toBeFalsy();
    expect(isRgbaText('rgb(100, 100.55, 255, 0)')).toBeFalsy();
  });
});

/**
 * isRgba Tests
 */
 describe('isRgba validates type and values', () => {
  it('should convert object to rgb or rgba', () => {
    expect(textToRgba('rgb(100, 100.55, 255)')).toEqual({R: 100, G: 100.55, B: 255.0});
    expect(textToRgba('rgba(100, 100.55, 255.0, .39)')).toEqual({R: 100, G: 100.55, B: 255.0, A: 99.45});
  });
});

/**
 * isRgbText Tests
 */
 describe('textToRgba converts RGB/RGBA text to object', () => {
  it('should convert object to rgb or rgba', () => {
    expect(textToRgba('rgb(100, 100.55, 255)')).toEqual({R: 100, G: 100.55, B: 255.0});
    expect(textToRgba('rgba(100, 100.55, 255.0, .39)')).toEqual({R: 100, G: 100.55, B: 255.0, A: 99.45});
  });
});

/**
 * isRgbaText Tests
 */
 describe('textToRgba converts RGB/RGBA text to object', () => {
  it('should convert object to rgb or rgba', () => {
    expect(textToRgba('rgb(100, 100.55, 255)')).toEqual({R: 100, G: 100.55, B: 255.0});
    expect(textToRgba('rgba(100, 100.55, 255.0, .39)')).toEqual({R: 100, G: 100.55, B: 255.0, A: 99.45});
  });
});

/**
 * RGBA RegExp Tests
 */
describe('numberRGB regular expression with perfect capture groups', () => {
  it('should match rgb(<number>, <number>, <number>)', () => {
    expect(rgbaRegExp.numberRGB.test('rgb(100, 100.55, 255.0)')).toEqual(true);
    expect(rgbaRegExp.numberRGB.test('rgb(0.100, .55, 0)')).toEqual(true);
    expect(rgbaRegExp.numberRGB.test('rgb(0.100, .55, 0, 1)')).toEqual(false);
    expect(rgbaRegExp.numberRGB.test('rgba(0.100, .55, 0)')).toEqual(false);
  });

  it('should not match rgb function with alpha argument', () => {
    expect(rgbaRegExp.numberRGB.test('rgb(0.100, .55, 100.1, 1)')).toBeFalsy();
  });
});

describe('numberRGBA regular expression with capture groups', () => {
  it('should match rgba(<number>, <number>, <number>, <alpha-value>)', () => {
    expect(rgbaRegExp.numberRGBA.test('rgba(0.100, .55, 0, .22)')).toEqual(true);
    expect(rgbaRegExp.numberRGBA.test('rgba(0.100, .55, 0, 1.00)')).toEqual(true);
    expect(rgbaRegExp.numberRGBA.test('rgba(0.100, .55, 0, 1.1)')).toBeFalsy();
  });

  it('should match rgba(<number>, <number>, <number>, <alpha-value>)', () => {
    expect(rgbaRegExp.numberRGBA.test('rgba(100, 100.55, 255.0, 100.0%)')).toEqual(true);
    expect(rgbaRegExp.numberRGBA.test('rgba(0.100, .55, 0, 1.22%)')).toEqual(true);
    expect(rgbaRegExp.numberRGBA.test('rgba(0.100, .55, 0, .22%)')).toEqual(true);
    expect(rgbaRegExp.numberRGBA.test('rgba(0.100, .55, 0, 0%)')).toEqual(true);
    expect(rgbaRegExp.numberRGBA.test('rgba(0.100, .55, 0)')).toBeFalsy();
    expect(rgbaRegExp.numberRGBA.test('rgb(0.100, .55, 0, 1)')).toEqual(false);
  });

  it('should not match rgba without alpha', () => {
    expect(rgbaRegExp.numberRGBA.test('rgba(0.100, .55, 100.1)')).toBeFalsy();
  });
});

describe('numberRGBACss4 regular expression with capture groups', () => {
  it('should match css4 rgba(<number> <number> <number> / <number>)', () => {
    expect(rgbaRegExp.numberRGBACss4.test('rgba(100 10.55 255 / 1)')).toEqual(true);
    expect(rgbaRegExp.numberRGBACss4.test('rgba(0.100 .55 0  /.22)')).toEqual(true);
    expect(rgbaRegExp.numberRGBACss4.test('rgba(0.100 .55 0 .22)')).toEqual(false);
  });

  it('should match css4 rgba(<number> <number> <number> / <percent>)', () => {
    expect(rgbaRegExp.numberRGBACss4.test('rgba(100 10.55 255 / 1%)')).toEqual(true);
    expect(rgbaRegExp.numberRGBACss4.test('rgba(0.100 .55 0  /.22%)')).toEqual(true);
    expect(rgbaRegExp.numberRGBACss4.test('rgba(0.100 .55 0  .22%)')).toEqual(false);
  });
});

describe('percentRGB regular expression with capture groups', () => {
  it('should match rgb(<percent>, <percent>, <percent>)', () => {
    expect(rgbaRegExp.percentRGB.test('rgb(100%, 10.55%, 25%)')).toEqual(true);
    expect(rgbaRegExp.percentRGB.test('rgb(0.100%, .55%, 0.1%)')).toEqual(true);
    expect(rgbaRegExp.percentRGB.test('rgb(255, .55%, 0.1%)')).toEqual(false);
  });
});

describe('percentRGBA regular expression with capture groups', () => {
  it('should match rgba(<percent>, <percent>, <percent>, <percent>)', () => {
    expect(rgbaRegExp.percentRGBA.test('rgba(100%, 10.55%, 0%, 100.0%)')).toEqual(true);
    expect(rgbaRegExp.percentRGBA.test('rgba(0.100%, .55%, 0%, 1.22%)')).toEqual(true);
    expect(rgbaRegExp.percentRGBA.test('rgba(255, .55%, 0%, 1.22%)')).toEqual(false);
  });

  it('should match rgba(<percent>, <percent>, <percent>, <number>)', () => {
    expect(rgbaRegExp.percentRGBA.test('rgba(100%, 10.55%, 0%, 1)')).toEqual(true);
    expect(rgbaRegExp.percentRGBA.test('rgba(0.100%, .55%, 0%, .22)')).toEqual(true);
    expect(rgbaRegExp.percentRGBA.test('rgba(0.100%, .55%, 0, .22)')).toEqual(false);
  });
});

describe('percentRGBACss4 regular expression with capture groups', () => {
  it('should match css4 rgba(<percent> <percent> <percent> / <number>)', () => {
    expect(rgbaRegExp.percentRGBACss4.test('rgba(100% 10.55% 0% / 1)')).toEqual(true);
    expect(rgbaRegExp.percentRGBACss4.test('rgba(0.100% .55% 0%  /.22)')).toEqual(true);
    expect(rgbaRegExp.percentRGBACss4.test('rgba(0.100% .55% 0%  .22)')).toEqual(false);
  });

  it('should match css4 rgba(<percent> <percent> <percent> / <percent>)', () => {
    expect(rgbaRegExp.percentRGBACss4.test('rgba(100% 10.55% 0% / 1%)')).toEqual(true);
    expect(rgbaRegExp.percentRGBACss4.test('rgba(0.100% .55% 0%  /.22%)')).toEqual(true);
    expect(rgbaRegExp.percentRGBACss4.test('rgba(0.100% .55% 0% .22%)')).toEqual(false);
  });
});
