import { FC } from 'react';
import { NumberInput } from '@/components/number-input';
import { RangeSlider } from './components/range-slider';
import { RangeBullet } from './components/range-bullet';
import { PropTypes } from './Range.types';
import styles from './Range.module.scss';

export const Range: FC<PropTypes> = ({ min, max }) => {
  return (
    <div className={styles.container}>
      <NumberInput value={min} />

      <div className={styles.sliderWrapper}>
        <RangeSlider />
        <RangeBullet position={0} />
        <RangeBullet position={100} />
      </div>

      <NumberInput value={max} />
    </div>
  );
};
