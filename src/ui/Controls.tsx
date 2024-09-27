import React, { useState } from 'react';
import styled from 'styled-components';

import SettingGroup from './SettingGroup.tsx';
import UnitInput from './UnitInput.tsx';

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
    rideHeightFront: number;
    rideHeightRear: number;
    beamWidth: number;
  };
}

const Controls: React.FC<{ settings: Settings; handleSettings: Function }> = ({
  settings,
  handleSettings
}) => {
  const [uom, setUom] = useState<string>('mm');

  return (
    <StyledControls>
      <SettingGroup title="Body style">
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
      <SettingGroup title="Paint colour">
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
      <SettingGroup title="Ride height">
        <h5>Front</h5>
        <UnitInput
          setting="rideHeightFront"
          uom={uom}
          step={5}
          min={-175}
          max={175}
          value={settings.rideHeightFront}
          handleChange={handleSettings}
        />
        <h5>Rear</h5>
        <UnitInput
          setting="rideHeightRear"
          uom={uom}
          step={5}
          min={-175}
          max={175}
          value={settings.rideHeightRear}
          handleChange={handleSettings}
        />
      </SettingGroup>
      <SettingGroup title="Beam width">
        <UnitInput
          setting="beamWidth"
          uom={uom}
          step={25}
          min={-100}
          max={0}
          value={settings.beamWidth}
          handleChange={handleSettings}
        />
      </SettingGroup>
      <SettingGroup title="Units">
        <div className="option">
          <input
            type="radio"
            name="ride-height-units"
            id="inches"
            checked={uom === 'inches'}
            onChange={(e) => setUom(e.target.id)}
          />
          <label htmlFor="inches">Inches</label>
        </div>
        <div className="option">
          <input
            type="radio"
            name="ride-height-units"
            id="mm"
            checked={uom === 'mm'}
            onChange={(e) => setUom(e.target.id)}
          />
          <label htmlFor="mm">Millimetres</label>
        </div>
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
