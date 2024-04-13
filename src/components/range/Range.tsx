'use client';

import { FC, useRef, useState } from 'react';
import { useRangeSlider } from '@/hooks/use-range-slider';
import { getPercentageWithinRange } from '@/utils/numbers-range';
import { NumberInput } from '@/components/number-input';
import { RangeSlider } from './components/range-slider';
import { RangeBullet } from './components/range-bullet';
import { BulletType, PropTypes } from './Range.types';
import styles from './Range.module.scss';

export const Range: FC<PropTypes> = ({ min, max }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [inputMinValue, setInputMinValue] = useState<number>(min);
  const [inputMaxValue, setInputMaxValue] = useState<number>(max);
  const { onDragStart } = useRangeSlider({
    sliderRef,
    min,
    max,
    minValue: inputMinValue,
    maxValue: inputMaxValue,
    onMinValueChange: setInputMinValue,
    onMaxValueChange: setInputMaxValue,
  });

  return (
    <div className={styles.container}>
      <NumberInput min={min} max={inputMaxValue} value={inputMinValue} onChange={setInputMinValue} />

      <div ref={sliderRef} className={styles.sliderWrapper}>
        <RangeSlider />
        <RangeBullet
          position={getPercentageWithinRange(inputMinValue, min, max)}
          onMouseDown={() => onDragStart(BulletType.Min)}
        />
        <RangeBullet
          position={getPercentageWithinRange(inputMaxValue, min, max)}
          onMouseDown={() => onDragStart(BulletType.Max)}
        />
      </div>

      <NumberInput min={inputMinValue} max={max} value={inputMaxValue} onChange={setInputMaxValue} />
    </div>
  );
};
