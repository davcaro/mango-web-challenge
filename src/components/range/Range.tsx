import { FC, useRef } from 'react';
import { useRangeSlider } from '@/hooks';
import { getPercentagePosition, getPercentageSliderWidth } from '@/utils/numbers-range';
import { RangeInput } from './components/range-input';
import { RangeSlider } from './components/range-slider';
import { RangeStepMark } from './components/range-step-mark';
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
      <RangeInput
        min={sliderMin}
        max={values.max}
        steps={steps}
        value={values.min}
        onChange={handleMinInputChange}
        aria-label='Minimum input'
      />

      <div ref={sliderRef} className={styles.sliderWrapper}>
        <RangeSlider data-testid='range-slider' />
        <RangeSlider
          isSelectedSegment
          position={getPercentagePosition(values.min, sliderMin, sliderMax, steps)}
          width={getPercentageSliderWidth(values.min, values.max, sliderMin, sliderMax, steps)}
          data-testid='selected-range-slider'
        />

        {steps?.map((step) => (
          <RangeStepMark
            key={step}
            position={getPercentagePosition(step, sliderMin, sliderMax, steps)}
            isInSelectedSegment={step >= values.min && step <= values.max}
            aria-label={`Step ${step}€`}
          />
        ))}

        <RangeBullet
          position={getPercentagePosition(values.min, sliderMin, sliderMax, steps)}
          onMouseDown={() => onDragStart(BulletType.Min)}
          isDragging={draggingBullet === BulletType.Min}
          role='slider'
          aria-label='Minimum slider'
          aria-valuenow={values.min}
          aria-valuemin={sliderMin}
          aria-valuemax={sliderMax}
        />
        <RangeBullet
          position={getPercentagePosition(values.max, sliderMin, sliderMax, steps)}
          onMouseDown={() => onDragStart(BulletType.Max)}
          isDragging={draggingBullet === BulletType.Max}
          role='slider'
          aria-label='Maximum slider'
          aria-valuenow={values.max}
          aria-valuemin={sliderMin}
          aria-valuemax={sliderMax}
        />
      </div>

      <RangeInput
        min={values.min}
        max={sliderMax}
        steps={steps}
        value={values.max}
        onChange={handleMaxInputChange}
        aria-label='Maximum input'
      />
    </div>
  );
};
