import { FC, PropsWithChildren } from 'react';
import { PropTypes } from './RangeSlider.types';
import styles from './RangeSlider.module.scss';

export const RangeSlider: FC<PropsWithChildren<PropTypes>> = ({
  isSelectedSegment,
  position,
  width,
  children,
  ...props
}) => {
  return (
    <div
      className={`${styles.container} ${isSelectedSegment ? styles.selectedSegment : ''}`}
      style={{
        left: `${position}%`,
        width: `${width}%`,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
