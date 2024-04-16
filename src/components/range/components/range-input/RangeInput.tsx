import { FC, useEffect, useState } from 'react';
import { getNearestStep, getValueWithinRange, round } from '@/utils/numbers-range';
import { PropTypes } from './RangeInput.types';
import { NumberInput } from '@/components/number-input';

export const RangeInput: FC<PropTypes> = ({ min, max, steps, value, onChange, ...props }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number>(value ?? 0);

  const calculateValue = (newValue: number): number => {
    const roundedValue = steps ? getNearestStep(newValue, steps) : round(newValue);
    return getValueWithinRange(roundedValue, min, max);
  };

  const handleChange = (newValue: number): void => {
    setInputValue(newValue);
    onChange(calculateValue(newValue));
  };

  const handleFocus = (): void => {
    setIsFocused(true);
  };

  const handleBlur = (): void => {
    setIsFocused(false);
    setInputValue(calculateValue(inputValue));
  };

  useEffect(() => {
    if (!isFocused) {
      setInputValue(value ?? 0);
    }
  }, [isFocused, value]);

  return (
    <NumberInput
      min={min}
      max={max}
      value={inputValue}
      unit='€'
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  );
};
