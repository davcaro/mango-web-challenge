import { RefObject, useCallback, useEffect, useState } from 'react';
import { getValueWithinRange } from '@/utils/numbers-range';
import { BulletType } from '@/components/range/Range.types';

interface PropTypes {
  sliderRef: RefObject<HTMLDivElement>;
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onMinValueChange: (value: number) => void;
  onMaxValueChange: (value: number) => void;
}

export const useRangeSlider = ({
  sliderRef,
  min,
  max,
  minValue,
  maxValue,
  onMinValueChange,
  onMaxValueChange,
}: PropTypes) => {
  const [draggingBullet, setDraggingBullet] = useState<BulletType | null>(null);

  const onBulletMove = useCallback(
    (bulletPosition: number) => {
      const sliderPosition = sliderRef.current?.getBoundingClientRect();
      const sliderLeft = sliderPosition?.left ?? 0;
      const sliderWidth = sliderPosition?.width ?? 0;

      const range = max - min;
      const bulletRelativePosition = bulletPosition - sliderLeft;
      const positionInScale = (bulletRelativePosition * range) / sliderWidth + min; // Cross-multiplication to scale value + min

      const positionInScaleWithinRange = getValueWithinRange(
        positionInScale,
        draggingBullet === BulletType.Min ? min : minValue,
        draggingBullet === BulletType.Max ? max : maxValue,
      );

      if (draggingBullet === BulletType.Min) {
        onMinValueChange(positionInScaleWithinRange);
      } else if (draggingBullet === BulletType.Max) {
        onMaxValueChange(positionInScaleWithinRange);
      }
    },
    [draggingBullet, max, maxValue, min, minValue, onMaxValueChange, onMinValueChange, sliderRef],
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!draggingBullet) return;
      onBulletMove(event.clientX);
    },
    [draggingBullet, onBulletMove],
  );

  const handleMouseUp = useCallback(() => {
    setDraggingBullet(null);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return {
    draggingBullet,
    onDragStart: setDraggingBullet,
  };
};
