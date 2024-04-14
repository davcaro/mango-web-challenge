import { FC, useRef } from 'react';
import { useRangeSlider } from '@/hooks';
import { getPercentageWithinRange } from '@/utils/numbers-range';
import { NumberInput } from '@/components/number-input';
import { RangeSlider } from './components/range-slider';
import { RangeBullet } from './components/range-bullet';
import { BulletType, PropTypes } from './Range.types';
import styles from './Range.module.scss';

export const Range: FC<PropTypes> = ({ min, max, values, onChange }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const { onDragStart } = useRangeSlider({
    sliderRef,
    min,
    max,
    values,
    onChange,
  });

  const handleMinInputChange = (value: number) => {
    onChange({ ...values, min: value });
  };
  const handleMaxInputChange = (value: number) => {
    onChange({ ...values, max: value });
  };

  return (
    <div className={styles.container}>
      <NumberInput min={min} max={values.max} value={values.min} onChange={handleMinInputChange} />

      <div ref={sliderRef} className={styles.sliderWrapper}>
        <RangeSlider />
        <RangeBullet
          position={getPercentageWithinRange(values.min, min, max)}
          onMouseDown={() => onDragStart(BulletType.Min)}
        />
        <RangeBullet
          position={getPercentageWithinRange(values.max, min, max)}
          onMouseDown={() => onDragStart(BulletType.Max)}
        />
      </div>

      <NumberInput min={values.min} max={max} value={values.max} onChange={handleMaxInputChange} />
    </div>
  );
};
