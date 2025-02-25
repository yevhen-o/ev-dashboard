import { ValidationSegments } from "src/types/ValidationSegments";
import { useMinMaxFromSegments } from "./useMinMaxFromSegments";

export const Gauge = ({
  value = 32,
  max = 100,
  min = 0,
  segments,
}: {
  value: number;
  max?: number;
  min?: number;
  segments?: ValidationSegments;
}) => {
  const { maxValue, minValue } = useMinMaxFromSegments(min, max, segments);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress =
    ((value - minValue) / (maxValue - minValue)) * Math.PI * radius + 8;
  const circumferenceLarge = (radius + 10) * 2 * Math.PI;
  const getSegment = (segment: number) =>
    ((segment - minValue) / (maxValue - minValue)) * Math.PI * (radius + 10) +
    8;

  const color =
    segments?.find(({ range: { min, max } }) => value >= min && value <= max)
      ?.color || "#3d85c6";
  const sortedSegments = segments?.sort((a, b) =>
    a.range.max > b.range.max ? -1 : +1
  );

  return (
    <svg width="120" height="60" viewBox="0 0 120 50">
      {segments && (
        <>
          <circle
            cx="60"
            cy="50"
            r={radius + 10}
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="2"
          />
          {sortedSegments?.map((s, index) => {
            return (
              <circle
                key={index}
                cx="60"
                cy="50"
                r={radius + 10}
                fill="none"
                stroke={s.color}
                strokeWidth="2"
                strokeDasharray={circumferenceLarge}
                strokeDashoffset={circumferenceLarge - getSegment(s.range.max)}
                transform="rotate(-186 60 50)" // Rotate so it starts from left
              />
            );
          })}
        </>
      )}
      {/* Background arc */}
      <circle
        cx="60"
        cy="50"
        r={radius}
        fill="none"
        stroke="#e0e0e0"
        strokeWidth="10"
      />
      {/* Progress arc */}
      <circle
        cx="60"
        cy="50"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        transform="rotate(-186 60 50)" // Rotate so it starts from left
      />
      {/* Text value */}
      <text x="60" y="55" textAnchor="middle" fontSize="16" fill={color}>
        {value}
      </text>
    </svg>
  );
};
