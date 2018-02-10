import logo from 'images/logo.png';
import React from 'react';
import styled from 'styled-components';
import ControlForm from './ControlForm';

const ControlPanelWrapper = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;

    height: auto;
    width: 200px;
    margin: auto;
    z-index: 99;
    background-color: rgba(255, 255, 255, 0.9);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    box-shadow: 0px 2px 5px #888888;
`;

const Logo = styled.img`
    width: 150px;
    display: block;
    margin:auto;
`;

function ControlPanel() {
  return (
    <ControlPanelWrapper>
      <Logo src={logo} alt="Canoe" />
      <ControlForm />
    </ControlPanelWrapper>
  );
}

export default ControlPanel;
