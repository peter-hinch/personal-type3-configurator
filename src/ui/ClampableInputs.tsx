import React from 'react';

import styled from 'styled-components';

const ClampableInputs: React.FC<{
  labelOne: React.ReactNode;
  inputOne: React.ReactNode;
  labelTwo: React.ReactNode;
  inputTwo: React.ReactNode;
  isClamped: boolean;
  handleClamp: Function;
}> = ({ labelOne, inputOne, labelTwo, inputTwo, isClamped, handleClamp }) => {
  return (
    <StyledClampableInput>
      <div className="container-inputs">
        <div className="input-one">
          {labelOne}
          {inputOne}
        </div>
        <div className="input-two">
          {labelTwo}
          {inputTwo}
        </div>
      </div>
      <div className="container-clamp">
        <button
          title={`Adjust values ${!isClamped ? 'together' : 'independently'}`}
          onClick={() => handleClamp(!isClamped)}
        >
          {isClamped ? '🔗' : '⛓️‍💥'}
        </button>
      </div>
    </StyledClampableInput>
  );
};

const StyledClampableInput = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  div.container- {
    &inputs {
      display: flex;
      flex-direction: column;
    }
    &clamp {
      display: flex;
      justify-content: center;

      button {
        margin-top: 1rem;
        background: transparent;
        border: none;
        cursor: pointer;
      }
    }
  }
`;

export default ClampableInputs;
