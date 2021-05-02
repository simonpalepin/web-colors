import { RGBA } from './types';
import { toChannel, toAlphaChannel, isValidChannel } from './utils';

interface RgbaRegExpList {
  numberRGB: RegExp;
  numberRGBA: RegExp;
  numberRGBACss4: RegExp;
  percentRGB: RegExp;
  percentRGBA: RegExp;
  percentRGBACss4: RegExp;
}

/**
 * Test number rgb syntax
 * rgb(10, 5, 28.5)
 * rgb(10, 5, 28.5)
 * Capture groups [value, R, G, B]
 */
const numberRGB: RegExp = /^rgb\(((?:255\.[0]+|255|(?:25[0-4]|[2][0-4][0-9]|[1][0-9][0-9]|[1-9][0-9]|[0-9])(?:\.\d+)?|\.\d+))\s*,\s*((?:255\.[0]+|255|(?:25[0-4]|[2][0-4][0-9]|[1][0-9][0-9]|[1-9][0-9]|[0-9])(?:\.\d+)?|\.\d+))\s*,\s*((?:255\.[0]+|255|(?:25[0-4]|[2][0-4][0-9]|[1][0-9][0-9]|[1-9][0-9]|[0-9])(?:\.\d+)?|\.\d+))\)/;

/**
 * Test number rgba syntax
 * rgba(10, 5, 28.5, .1)
 * rgba(10, 5, 28.5, 10%)
 * Capture groups [value, R, G, B, A]
 */
const numberRGBA: RegExp = /^rgba\(((?:255\.[0]+|255|(?:25[0-4]|[2][0-4][0-9]|[1][0-9][0-9]|[1-9][0-9]|[0-9])(?:\.\d+)?|\.\d+))\s*,\s*((?:255\.[0]+|255|(?:25[0-4]|[2][0-4][0-9]|[1][0-9][0-9]|[1-9][0-9]|[0-9])(?:\.\d+)?|\.\d+))\s*,\s*((?:255\.[0]+|255|(?:25[0-4]|[2][0-4][0-9]|[1][0-9][0-9]|[1-9][0-9]|[0-9])(?:\.\d+)?|\.\d+))(?:\s*,\s*((?:100\.[0]+|100|(?:[0-9]|[1-9][0-9])(?:\.\d+)?|\.\d+)%|[0]?\.\d+|1\.[0]+|1|0))\)/;

/**
 * Test css4 number rgba syntax
 * rgba(250 5 28.5 /.1)
 * rgba(250 5 28.5 /10%)
 * Capture groups [value, R, G, B, A?]
 */
const numberRGBACss4: RegExp = /^rgba\(((?:255\.[0]+|255|(?:25[0-4]|[2][0-4][0-9]|[1][0-9][0-9]|[1-9][0-9]|[0-9])(?:\.\d+)?|\.\d+))\s*((?:255\.[0]+|255|(?:25[0-4]|[2][0-4][0-9]|[1][0-9][0-9]|[1-9][0-9]|[0-9])(?:\.\d+)?|\.\d+))\s*((?:255\.[0]+|255|(?:25[0-4]|[2][0-4][0-9]|[1][0-9][0-9]|[1-9][0-9]|[0-9])(?:\.\d+)?|\.\d+))(?:\s*\/\s*((?:100\.[0]+|100|(?:[0-9]|[1-9][0-9])(?:\.\d+)?|\.\d+)%|[0]?\.\d+|1\.[0]+|1|0))\)/;

/**
 * Test percent rgb syntax
 * rgb(10%, 5%, 28.5%)
 * rgb(10%, 5%, 28.5%)
 * Capture groups [value, R, G, B]
 */
 const percentRGB: RegExp = /^rgb\(((?:100\.[0]+|100|(?:[0-9]|[1-9][0-9])(?:\.\d+)?|\.\d+)%)\s*,\s*((?:100\.[0]+|100|(?:[0-9]|[1-9][0-9])(?:\.\d+)?|\.\d+)%)\s*,\s*((?:100\.[0]+|100|(?:[0-9]|[1-9][0-9])(?:\.\d+)?|\.\d+)%)\)/;

/**
 * Test percent rgba syntax
 * rgb(10%, 5%, 28.5%, .1)
 * rgb(10%, 5%, 28.5%, 10%)
 * Capture groups [value, R, G, B, A]
 */
const percentRGBA: RegExp = /^rgba\(((?:100\.[0]+|100|(?:[0-9]|[1-9][0-9])(?:\.\d+)?|\.\d+)%)\s*,\s*((?:100\.[0]+|100|(?:[0-9]|[1-9][0-9])(?:\.\d+)?|\.\d+)%)\s*,\s*((?:100\.[0]+|100|(?:[0-9]|[1-9][0-9])(?:\.\d+)?|\.\d+)%)(?:\s*,\s*((?:100\.[0]+|100|(?:[0-9]|[1-9][0-9])(?:\.\d+)?|\.\d+)%|[0]?\.\d+|1\.[0]+|1|0))\)/;

/**
 * Test css4 percent rgba syntax
 * rgba(10% 5% 28.5% /.1)
 * rgba(10% 5% 28.5% /10%)
 * Capture groups [value, R, G, B, A?]
 */
const percentRGBACss4: RegExp = /^rgba\(((?:100\.[0]+|100|(?:[0-9]|[1-9][0-9])(?:\.\d+)?|\.\d+)%)\s*((?:100\.[0]+|100|(?:[0-9]|[1-9][0-9])(?:\.\d+)?|\.\d+)%)\s*((?:100\.[0]+|100|(?:[0-9]|[1-9][0-9])(?:\.\d+)?|\.\d+)%)(?:\s*\/\s*((?:100\.[0]+|100|(?:[0-9]|[1-9][0-9])(?:\.\d+)?|\.\d+)%|[0]?\.\d+|1\.[0]+|1|0))\)/;

export const rgbaRegExp: RgbaRegExpList = {
  numberRGB,
  numberRGBA,
  numberRGBACss4,
  percentRGB,
  percentRGBA,
  percentRGBACss4,
};

export const rgbaParser = (value: unknown): string[] | undefined => {
  if (typeof value !== 'string') return;
  const regexp: RegExp[] = [
    numberRGB,
    percentRGB,
    numberRGBA,
    percentRGBA,
    numberRGBACss4,
  ];

  let matched: RegExpExecArray | null;
  for (const reg of regexp) {
    matched = reg.exec(value);
    if (matched) {
      const values = [...matched.values()];
      values.shift();
      return values;
    }
  }

  return;
};

export const textToRgba = (value: string): RGBA => {
  const rgba: string[] | undefined = rgbaParser(value);
  return {
    R: toChannel(rgba?.[0]) || 0,
    G: toChannel(rgba?.[1]) || 0,
    B: toChannel(rgba?.[2]) || 0,
    A: toAlphaChannel(rgba?.[3] || 1),
  };
};

export const rgbaToText = (rgba: RGBA, decimals: number = 2): string => {
  return `rgb${rgba.A !== undefined ? 'a' : ''}(` + 
  `${rgba.R}, ${rgba.G}, ${rgba.B}` + 
  `${rgba.A !== undefined ?
  `, ` + 
  `${((1 / 255) * rgba.A).toFixed(decimals)}` :``}` +
  `)`;
};

export const isRgbaText = (value: string): boolean => {
  const rgba: RegExp[] = [
    numberRGBA,
    percentRGBA,
    numberRGBACss4,
    percentRGBACss4,
  ];

  for (const reg of rgba) {
    if (reg.test(value)) return true;
  }

  return false;
}

export const isRgbText = (value: string): boolean => {
  const rgba: RegExp[] = [
    numberRGB,
    percentRGB,
  ];

  for (const reg of rgba) {
    if (reg.test(value)) return true;
  }

  return false;
}

export const isRgb = (value: any): boolean => {
  switch(true) {
    case !(typeof value === 'object'):
    case !(!Array.isArray(value)):
    case !(null !== value):
      return false;
  }
  return (
    isValidChannel(value?.R) &&
    isValidChannel(value?.G) &&
    isValidChannel(value?.B)
  );
}

export const isRgba = (value: any): value is RGBA => {
  return (isRgb(value) && isValidChannel(value?.A));
};
