import { FC } from 'react';
import { PropTypes } from './NumberInput.types';
import styles from './NumberInput.module.scss';

export const NumberInput: FC<PropTypes> = ({ value }) => {
  return <input className={styles.input} type='number' value={value} />;
};
