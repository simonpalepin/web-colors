import { toChannel, toAlphaChannel, toFloat, isPercent, isValidChannel } from './utils';

describe('toChannel rounds and/or converts percent to valid 8bit channel value 0 to 255 (0x00 - 0xff)', () => {
  it('should convert and/or round percent to valid 8bit channel value 0 to 255 (0x00 - 0xff)', () => {
    expect(toChannel('0%')).toEqual(0);
    expect(toChannel('100%')).toEqual(255);
    expect(toChannel('50%')).toEqual(127.5);
    expect(toChannel('50.25%')).toEqual(128.14);
    expect(toChannel('50.25%', 0)).toEqual(128);
    expect(toChannel('50.25%', 1)).toEqual(128.1);
  });

  it('should round percent to valid 8bit channel value 0 to 255 (0x00 - 0xff)', () => {
    expect(toChannel('0%')).toEqual(0);
    expect(toChannel('100%')).toEqual(255);
    expect(toChannel('50%')).toEqual(127.5);
    expect(toChannel('50.25%')).toEqual(128.14);
  });

  it('should round valid 8bit channel value 0 to 255', () => {
    expect(toChannel(0)).toEqual(0);
    expect(toChannel(100.125, 2)).toEqual(100.13);
    expect(toChannel(255)).toEqual(255);
    expect(toChannel(254.45, 1)).toEqual(254.4);
    expect(toChannel(254.46, 1)).toEqual(254.5);
  });
});

describe('toAlphaChannel rounds and/or converts percent to valid 8bit channel value 0 to 255 (0x00 - 0xff)', () => {
  it('should convert alpha value/percent to a valid 8bit channel value 0 to 255 (0x00 - 0xff)', () => {
    expect(toAlphaChannel('0%')).toEqual(0);
    expect(toAlphaChannel('100%')).toEqual(255);
    expect(toAlphaChannel('50%')).toEqual(127.5);
    expect(toAlphaChannel('50.25%')).toEqual(128.14);
    expect(toAlphaChannel('50.25%', 0)).toEqual(128);
    expect(toAlphaChannel('50.25%', 1)).toEqual(128.1);
  });

  it('should round alpha percent to valid 8bit channel value 0 to 255 (0x00 - 0xff)', () => {
    expect(toAlphaChannel('0%')).toEqual(0);
    expect(toAlphaChannel('100%')).toEqual(255);
    expect(toAlphaChannel('50%')).toEqual(127.5);
    expect(toAlphaChannel('50.25%')).toEqual(128.14);
  });

  it('should convert alpha value to valid 8bit channel value 0 to 255 (0x00 - 0xff)', () => {
    expect(toAlphaChannel(1)).toEqual(255);
    expect(toAlphaChannel(0)).toEqual(0);
    expect(toAlphaChannel(0.5)).toEqual(127.5);
    expect(toAlphaChannel(.256, 2)).toEqual(65.28);
    expect(toAlphaChannel('0.8')).toEqual(204);
  });
});

describe('toFloat rounds to decimals and returns a number', () => {
  it('should round to X decimals and be a number', () => {
    expect(toFloat(10.156, 2)).toEqual(10.16);
    expect(toFloat(10, 0)).toEqual(10);
    expect(toFloat(10.14, 1)).toEqual(10.1);
  });
});

describe('isPercent validates if the value is a valid percent', () => {
  it('should return `true` if value ranges from `0` to `100`(+ decimals) followed by `%` suffix', () => {
    expect(isPercent('.1%')).toBeTruthy();
    expect(isPercent('10.1%')).toBeTruthy();
    expect(isPercent('0%')).toBeTruthy();
    expect(isPercent('100%')).toBeTruthy();
    expect(isPercent('100')).toBeFalsy();
    expect(isPercent('100.1%')).toBeFalsy();
  });
});

describe('isValidChannel validates if valid 8bit channel value', () => {
  it('should return true if value ranges from 0 to 255', () => {
    expect(isValidChannel(0)).toBeTruthy();
    expect(isValidChannel(255)).toBeTruthy();
    expect(isValidChannel(260)).toBeFalsy();
    expect(isValidChannel(-255)).toBeFalsy();
  });
});
