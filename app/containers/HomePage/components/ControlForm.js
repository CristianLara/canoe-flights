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

    this.handleDepartureAirportChange = this.handleDepartureAirportChange.bind(this);
    this.handleTripDurationChange = this.handleTripDurationChange.bind(this);
    this.handleBudgetChange = this.handleBudgetChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getDestinations(departureAirport, duration, volume) {
    alert("hi");
    const SabreDevStudioFlight = require('sabre-dev-studio/lib/sabre-dev-studio-flight');
    const sabreDevStudio = new SabreDevStudioFlight({
      client_id:  'V1:ah4wtsaa8y09idu8:DEVCENTER:EXT',
      client_secret:  'd4InUP8r',
      uri:  'https://api.test.sabre.com',
    });

    let options = {
      origin: departureAirport,
      lengthofstay: duration,
    	maxfare: volume,
    };
    let callback = function(error, data) {
      if (error) {
        alert(error);
      } else {
        alert(JSON.stringify(JSON.parse(data), null, 4));
      }
    };
    sabreDevStudio.destination_finder(options, callback);
  }

  getValidationState() {
    const length = this.state.departureAirport.length;
    if (length === 3) return 'success';
    if (length > 3) return 'error';
    return null;
  }

  handleDepartureAirportChange(event) {
    this.setState({
      departureAirport: event.target.value.toUpperCase(),
    });
  }

  handleTripDurationChange(event) {
    this.setState({
      duration: event.target.value,
    });
  }

  handleDurationChange(event) {
    this.setState({
      duration: event.target.value,
    });
  }

  handleBudgetChange(event) {
    this.setState({
      volume: event.target.value,
    });
  }

  handleSubmit(event) {
    let departureAirport = this.state.departureAirport;
    let duration = this.state.duration;
    let volume = this.state.volume;
    const SabreDevStudioFlight = require('sabre-dev-studio/lib/sabre-dev-studio-flight');
    const sabreDevStudio = new SabreDevStudioFlight({
      client_id:  'V1:ah4wtsaa8y09idu8:DEVCENTER:EXT',
      client_secret:  'd4InUP8r',
      uri:  'https://api.test.sabre.com',
    });

    let options = {
      origin: departureAirport,
      lengthofstay: duration,
    	maxfare: volume,
    };
    let callback = function(error, data) {
      if (error) {
        alert(error);
      } else {
        alert(JSON.stringify(JSON.parse(data), null, 4));
      }
    };
    sabreDevStudio.destination_finder(options, callback);
    //alert('This doesnt currently do shit, TBD');
    //getDestinations(departureAirport, duration, volume);
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
              onChange={this.handleDepartureAirportChange}
            />
            <FormControl.Feedback />

            <FormattedLabel>Trip Duration</FormattedLabel>
            <PaddedFormControl
              componentClass="select"
              placeholder="select"
              value={duration}
              onChange={this.handleTripDurationChange}
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
