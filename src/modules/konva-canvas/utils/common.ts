export const toIntegerNumber = (number?: number) => {
  if (!number) return number;
  return Math.round(number);
};
