import React from 'react';
import styled from 'styled-components';

declare global {
  type Settings = {
    bodyStyle: 'squareback' | 'notchback' | 'fastback';
    paintColour:
      | 'pearl_white'
      | 'black'
      | 'vw_blue'
      | 'granada_red'
      | 'delta_green'
      | 'sea_sand'
      | 'baltic_blue'
      | 'lotus_white';
  };
}

const bodyStyles: Settings['bodyStyle'][] = [
  'squareback',
  'notchback',
  'fastback'
];
const paintColours: Settings['paintColour'][] = [
  'pearl_white',
  'black',
  'vw_blue',
  'granada_red',
  'delta_green',
  'sea_sand',
  'baltic_blue',
  'lotus_white'
];

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
        {bodyStyles.map((bodyStyle: Settings['bodyStyle']) => (
          <div className="option" key={`body-style--${bodyStyle}`}>
            <input
              type="radio"
              name="body-style"
              id={bodyStyle}
              checked={settings.bodyStyle === bodyStyle}
              onChange={(e) => handleSettings('bodyStyle', e.target.id)}
            />
            <label htmlFor={bodyStyle}>{convertCase(bodyStyle)}</label>
          </div>
        ))}
      </fieldset>
      <fieldset>
        <h4>Paint Colour</h4>
        {paintColours.map((paintColour: Settings['paintColour']) => (
          <div className="option" key={`paint-colour--${paintColour}`}>
            <input
              type="radio"
              name="pearl_white-colour"
              id={paintColour}
              checked={settings.paintColour === paintColour}
              onChange={(e) => handleSettings('paintColour', e.target.id)}
            />
            <label htmlFor={paintColour}>{convertCase(paintColour)}</label>
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
