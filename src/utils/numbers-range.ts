export const round = (value: number): number => Math.round(value * 100) / 100;

export const getValueWithinRange = (value: number, min?: number, max?: number): number => {
  if (typeof min === 'number' && value < min) return min;
  if (typeof max === 'number' && value > max) return max;
  return value;
};

export const getPercentageWithinRange = (value: number, min: number, max: number): number => {
  const range = max - min;
  const diff = value - min;
  return (diff / range) * 100;
};
