export interface RGBA extends Record<string, number | undefined> {
  R: number;
  G: number;
  B: number;
  A?: number;
}

export interface HSLA extends Record<string, number | undefined> {
  H: number;
  S: number;
  L: number;
  A?: number;
}

export enum ColorSpaces {
  RGBA,
  RGB,
  HSLA,
  HSL,
  HEXA,
  HEX,
};
