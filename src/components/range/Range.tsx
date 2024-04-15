import { FC, useRef } from 'react';
import { useRangeSlider } from '@/hooks';
import { getPercentagePosition, getPercentageWidth } from '@/utils/numbers-range';
import { RangeInput } from './components/range-input';
import { RangeSlider } from './components/range-slider';
import { RangeBullet } from './components/range-bullet';
import { BulletType, PropTypes } from './Range.types';
import styles from './Range.module.scss';

export const Range: FC<PropTypes> = ({ min, max, steps, values, onChange }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const sliderMin = min ?? steps?.at(0) ?? 0;
  const sliderMax = max ?? steps?.at(-1) ?? 0;

  const { draggingBullet, onDragStart } = useRangeSlider({
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
        <RangeSlider
          isSelectedSegment
          position={getPercentagePosition(values.min, sliderMin, sliderMax)}
          width={getPercentageWidth(values.min, values.max, sliderMin, sliderMax)}
        />

        <RangeBullet
          position={getPercentagePosition(values.min, sliderMin, sliderMax)}
          onMouseDown={() => onDragStart(BulletType.Min)}
          isDragging={draggingBullet === BulletType.Min}
        />
        <RangeBullet
          position={getPercentagePosition(values.max, sliderMin, sliderMax)}
          onMouseDown={() => onDragStart(BulletType.Max)}
          isDragging={draggingBullet === BulletType.Max}
        />
      </div>

      <RangeInput min={values.min} max={sliderMax} steps={steps} value={values.max} onChange={handleMaxInputChange} />
    </div>
  );
};
