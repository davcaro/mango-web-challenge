import { FC } from 'react';
import { PropTypes } from './RangeBullet.types';
import styles from './RangeBullet.module.scss';

export const RangeBullet: FC<PropTypes> = ({ position, ...props }) => {
  return <div className={styles.bullet} style={{ left: `${position}%` }} {...props} />;
};
