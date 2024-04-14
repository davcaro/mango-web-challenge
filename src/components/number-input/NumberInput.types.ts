export interface PropTypes {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}
