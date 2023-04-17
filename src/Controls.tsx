import React from 'react';
import styled from 'styled-components';

declare global {
  type Settings = {
    bodyStyle: 'squareback' | 'notch' | 'fastback';
    paintColour: 'paint';
  };
}

const bodyStyles: Settings['bodyStyle'][] = ['squareback', 'notch', 'fastback'];
const paintColours: Settings['paintColour'][] = ['paint'];

const Controls: React.FC<{ settings: Settings; handleSettings: Function }> = ({
  settings,
  handleSettings
}) => {
  return (
    <StyledControls>
      <fieldset>
        <div className="option">
          <input
            type="radio"
            name="body-style"
            id="squareback"
            checked={settings.bodyStyle === 'squareback'}
            onChange={(e) => handleSettings(e.target.id)}
          />
          <label htmlFor="squareback">Squareback</label>
        </div>
        <div className="option">
          <input
            type="radio"
            name="body-style"
            id="fastback"
            checked={settings.bodyStyle === 'fastback'}
            onChange={(e) => handleSettings(e.target.id)}
          />
          <label htmlFor="fastback">Fastback</label>
        </div>
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
