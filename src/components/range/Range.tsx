'use client';

import { FC, useState } from 'react';
import { NumberInput } from '@/components/number-input';
import { RangeSlider } from './components/range-slider';
import { RangeBullet } from './components/range-bullet';
import { getPercentageWithinRange } from '@/utils/numbers';
import { PropTypes } from './Range.types';
import styles from './Range.module.scss';

export const Range: FC<PropTypes> = ({ min, max }) => {
  const [inputMinValue, setInputMinValue] = useState<number>(min);
  const [inputMaxValue, setInputMaxValue] = useState<number>(max);

  return (
    <div className={styles.container}>
      <NumberInput min={min} max={inputMaxValue} value={inputMinValue} onChange={setInputMinValue} />

      <div className={styles.sliderWrapper}>
        <RangeSlider />
        <RangeBullet position={getPercentageWithinRange(inputMinValue, min, max)} />
        <RangeBullet position={getPercentageWithinRange(inputMaxValue, min, max)} />
      </div>

      <NumberInput min={inputMinValue} max={max} value={inputMaxValue} onChange={setInputMaxValue} />
    </div>
  );
};
