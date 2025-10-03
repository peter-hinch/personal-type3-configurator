import React from 'react';

import styled from 'styled-components';

const ColorPicker: React.FC<{
  settings: Settings;
  handleSettings: Function;
}> = ({ settings, handleSettings }) => {
  return (
    <StyledColorPicker>
      <input
        type="color"
        value={settings.paintColorCustom}
        onChange={(e) => {
          handleSettings('paintColorId', 'custom');
          handleSettings('paintColorCustom', e.target.value);
        }}
      />
    </StyledColorPicker>
  );
};

const StyledColorPicker = styled.div`
  input[type='color'] {
    width: 18px;
    height: 18px;
    padding: 0;
    border: none;
  }
`;

export default ColorPicker;
