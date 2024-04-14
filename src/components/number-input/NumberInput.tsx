import { ChangeEvent, FC } from 'react';
import { PropTypes } from './NumberInput.types';
import styles from './NumberInput.module.scss';

export const NumberInput: FC<PropTypes> = ({ onChange, ...props }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);
    onChange?.(value);
  };

  return <input className={styles.input} type='number' onChange={handleChange} {...props} />;
};
