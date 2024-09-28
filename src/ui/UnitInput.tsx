import React from 'react';

import { mmToInches, inchesToMm } from '../utils/utils.ts';

const UnitInput: React.FC<{
  id: string;
  uom: string;
  step: number;
  min: number;
  max: number;
  value: number;
  handleChange: Function;
}> = ({ id, uom, step, min, max, value, handleChange }) => {
  // TODO: Convert mm to inches while rounding to a convenient fraction
  const isMetric = uom === 'mm';

  return (
    <span>
      <input
        id={id}
        className="option"
        type="number"
        step={isMetric ? step : mmToInches(step)}
        min={isMetric ? min : mmToInches(min)}
        max={isMetric ? max : mmToInches(max)}
        value={isMetric ? value : mmToInches(value)}
        onChange={(e) =>
          handleChange(
            id,
            isMetric
              ? e.target.valueAsNumber
              : inchesToMm(e.target.valueAsNumber)
          )
        }
      />
      {` ${uom}`}
    </span>
  );
};

export default UnitInput;
