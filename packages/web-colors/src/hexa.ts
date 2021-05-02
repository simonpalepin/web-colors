import { RGBA } from "./types";

interface HexaRegExpList {
  hex3: RegExp;
  hex: RegExp;
  hexa4: RegExp;
  hexa: RegExp;
}

/**
 * Test hex3 color
 * #000
 * #0ff
 */
const hex3: RegExp = /^#(?:[0-9a-fA-F]{3})$/;

/**
 * Test hexa4 color with alpha channel
 * #000f
 * #0fff
 */
const hexa4: RegExp = /^#(?:[0-9a-fA-F]{4})$/;

/**
 * Test hex color
 * #000000
 */
const hex: RegExp = /^#(?:[0-9a-fA-F]{6})$/;

/**
 * Test hexa color with alpha channel
 * #000000ff = rgba(0,0,0,1)
 */
const hexa: RegExp = /^#(?:[0-9a-fA-F]{8})$/;

export const hexaRegExp: HexaRegExpList = {
  hex3,
  hex,
  hexa4,
  hexa,
};

export const rgbaToHexaText = (value: RGBA): string => {
  return `${rgbaToHexText(value)}${numToHex(value?.A || 255)}`;
};

export const rgbaToHexText = (value: RGBA): string => {
  return `#${numToHex(value.R)}` + 
  `${numToHex(value.G)}` +
  `${numToHex(value.B)}`;
};

export const textHexaToRgba = (value: string): RGBA => {
  const rgba: RGBA = { R: 0, G: 0, B: 0 };
  const hexa: string = value.replace('#', '');
  const isLong = hexa.length >= 6;
  switch (hexa.length) {
    case 3:
    case 4:
    case 6:
    case 8:
      rgba.R = parseFloat(`0x${isLong ? `${hexa[0]}${hexa[1]}` : `${hexa[0]}${hexa[0]}`}`);
      rgba.G = parseFloat(`0x${isLong ? `${hexa[2]}${hexa[3]}` : `${hexa[1]}${hexa[1]}`}`);
      rgba.B = parseFloat(`0x${isLong ? `${hexa[4]}${hexa[5]}` : `${hexa[2]}${hexa[2]}`}`);
      if (hexa.length === 4 || hexa.length === 8) {
        rgba.A = parseFloat(`0x${isLong ? `${hexa[6]}${hexa[7]}` : `${hexa[3]}${hexa[3]}`}`);
      }
      break;

    default:
      break;
  }

  return rgba;
};

export const isHexaText = (value: string): boolean => {
  return hexa4.test(value) || hexa.test(value);
}

export const isHexText = (value: string): boolean => {
  return hex3.test(value) || hex.test(value);
}

const numToHex = (value: number): string => {
  const hex = Number(value).toString(16);
  return hex.length === 2 ? hex : `0${hex}`;
}
