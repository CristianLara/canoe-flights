import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slider from 'react-rangeslider';
import moment from 'moment';
// To include the default styles
import 'react-rangeslider/lib/index.css';

// Apply custom styles to the slider
// TODO: look for a less hacky way of updating the slider styles
const SliderContainer = styled.div`
  position: absolute;
  width: 80%;
  bottom: 40px;
  left: 50%;

  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  z-index: 1;

  .rangeslider__handle-tooltip {
    width: 100px !important;
    background-color: white !important;
    color: black !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2)
  }

  .rangeslider__handle-tooltip:after {
    color: white !important;
  }

  .rangeslider {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
  }

  .rangeslider__fill {
    background-color: #3498db !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0) !important;
  }

  .rangeslider-horizontal .rangeslider__handle:after {
    content: '';
    width: 0px;
  }

  .rangeslider-horizontal .rangeslider__handle {
      border: 0px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2)
  }
`;

class TimelineControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().add(1, 'days'),
      dateDelta: 0,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      dateDelta: value,
      date: moment().add(value, 'days'),
    });
    this.props.updateDate(moment().add(value, 'days'));
  }

  render() {
    const { date, dateDelta } = this.state;

    // kind of gross but i'm putting a label at 182
    // because it's the center of the slider (~= 365/2)
    const labels = { 15: date.format('MMM DD YYYY') };

    // tells the slider how to format the tooltip
    const formatLabel = (value) => moment().add(value, 'days').format('MMM Do');

    return (
      <SliderContainer>
        <Slider
          min={0}
          max={30}
          step={1}
          format={formatLabel}
          value={dateDelta}
          orientation="horizontal"
          labels={labels}
          onChange={this.handleChange}
        />
      </SliderContainer>
    );
  }

}

TimelineControl.propTypes = {
  updateDate: PropTypes.func.isRequired,
};

export default TimelineControl;
