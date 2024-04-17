import { InputHTMLAttributes } from 'react';

export interface PropTypes extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  min?: number;
  max?: number;
  steps?: number[];
  value?: number;
  onChange?: (value: number) => void;
}
