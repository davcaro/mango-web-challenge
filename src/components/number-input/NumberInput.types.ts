import { InputHTMLAttributes } from 'react';

export interface PropTypes extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: number;
  onChange?: (value: number) => void;
  unit?: string;
}
