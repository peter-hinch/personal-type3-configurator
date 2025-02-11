import React, { useState } from 'react';
import styled from 'styled-components';

import { vehicleData } from '../data/vehicleData';

import SettingGroup from './SettingGroup.tsx';
import UnitInput from './UnitInput.tsx';
import Tooltip from './Tooltip.tsx';
import ClampableInputs from './ClampableInputs.tsx';

const Controls: React.FC<{ settings: Settings; handleSettings: Function }> = ({
  settings,
  handleSettings
}) => {
  const [uom, setUom] = useState<string>('mm');

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
      <SettingGroup title="Paint color">
        {vehicleData?.paintColors.map((paintColor) => (
          <div className="option" key={`paint-color--${paintColor.id}`}>
            <input
              type="radio"
              name="paint-color"
              id={paintColor.id}
              checked={settings.paintColorId === paintColor.id}
              onChange={(e) => handleSettings('paintColorId', e.target.id)}
            />
            <label htmlFor={paintColor.id}>
              {paintColor.name}
              <Tooltip
                text={`${paintColor.paintCode}: ${paintColor.yearMin}-${paintColor.yearMax}`}
              >
                <StyledColorSwatch color={paintColor.hex} />
              </Tooltip>
            </label>
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
      <SettingGroup title="Suspension">
        <ClampableInputs
          inputs={[
            { label: 'Front ride height', id: 'rideHeightFront' },
            { label: 'Rear ride height', id: 'rideHeightRear' }
          ]}
          uom={uom}
          step={5}
          min={-175}
          max={175}
          settings={settings}
          handleSettings={handleSettings}
        />
        <label htmlFor="beamWidth">Beam width</label>
        <UnitInput
          id="beamWidth"
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
  padding-right: 1rem;
  max-height: calc(100vh - 0.6rem);
  overflow-y: auto;
  z-index: 100;

  div.option {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    input[type='radio'] {
      margin: 0.125rem 0;
    }

    label {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      width: 100%;
    }
  }
`;

const StyledColorSwatch = styled.span`
  display: inline-block;
  height: 18px;
  width: 18px;
  background: ${(props) => props?.color};
  content: '';
`;

export default Controls;
