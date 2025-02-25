import { useMemo } from "react";

export const useMinMaxFromSegments = (
  min: number,
  max: number,
  segments?: { range?: { min: number; max: number } }[]
) => {
  return useMemo(() => {
    if (segments) {
      const minValues = segments
        .map((s) => s.range?.min)
        .filter((v): v is number => v !== undefined);
      const maxValues = segments
        .map((s) => s.range?.max)
        .filter((v): v is number => v !== undefined);

      return {
        minValue: Math.min(...minValues),
        maxValue: Math.max(...maxValues),
      };
    } else {
      return {
        minValue: min,
        maxValue: max,
      };
    }
  }, [segments, min, max]);
};
