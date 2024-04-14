'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';
import { getValueWithinRange, round } from '@/utils/numbers-range';
import { PropTypes } from './NumberInput.types';
import styles from './NumberInput.module.scss';

export const NumberInput: FC<PropTypes> = ({ min, max, value, onChange }) => {
  const [inputValue, setInputValue] = useState<number>(value ?? 0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);
    const roundedValue = round(value);

    setInputValue(value);
    onChange?.(getValueWithinRange(roundedValue, min, max));
  };

  const handleBlur = (): void => {
    const roundedValue = round(inputValue);
    setInputValue(getValueWithinRange(roundedValue, min, max));
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
