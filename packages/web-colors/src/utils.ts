export const toChannel = (
  value: unknown,
  decimals: number = 2
): number | undefined => {
  if (!isValidChannel(value) && !isPercent) return;
  if (isValidChannel(value)) return toFloat(value as number, decimals);
  return toFloat((100 / 255) * toFloat((value as string).replace('%', ''), decimals), decimals);
};

export const toFloat = (value: number | string, decimals: number = 2): number => {
  return parseFloat((Number(value)).toFixed(decimals));
}

export const toAlphaChannel = (value: unknown, decimals: number = 2): number | undefined => {
  if (undefined === value) return;
  if (isPercent(value)) return toChannel(value);
  if (isValidChannel(Number(value) * 255)) return toFloat(Number(value) * 255, decimals);
  return;
}

export const isValidChannel = (value: unknown): boolean => {
  return (`${value}`.length > 0 && !isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 255);
}

export const isPercent = (value: unknown): boolean => {
  return typeof value === 'string' && value.indexOf('%') > -1;
}
