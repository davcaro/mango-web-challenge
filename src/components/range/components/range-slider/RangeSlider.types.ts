import { HTMLAttributes } from 'react';

export interface PropTypes extends HTMLAttributes<HTMLDivElement> {
  isSelectedSegment?: boolean;
  position?: number;
  width?: number;
}
