import { FC } from 'react';
import styles from './Error.module.scss';
import Image from 'next/image';

export const Error: FC = () => (
  <div className={styles.container}>
    <Image src='/error.svg' alt='Error icon' width={48} height={48} />
    <p>An error has occurred</p>
  </div>
);
