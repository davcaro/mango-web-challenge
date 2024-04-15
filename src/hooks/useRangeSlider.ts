import { RefObject, useCallback, useEffect, useState } from 'react';
import { BasicRange } from '@/types/Range';
import { getNearestStep, getValueWithinRange, round } from '@/utils/numbers-range';
import { BulletType } from '@/components/range/Range.types';

interface PropTypes {
  sliderRef: RefObject<HTMLDivElement>;
  min: number;
  max: number;
  steps?: number[];
  values: BasicRange;
  onChange: (values: BasicRange) => void;
}

export const useRangeSlider = ({ sliderRef, min, max, steps, values, onChange }: PropTypes) => {
  const [draggingBullet, setDraggingBullet] = useState<BulletType | null>(null);

  const onBulletMove = useCallback(
    (bulletPosition: number) => {
      const sliderPosition = sliderRef.current?.getBoundingClientRect();
      const sliderLeft = sliderPosition?.left ?? 0;
      const sliderWidth = sliderPosition?.width ?? 0;

      const range = max - min;
      const bulletRelativePosition = bulletPosition - sliderLeft;
      const positionInScale = (bulletRelativePosition * range) / sliderWidth + min; // Cross-multiplication to scale value + min
      const finalPosition = steps ? getNearestStep(positionInScale, steps) : Math.round(positionInScale);

      const positionInScaleWithinRange = getValueWithinRange(
        finalPosition,
        draggingBullet === BulletType.Min ? min : values.min,
        draggingBullet === BulletType.Max ? max : values.max,
      );

      onChange({
        ...values,
        [draggingBullet === BulletType.Min ? 'min' : 'max']: positionInScaleWithinRange,
      });
    },
    [draggingBullet, max, min, onChange, sliderRef, steps, values],
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

  useEffect(() => {
    // Set the cursor to grabbing for the whole page
    if (draggingBullet) {
      document.body.style.setProperty('cursor', 'grabbing');
    } else {
      document.body.style.removeProperty('cursor');
    }
  }, [draggingBullet]);

  return {
    draggingBullet,
    onDragStart: setDraggingBullet,
  };
};
