import React from 'react';
import styled from 'styled-components';
import ControlForm from './ControlForm';

const ControlPanelWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 20px;
  right: 20px;
  
  height: 100px;
  margin: auto;
  z-index: 99;
  background-color: rgba(255, 255, 255, 0.995);
  border-radius: 15px;
`;

function ControlPanel() {
  return (
    <ControlPanelWrapper>
      <ControlForm />
    </ControlPanelWrapper>
  );
}

export default ControlPanel;
