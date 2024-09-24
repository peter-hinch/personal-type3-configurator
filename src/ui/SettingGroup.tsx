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
        <span>{title}</span>
        <span>{!isExpanded ? '+' : '-'}</span>
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0.25rem 0;
    cursor: pointer;
  }

  .option {
    margin: 0.25rem 0;

    input {
      margin-left: 0;
    }
  }
`;

export default SettingGroup;
