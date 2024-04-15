export const round = (value: number): number => Math.round(value * 100) / 100;

export const getValueWithinRange = (value: number, min?: number, max?: number): number => {
  if (typeof min === 'number' && value < min) return min;
  if (typeof max === 'number' && value > max) return max;
  return value;
};

export const getNearestStep = (value: number, steps: number[]): number => {
  let closest = steps[0];

  for (let i = 1; i < steps.length; i++) {
    const currentDiff = Math.abs(steps[i] - value);
    const closestDiff = Math.abs(closest - value);

    if (currentDiff < closestDiff) {
      closest = steps[i];
    }
  }

  return closest;
};

export const getNearestStepByBulletPosition = (bulletPosition: number, sliderWidth: number, steps: number[]) => {
  const stepWidth = sliderWidth / (steps.length - 1);
  const stepsPositions = steps.map((step, index) => index * stepWidth);
  const nearestStep = getNearestStep(bulletPosition, stepsPositions);
  return steps[stepsPositions.indexOf(nearestStep)];
};

export const getPercentagePosition = (value: number, min: number, max: number, steps?: number[]): number => {
  if (steps) {
    const index = steps.indexOf(value);
    return (index / (steps.length - 1)) * 100;
  } else {
    const range = max - min;
    const diff = value - min;
    return (diff / range) * 100;
  }
};

export const getPercentageSliderWidth = (
  minValue: number,
  maxValue: number,
  sliderMin: number,
  sliderMax: number,
  steps?: number[],
): number => {
  if (steps) {
    const minIndex = steps.indexOf(minValue);
    const maxIndex = steps.indexOf(maxValue);
    const stepsDiff = maxIndex - minIndex;
    return (stepsDiff / (steps.length - 1)) * 100;
  } else {
    const range = sliderMax - sliderMin;
    const diff = maxValue - minValue;
    return (diff / range) * 100;
  }
};
