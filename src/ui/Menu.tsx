import React, { useState } from 'react';
import styled from 'styled-components';

import { vehicleData } from '../data/vehicleData.js';
import shareIcon from '../../src/share-2-svgrepo-com.svg';

import MenuGroup from './MenuGroup.tsx';
import UnitInput from './UnitInput.tsx';
import ClampableInputs from './ClampableInputs.tsx';
import ColorPicker from './ColorPicker.tsx';
import Tooltip from './Tooltip.tsx';

const Menu: React.FC<{
  overlayRef: any;
  settings: Settings;
  handleSettings: Function;
  handleShareUrl: Function;
}> = ({ overlayRef, settings, handleSettings, handleShareUrl }) => {
  const [uom, setUom] = useState<string>('mm');

  return (
    <StyledMenu>
      <MenuGroup title="Body style">
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
      </MenuGroup>
      <MenuGroup title="Paint color">
        <ul>
          {vehicleData?.paintColors.map((paintColor) => {
            const isChecked = settings.paintColorId === paintColor.id;
            const isCustom = paintColor.id === 'custom';

            return (
              <li className="option" key={`paint-color--${paintColor.id}`}>
                <input
                  type="radio"
                  name="paint-color"
                  id={paintColor.id}
                  checked={isChecked}
                  onChange={(e) => handleSettings('paintColorId', e.target.id)}
                />
                <label htmlFor={paintColor.id}>
                  {paintColor.name}
                  <Tooltip
                    overlayRef={overlayRef}
                    text={`${
                      !isCustom
                        ? `${paintColor.paintCode}: ${paintColor.yearMin}-${paintColor.yearMax}`
                        : settings.paintColorCustom
                    }`}
                  >
                    {!isCustom ? (
                      <StyledColorSwatch
                        color={
                          isCustom
                            ? settings.paintColorCustom
                            : paintColor.colorValue
                        }
                      />
                    ) : (
                      <ColorPicker
                        settings={settings}
                        handleSettings={handleSettings}
                      />
                    )}
                  </Tooltip>
                </label>
              </li>
            );
          })}
        </ul>
      </MenuGroup>
      <MenuGroup title="Wheels">
        {vehicleData?.wheels.map((wheel) => (
          <div className="option" key={`wheel--${wheel.id}`}>
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
      </MenuGroup>
      <MenuGroup title="Bumpers">
        Front bumper
        {vehicleData?.bumpers.map((bumper) => (
          <div className="option" key={`bumper-front--${bumper.id}`}>
            <input
              type="radio"
              name="bumper-front"
              id={bumper.id}
              checked={settings.bumperFrontId === bumper.id}
              onChange={(e) => handleSettings('bumperFrontId', e.target.id)}
            />
            <label htmlFor={bumper.id}>{bumper.name}</label>
          </div>
        ))}
        Rear bumper
        {vehicleData?.bumpers.map((bumper) => (
          <div className="option" key={`bumper-rear--${bumper.id}`}>
            <input
              type="radio"
              name="bumper-rear"
              id={bumper.id}
              checked={settings.bumperRearId === bumper.id}
              onChange={(e) => handleSettings('bumperRearId', e.target.id)}
            />
            <label htmlFor={bumper.id}>{bumper.name}</label>
          </div>
        ))}
      </MenuGroup>
      <MenuGroup title="Suspension">
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
      </MenuGroup>
      <MenuGroup title="Units">
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
      </MenuGroup>
      <button
        onClick={() => {
          handleShareUrl();
        }}
        title="Copy link to clipboard"
      >
        <img src={shareIcon} alt="share icon" />
      </button>
    </StyledMenu>
  );
};

const StyledMenu = styled.div`
  position: absolute;
  top: 0.3rem;
  left: 0.3rem;
  padding-right: 1rem;
  max-height: calc(100vh - 0.6rem);
  overflow-y: auto;
  z-index: 1;

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;

    li.option {
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
  }

  button {
    display: flex;
    padding: 0.5rem;
    margin: 0 0 0.5rem;
    background: white;
    border: none;
    border-radius: 0.5rem;
    user-select: none;
    cursor: pointer;

    img {
      max-width: 24px;
      max-height: 24px;
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

export default Menu;
