/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 * Commented out imports are currently unused (lint errors)
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import styled from 'styled-components';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';

import saga from './saga';
// import H2 from 'components/H2';
// import ReposList from 'components/ReposList';
// import AtPrefix from './AtPrefix';
// import CenteredSection from './CenteredSection';
// import Form from './Form';
// import Input from './Input';
// import Section from './Section';
// import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import FlightData from './FlightData';
import ControlPanel from './components/ControlPanel';
import TimelineControl from './components/TimelineControl';

mapboxgl.accessToken = 'pk.eyJ1IjoiY3MxOTQiLCJhIjoiY2pjenNqbGkzMHl6djJ3cW92aXowdzAyMCJ9.2eV9Cw_5zopLNcNnNuDG8g';

const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1.5,
      date: moment(), // modified by date slider
      flights: FlightData,
      budget: 500,
    };
    this.map = {};
    this.filteredFlights = {};
    this.updateDate = this.updateDate.bind(this);
    this.updateBudget = this.updateBudget.bind(this);
  }

  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const parent = this;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/cs194/cjdi54hifhzbi2sq3nptfdb9k',
      center: [lng, lat],
      zoom,
    });

    this.map.on('load', function () {
      // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      this.on('mouseenter', 'airports', (e) => {
        // Change the cursor style as a UI indicator.
        this.getCanvas().style.cursor = 'pointer';

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.features[0].geometry.coordinates)
          .setHTML(`<strong>${e.features[0].properties.IATA}:</strong> ${e.features[0].properties.City}</br><center>$${parent.filteredFlights[e.features[0].properties.IATA]}</center>`)
          .addTo(this);
      });

      this.on('mouseleave', 'airports', () => {
        this.getCanvas().style.cursor = '';
        popup.remove();
      });
    });
  }

  componentWillUpdate() {
    const { date, budget, flights } = this.state;
    const filteredFlights = {};

    // populate a list with iata codes for flights matching our filters
    if (this.map.loaded()) {
      flights.FareInfo.forEach((flight) => {
        // check if flight departure matches departure slider date
        if (moment(flight.DepartureDateTime).dayOfYear() === date.dayOfYear()) {
          // check if cost of flight exceeds our budget
          if (flight.LowestFare.Fare <= budget) {
            filteredFlights[flight.DestinationLocation] = flight.LowestFare.Fare;
          }
        }
      });

      this.filteredFlights = filteredFlights;

      this.map.setFilter('airports', ['in', 'IATA'].concat(Object.keys(filteredFlights).map((feature) => feature)));
    }
  }

  updateDate(updatedDate) {
    this.setState({
      date: updatedDate,
    });
  }

  updateBudget(updatedBudget) {
    this.setState({
      budget: updatedBudget,
    });
  }

  render() {
    return (
      <div>
        <TimelineControl updateDate={this.updateDate} />
        <ControlPanel updateBudget={this.updateBudget} />
        <MapWrapper>
          <div ref={(el) => { this.mapContainer = el; }} className="absolute top right left bottom" />
        </MapWrapper>
      </div>
    );
  }
}

HomePage.propTypes = {
  onSubmitForm: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
