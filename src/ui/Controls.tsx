import React from 'react';
import styled from 'styled-components';

import { vehicleData } from '../data/vehicleData';

declare global {
  type Settings = {
    bodyStyle: { id: string; name: string };
    paintColour: {
      id: string;
      name: string;
      hex: string;
      yearMin: number;
      yearMax: number;
      paintCode?: string;
    };
    wheel: { id: string; name: string };
  };
}

// This method converts setting labels from the naming_convention used within
// GLTF models to Title Case.
const convertCase = (input: string) => {
  const words: string[] = input.split('_');
  const converted = words.map((word, index) => {
    const initial = word.charAt(0).toUpperCase();
    return `
      ${initial}${word.substring(1)}${index === word.length ? '' : ' '}
    `;
  });
  return converted;
};

const Controls: React.FC<{ settings: Settings; handleSettings: Function }> = ({
  settings,
  handleSettings
}) => {
  return (
    <StyledControls>
      <fieldset>
        <h4>Body Style</h4>
        {vehicleData?.bodyStyles.map((bodyStyle: Settings['bodyStyle']) => (
          <div className="option" key={`body-style--${bodyStyle.id}`}>
            <input
              type="radio"
              name="body-style"
              id={bodyStyle.id}
              checked={settings.bodyStyle.id === bodyStyle.id}
              onChange={(e) => handleSettings('bodyStyle', e.target.id)}
            />
            <label htmlFor={bodyStyle.id}>{bodyStyle.name}</label>
          </div>
        ))}
      </fieldset>
      <fieldset>
        <h4>Paint Colour</h4>
        {vehicleData?.paintColours.map(
          (paintColour: Settings['paintColour']) => (
            <div className="option" key={`paint-colour--${paintColour.id}`}>
              <input
                type="radio"
                name="paint-colour"
                id={paintColour.id}
                checked={settings.paintColour.id === paintColour.id}
                onChange={(e) => handleSettings('paintColour', e.target.id)}
              />
              <label htmlFor={paintColour.id}>{paintColour.name}</label>
            </div>
          )
        )}
      </fieldset>
      <fieldset>
        <h4>Wheels</h4>
        {vehicleData?.wheels.map((wheel: Settings['wheel']) => (
          <div className="option" key={`wheel--${wheel}`}>
            <input
              type="radio"
              name="wheel"
              id={wheel.id}
              checked={settings.wheel.id === wheel.id}
              onChange={(e) => handleSettings('wheel', e.target.id)}
            />
            <label htmlFor={wheel.id}>{wheel.name}</label>
          </div>
        ))}
      </fieldset>
    </StyledControls>
  );
};

const StyledControls = styled.div`
  position: absolute;
  top: 0.3rem;
  left: 0.3rem;
  z-index: 100;

  fieldset {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
    margin: 0 0 0.5rem;
    background: white;
    border: none;
    border-radius: 0.5rem;

    .option {
      margin-bottom: 0.3rem;

      input {
        margin-left: 0;
      }
    }
  }
`;

export default Controls;
