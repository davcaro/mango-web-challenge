import { FC, useRef } from 'react';
import { useRangeSlider } from '@/hooks';
import { getPercentageWithinRange } from '@/utils/numbers-range';
import { RangeInput } from './components/range-input';
import { RangeSlider } from './components/range-slider';
import { RangeBullet } from './components/range-bullet';
import { BulletType, PropTypes } from './Range.types';
import styles from './Range.module.scss';

export const Range: FC<PropTypes> = ({ min, max, steps, values, onChange }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const sliderMin = min ?? steps?.at(0) ?? 0;
  const sliderMax = max ?? steps?.at(-1) ?? 0;

  const { onDragStart } = useRangeSlider({
    sliderRef,
    min: sliderMin,
    max: sliderMax,
    steps,
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
      <RangeInput min={sliderMin} max={values.max} steps={steps} value={values.min} onChange={handleMinInputChange} />

      <div ref={sliderRef} className={styles.sliderWrapper}>
        <RangeSlider />
        <RangeBullet
          position={getPercentageWithinRange(values.min, sliderMin, sliderMax)}
          onMouseDown={() => onDragStart(BulletType.Min)}
        />
        <RangeBullet
          position={getPercentageWithinRange(values.max, sliderMin, sliderMax)}
          onMouseDown={() => onDragStart(BulletType.Max)}
        />
      </div>

      <RangeInput min={values.min} max={sliderMax} steps={steps} value={values.max} onChange={handleMaxInputChange} />
    </div>
  );
};
