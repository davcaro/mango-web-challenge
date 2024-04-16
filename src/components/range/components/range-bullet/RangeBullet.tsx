import { FC } from 'react';
import { PropTypes } from './RangeBullet.types';
import styles from './RangeBullet.module.scss';

export const RangeBullet: FC<PropTypes> = ({ position, isDragging, ...props }) => {
  return (
    <div
      className={`${styles.bullet} ${isDragging ? styles.dragging : ''}`}
      style={{ left: `${position}%` }}
      {...props}
    />
  );
};
