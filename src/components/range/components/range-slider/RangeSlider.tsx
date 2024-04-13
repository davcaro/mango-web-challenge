import { FC, PropsWithChildren } from 'react';
import styles from './RangeSlider.module.scss';

export const RangeSlider: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
