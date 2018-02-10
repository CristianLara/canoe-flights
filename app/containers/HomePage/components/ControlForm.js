import React from 'react';
import styled from 'styled-components';
import _ from 'underscore';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

// Using an ES6 transpiler like Babel
import Slider from 'react-rangeslider';

// To include the default styles
import 'react-rangeslider/lib/index.css';

const FormContainer = styled.div`
  padding: 0px 20px 0px 20px;
`;

const FormattedLabel = styled(ControlLabel)`
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const PaddedFormControl = styled(FormControl)`
    margin-bottom: 8px;
`;

class ControlForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      departureAirport: '',
      duration: '',
      volume: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBudgetChange = this.handleBudgetChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getValidationState() {
    const length = this.state.departureAirport.length;
    if (length > 2) return 'success';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(event) {
    this.setState({
      departureAirport: event.target.value,
    });
  }

  handleBudgetChange(value) {
    this.setState({
      volume: value,
    });
  }

  handleSubmit(event) {
    alert('This doesnt currently do shit, TBD');
    event.preventDefault();
  }

  render() {
    const { volume, departureAirport, duration } = this.state;

    return (
      <FormContainer>
        <form onSubmit={this.handleSubmit}>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <FormattedLabel>Departure Airport</FormattedLabel>
            <PaddedFormControl
              type="text"
              value={departureAirport}
              placeholder="SFO"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />

            <FormattedLabel>Trip Duration</FormattedLabel>
            <PaddedFormControl
              componentClass="select"
              placeholder="select"
              value={duration}
              onChange={this.handleChange}
            >
              <option value="1">1 day</option>
              { _.range(2, 30).map((value) => <option value={value}>{value} days</option>) }
            </PaddedFormControl>

            <FormattedLabel>Budget</FormattedLabel>
            <div>
              <Slider
                min={50}
                max={2000}
                step={10}
                value={volume}
                orientation="horizontal"
                onChange={this.handleBudgetChange}
              />
            </div>

            <div className="text-center">
              <Button><input type="submit" value="Search Flights!" /></Button>
            </div>
          </FormGroup>
        </form>
      </FormContainer>
    );
  }
}

export default ControlForm;
