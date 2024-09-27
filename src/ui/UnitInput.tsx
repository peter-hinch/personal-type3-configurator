import React from 'react';

import { mmToInches, inchesToMm } from '../utils/utils.ts';

const UnitInput: React.FC<{
  setting: string;
  uom: string;
  step: number;
  min: number;
  max: number;
  value: number;
  handleChange: Function;
}> = ({ setting, uom, step, min, max, value, handleChange }) => {
  // TODO: Convert mm to inches while rounding to a convenient fraction
  const stepInches = mmToInches(step);
  const minInches = mmToInches(min);
  const maxInches = mmToInches(max);

  return (
    <span>
      {uom === 'mm' ? (
        <>
          {/* Input for mm */}
          <input
            className="option"
            type="number"
            step={step}
            min={min}
            max={max}
            value={value}
            onChange={(e) => handleChange(setting, e.target.value)}
          />
        </>
      ) : (
        <>
          {/* Input for inches */}
          <input
            className="option"
            type="number"
            step={stepInches}
            min={minInches}
            max={maxInches}
            value={mmToInches(value)}
            onChange={(e) =>
              handleChange(setting, inchesToMm(parseFloat(e.target.value)))
            }
          />
        </>
      )}
      {` ${uom}`}
    </span>
  );
};

export default UnitInput;
