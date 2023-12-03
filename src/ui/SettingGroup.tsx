import React, { useState } from 'react';
import styled from 'styled-components';

const SettingGroup: React.FC<{
  title: string;
  children: any;
}> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <StyledSettingGroup>
      <h4
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        {title}
      </h4>
      {isExpanded && children}
    </StyledSettingGroup>
  );
};

const StyledSettingGroup = styled.fieldset`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  margin: 0 0 0.5rem;
  width: 190px;
  background: white;
  border: none;
  border-radius: 0.5rem;

  h4 {
    margin: 0.25rem 0 0.5rem;
  }

  .option {
    margin-bottom: 0.3rem;

    input {
      margin-left: 0;
    }
  }
`;

export default SettingGroup;
