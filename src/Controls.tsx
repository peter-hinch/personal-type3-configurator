import React from 'react';
import styled from 'styled-components';

declare global {
  type Settings = { bodyStyle: 'square' | 'notch' | 'fastback' };
}

const Controls: React.FC<{ settings: Settings; handleSettings: Function }> = ({
  settings,
  handleSettings
}) => {
  return (
    <StyledControls>
      <fieldset>
        <input
          type="radio"
          name="body-style"
          id="square"
          checked={settings.bodyStyle === 'square'}
          onChange={(e) => handleSettings(e.target.id)}
        />
        <label htmlFor="square">Squareback</label>
        <input
          type="radio"
          name="body-style"
          id="fastback"
          checked={settings.bodyStyle === 'fastback'}
          onChange={(e) => handleSettings(e.target.id)}
        />
        <label htmlFor="fastback">Fastback</label>
      </fieldset>
    </StyledControls>
  );
};

const StyledControls = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;

  fieldset {
    border: none;
    background: white;
  }
`;

export default Controls;
