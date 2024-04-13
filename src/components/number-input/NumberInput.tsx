'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';
import { getValueWithinRange } from '@/utils/numbers-range';
import { PropTypes } from './NumberInput.types';
import styles from './NumberInput.module.scss';

export const NumberInput: FC<PropTypes> = ({ min, max, value, onChange }) => {
  const [inputValue, setInputValue] = useState<number>(value ?? 0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);
    setInputValue(value);
    onChange?.(getValueWithinRange(value, min, max));
  };

  const handleBlur = (): void => {
    setInputValue(getValueWithinRange(inputValue, min, max));
  };

  useEffect(() => {
    setInputValue(value ?? 0);
  }, [value]);

  return (
    <input
      className={styles.input}
      type='number'
      min={min}
      max={max}
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};
