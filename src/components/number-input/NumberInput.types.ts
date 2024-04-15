export interface PropTypes {
  min?: number;
  max?: number;
  value?: number;
  unit?: string;
  onChange?: (value: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}
