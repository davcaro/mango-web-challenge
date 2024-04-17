import { FC } from 'react';
import styles from './Loader.module.scss';

export const Loader: FC = () => (
  <div className={styles.container}>
    <span className={styles.loader}></span>
    <p>Loading...</p>
  </div>
);
