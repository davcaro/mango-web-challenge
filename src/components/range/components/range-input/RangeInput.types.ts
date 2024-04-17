export interface PropTypes {
  min?: number;
  max?: number;
  steps?: number[];
  value?: number;
  onChange?: (value: number) => void;
}
