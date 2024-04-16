import { FC } from 'react';
import { PropTypes } from './RangeStepMark.types';
import styles from './RangeStepMark.module.scss';

export const RangeStepMark: FC<PropTypes> = ({ position, isInSelectedSegment, ...props }) => {
  return (
    <hr
      className={`${styles.line} ${isInSelectedSegment ? styles.selectedSegment : ''}`}
      style={{ left: `${position}%` }}
      {...props}
    />
  );
};
