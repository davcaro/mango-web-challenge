import { BasicRange } from '@/types/Range';

export interface PropTypes {
  min: number;
  max: number;
  values: BasicRange;
  onChange: (values: BasicRange) => void;
}

export enum BulletType {
  Min = 'min',
  Max = 'max',
}
