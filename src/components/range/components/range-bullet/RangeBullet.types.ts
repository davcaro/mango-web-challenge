import { HTMLAttributes } from 'react';

export interface PropTypes extends HTMLAttributes<HTMLDivElement> {
  position: number;
  isDragging: boolean;
}
