import {
  round,
  getValueWithinRange,
  getNearestStep,
  getNearestStepByBulletPosition,
  getPercentagePosition,
  getPercentageSliderWidth,
} from '../numbers-range';

describe('numbers range utils', () => {
  test('round', () => {
    expect(round(1.2345)).toBe(1.23);
    expect(round(1.5678)).toBe(1.57);
  });

  test('getValueWithinRange', () => {
    expect(getValueWithinRange(5, 1, 10)).toBe(5);
    expect(getValueWithinRange(0, 1, 10)).toBe(1);
    expect(getValueWithinRange(15, 1, 10)).toBe(10);

    expect(getValueWithinRange(5)).toBe(5);
    expect(getValueWithinRange(0, 1)).toBe(1);
  });

  test('getNearestStep', () => {
    expect(getNearestStep(-5, [10, 20, 30])).toBe(10);
    expect(getNearestStep(13, [10, 20, 30])).toBe(10);
    expect(getNearestStep(22, [10, 20, 30])).toBe(20);
    expect(getNearestStep(50, [10, 20, 30])).toBe(30);
  });

  test('getNearestStepByBulletPosition', () => {
    expect(getNearestStepByBulletPosition(-5, 300, [10, 20, 30])).toBe(10);
    expect(getNearestStepByBulletPosition(100, 300, [10, 20, 30])).toBe(20);
    expect(getNearestStepByBulletPosition(200, 300, [10, 20, 30])).toBe(20);
    expect(getNearestStepByBulletPosition(500, 300, [10, 20, 30])).toBe(30);
  });

  test('getPercentagePosition', () => {
    expect(getPercentagePosition(20, 10, 30)).toBe(50);
    expect(getPercentagePosition(-50, 10, 30)).toBe(-300);
    expect(getPercentagePosition(50, 10, 30)).toBe(200);
    expect(getPercentagePosition(25, 30, 10)).toBe(25);

    expect(getPercentagePosition(10, 10, 30, [10, 20, 30])).toBe(0);
    expect(getPercentagePosition(20, 10, 30, [10, 20, 30])).toBe(50);
    expect(getPercentagePosition(30, 10, 30, [10, 20, 30])).toBe(100);
    expect(getPercentagePosition(30, 0, 0, [10, 20, 30])).toBe(100);
  });

  test('getPercentageSliderWidth', () => {
    expect(getPercentageSliderWidth(20, 80, 0, 100)).toBe(60);
    expect(getPercentageSliderWidth(80, 20, 0, 100)).toBe(-60);
    expect(getPercentageSliderWidth(20, 80, 100, 0)).toBe(-60);

    expect(getPercentageSliderWidth(20, 30, 0, 50, [10, 20, 30, 40])).toBe(33.33333333333333);
    expect(getPercentageSliderWidth(30, 20, 0, 50, [10, 20, 30, 40])).toBe(-33.33333333333333);
  });
});
