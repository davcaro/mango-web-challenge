import { HTMLAttributes } from 'react';

export interface PropTypes extends HTMLAttributes<HTMLHRElement> {
  position: number;
  isInSelectedSegment: boolean;
}
