import React, { useState } from 'react';

import styled from 'styled-components';

import UnitInput from './../ui/UnitInput.tsx';

const ClampableInputs: React.FC<{
  inputs: { label: string; id: string }[];
  uom: string;
  step: number;
  min: number;
  max: number;
  settings: Settings;
  handleSettings: Function;
}> = ({ inputs, uom, step, min, max, settings, handleSettings }) => {
  const [isClamped, setIsClamped] = useState<boolean>(true);

  const handleClampedInputChange = (key: string, value: number) => {
    if (!key?.includes('rideHeight')) return;

    if (isClamped) {
      // TODO: Handle numeric input (currently only increments work well)
      const otherKey = inputs.find((input) => input.id !== key)?.id;
      const otherValue =
        settings[otherKey] + step * (value > settings[key] ? 1 : -1);
      handleSettings(otherKey, otherValue);
    }

    handleSettings(key, value);
  };

  return (
    <StyledClampableInput>
      <div className="container-inputs">
        {inputs?.map((input) => (
          <div key={`clampable-input--${input.id}`} className="input">
            <label>{input.label}</label>
            <UnitInput
              id={input.id}
              uom={uom}
              step={step}
              min={min}
              max={max}
              value={settings[input.id]}
              handleChange={handleClampedInputChange}
            />
          </div>
        ))}
        <div className="input"></div>
        <div className="input"></div>
      </div>
      <div className="container-clamp">
        <button
          title={`Adjust values ${!isClamped ? 'together' : 'independently'}`}
          onClick={() => setIsClamped(!isClamped)}
        >
          {isClamped ? '🔗' : '⛓️‍💥'}
        </button>
      </div>
    </StyledClampableInput>
  );
};

const StyledClampableInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  width: 100%;

  div.container- {
    &inputs {
      display: flex;
      flex-direction: column;
      width: min-content;
      white-space: nowrap;

      div.input {
        display: flex;
        flex-direction: column;
      }
    }
    &clamp {
      display: flex;
      justify-content: center;
      flex-grow: 1;

      button {
        position: relative;
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        cursor: pointer;
      }
    }
  }
`;

export default ClampableInputs;
