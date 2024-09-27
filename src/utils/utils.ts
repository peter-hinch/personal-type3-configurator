export const inchesToMm = (value: number) =>
  parseFloat((value * 25.4)?.toFixed(2)) || 0;

export const mmToInches = (value: number) =>
  parseFloat((value / 25.4)?.toFixed(2)) || 0;
