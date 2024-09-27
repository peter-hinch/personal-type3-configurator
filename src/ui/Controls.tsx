import React, { useState } from 'react';
import styled from 'styled-components';

import { vehicleData } from '../data/vehicleData';

import SettingGroup from './SettingGroup.tsx';
import UnitInput from './UnitInput.tsx';

const Controls: React.FC<{ settings: Settings; handleSettings: Function }> = ({
  settings,
  handleSettings
}) => {
  const [uom, setUom] = useState<string>('mm');
  const [isRideHeightClamped, setIsRideHeightClamped] = useState<boolean>(true);

  const rideHeightStep = 5;

  const handleRideHeight = (setting: string, value: number) => {
    if (!setting?.includes('rideHeight')) return;

    if (isRideHeightClamped) {
      const otherKey = `rideHeight${
        setting === 'rideHeightFront' ? 'Rear' : 'Front'
      }`;
      const otherValue =
        settings[otherKey] +
        rideHeightStep * (value > settings[setting] ? 1 : -1);
      handleSettings(otherKey, otherValue);
    }

    handleSettings(setting, value);
  };

  return (
    <StyledControls>
      <SettingGroup title="Body style">
        {vehicleData?.bodyStyles.map((bodyStyle) => (
          <div className="option" key={`body-style--${bodyStyle.id}`}>
            <input
              type="radio"
              name="body-style"
              id={bodyStyle.id}
              checked={settings.bodyStyleId === bodyStyle.id}
              onChange={(e) => handleSettings('bodyStyleId', e.target.id)}
            />
            <label htmlFor={bodyStyle.id}>{bodyStyle.name}</label>
          </div>
        ))}
      </SettingGroup>
      <SettingGroup title="Paint colour">
        {vehicleData?.paintColours.map((paintColour) => (
          <div className="option" key={`paint-colour--${paintColour.id}`}>
            <input
              type="radio"
              name="paint-colour"
              id={paintColour.id}
              checked={settings.paintColourId === paintColour.id}
              onChange={(e) => handleSettings('paintColourId', e.target.id)}
            />
            <label htmlFor={paintColour.id}>{paintColour.name}</label>
          </div>
        ))}
      </SettingGroup>
      <SettingGroup title="Wheels">
        {vehicleData?.wheels.map((wheel) => (
          <div className="option" key={`wheel--${wheel}`}>
            <input
              type="radio"
              name="wheel"
              id={wheel.id}
              checked={settings.wheelId === wheel.id}
              onChange={(e) => handleSettings('wheelId', e.target.id)}
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
          step={rideHeightStep}
          min={-175}
          max={175}
          value={settings.rideHeightFront}
          handleChange={handleRideHeight}
        />
        <h5>Rear</h5>
        <UnitInput
          setting="rideHeightRear"
          uom={uom}
          step={rideHeightStep}
          min={-175}
          max={175}
          value={settings.rideHeightRear}
          handleChange={handleRideHeight}
        />
        <h5>Clamp Front / Rear</h5>
        <input
          type="checkbox"
          checked={isRideHeightClamped}
          onChange={() => setIsRideHeightClamped(!isRideHeightClamped)}
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
