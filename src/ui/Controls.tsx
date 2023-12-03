import React from 'react';
import styled from 'styled-components';

import SettingGroup from './SettingGroup.tsx';
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
    rideHeight: number;
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
      <SettingGroup title="Body Style">
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
      </SettingGroup>
      <SettingGroup title="Paint Colour">
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
      </SettingGroup>
      <SettingGroup title="Wheels">
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
      </SettingGroup>
      <SettingGroup title="Ride Height">
        <div className="option">
          <input type="radio" name="ride-height-units" id="inches" />
          <label htmlFor="inches">Inches</label>
        </div>
        <div className="option">
          <input type="radio" name="ride-height-units" id="mm" />
          <label htmlFor="mm">Millimetres</label>
        </div>
        <input
          className="option"
          type="number"
          step="5"
          min="-175"
          max="175"
          value={settings.rideHeight}
          onChange={(e) => handleSettings('rideHeight', e.target.value)}
        />
      </SettingGroup>
    </StyledControls>
  );
};

const StyledControls = styled.div`
  position: absolute;
  top: 0.3rem;
  left: 0.3rem;
  z-index: 100;
`;

export default Controls;
