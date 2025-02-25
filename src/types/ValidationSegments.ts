export type ValidationSegments = {
  range: {
    min: number;
    max: number;
  };
  color?: string;
  isWarning?: boolean;
  isCritical?: boolean;
}[];
