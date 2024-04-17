import { ChangeEvent, FC } from 'react';
import { PropTypes } from './NumberInput.types';
import styles from './NumberInput.module.scss';

export const NumberInput: FC<PropTypes> = ({ unit, value, onChange, readOnly, ...props }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);
    onChange?.(value);
  };

  return (
    <div className={styles.container}>
      <input
        className={`${styles.input} ${readOnly ? styles.readOnly : ''}`}
        type='number'
        role='spinbutton'
        value={value?.toString()}
        onChange={handleChange}
        readOnly={readOnly}
        style={{ width: value?.toString().length ? `${value?.toString().length + 2}ch` : 'auto' }}
        {...props}
      />
      {unit && <span>{unit}</span>}
    </div>
  );
};
