import logo from 'images/logo.png';
import React from 'react';
import PropTypes from 'prop-types';
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
    background-color: rgb(37, 37, 37);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    box-shadow: 0px 2px 5px rgb(28, 28, 28);
`;

const Logo = styled.img`
    width: 150px;
    display: block;
    margin:auto;
`;

function ControlPanel(props) {
  return (
    <ControlPanelWrapper>
      <Logo src={logo} alt="Canoe" />
      <ControlForm updateBudget={props.updateBudget} updateFlights={props.updateFlights} />
    </ControlPanelWrapper>
  );
}

ControlPanel.propTypes = {
  updateBudget: PropTypes.func.isRequired,
  updateFlights: PropTypes.func.isRequired,
};

export default ControlPanel;
