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
import Spinner from 'react-spinkit';
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
import ControlPanel from './components/ControlPanel';
import DetailsPanel from './components/DetailsPanel';
import TimelineControl from './components/TimelineControl';
import FlightInfo from './FlightInfo';

mapboxgl.accessToken = 'pk.eyJ1IjoiY3MxOTQiLCJhIjoiY2pjenNqbGkzMHl6djJ3cW92aXowdzAyMCJ9.2eV9Cw_5zopLNcNnNuDG8g';

const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledSpinner = styled(Spinner)`
  z-index: 100 !important;
`;

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1.5,
      date: moment().add(1, 'days'), // modified by date slider
      flights: [],
      budget: 500,
      chosenAirport: {},
      loadingState: false,
    };
    this.map = {};
    this.updateFilters = this.updateFilters.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updateBudget = this.updateBudget.bind(this);
    this.updateFlights = this.updateFlights.bind(this);
    this.deselectAirport = this.deselectAirport.bind(this);
    this.updateLoadingState = this.updateLoadingState.bind(this);
  }

  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const parent = this;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [lng, lat],
      zoom,
    });

    // Add zoom and rotation controls to the map.
    // this.map.addControl(new mapboxgl.NavigationControl({ position: 'top-right' }));
    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'bottom-right');

    this.map.on('load', function () {
      this.addSource('flights', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      this.addSource('chosenFeature', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      this.addLayer({
        id: 'airports',
        type: 'circle',
        source: 'flights',
        paint: {
          'circle-radius': 5,
          'circle-color': {
            property: 'lowestFare',
            type: 'exponential',
            stops: [
              [0, '#2ecc71'],
              [250, '#f1c40f'],
              [500, '#e74c3c'],
            ],
          },
          'circle-opacity': 1,
        },
      });

      this.addLayer({
        id: 'chosen-airport',
        type: 'symbol',
        source: 'chosenFeature',
        layout: {
          'icon-image': 'airport-15',
          'icon-size': 1,
        },
      });

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
          .setHTML(`<strong>${e.features[0].properties.airport}:</strong> ${e.features[0].properties.city}</br><center>$${e.features[0].properties.lowestFare}</center>`)
          .addTo(this);
      });

      this.on('click', 'airports', (e) => {
        // update chosen airport in state
        parent.setState({ chosenAirport: e.features[0].properties });

        const geoJSON = {
          type: 'FeatureCollection',
          features: [e.features[0]],
        };

        parent.map.getSource('chosenFeature').setData(geoJSON);
        parent.map.flyTo({
          center: e.features[0].geometry.coordinates,
          speed: 0.12,
          curve: 1,
        });
      });

      this.on('mouseleave', 'airports', () => {
        this.getCanvas().style.cursor = '';
        popup.remove();
      });
    });
  }

  componentWillUpdate() {
    this.updateFilters();
  }

  updateDate(updatedDate) {
    this.setState({
      date: updatedDate,
    });
    const { flights, chosenAirport } = this.state;
    flights.forEach((flight) => {
      if (flight.properties.airport === chosenAirport.airport &&
          flight.properties.departureDate === updatedDate.dayOfYear()) {
        const newFlight = {
          airport: flight.properties.airport,
          city: flight.properties.city,
          lowestFare: flight.properties.lowestFare,
          departureDate: flight.properties.departureDate,
        };
        this.setState({ chosenAirport: newFlight });
      }
    });
  }

  updateFlights(updatedFlight) {
    const features = [];
    updatedFlight.FareInfo.forEach((flight) => {
      if (flight.DestinationLocation in FlightInfo) {
        const lat = FlightInfo[flight.DestinationLocation].lat;
        const long = FlightInfo[flight.DestinationLocation].long;
        const feature = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [long, lat],
          },
          properties: {
            airport: flight.DestinationLocation,
            city: FlightInfo[flight.DestinationLocation].city,
            lowestFare: flight.LowestFare.Fare,
            departureDate: moment(flight.DepartureDateTime).dayOfYear(),
          },
        };
        features.push(feature);
      }
    });

    const geoJSON = {
      type: 'FeatureCollection',
      features,
    };
    this.map.getSource('flights').setData(geoJSON);

    const chosenFeatureGeoJSON = {
      type: 'FeatureCollection',
      features: [],
    };
    this.map.getSource('chosenFeature').setData(chosenFeatureGeoJSON);

    this.updateFilters();
    this.setState({ flights: features });
  }

  deselectAirport() {
    this.setState({ chosenAirport: {} });

    const chosenFeatureGeoJSON = {
      type: 'FeatureCollection',
      features: [],
    };
    this.map.getSource('chosenFeature').setData(chosenFeatureGeoJSON);
  }

  updateFilters() {
    const { date, budget } = this.state;
    if (this.map.loaded()) {
      this.map.setFilter('airports', ['all', ['<=', 'lowestFare', budget], ['==', 'departureDate', date.dayOfYear()]]);
      this.map.setPaintProperty('airports', 'circle-color', {
        property: 'lowestFare',
        type: 'exponential',
        stops: [
          [0, '#2ecc71'],
          [budget / 2, '#f1c40f'],
          [budget, '#e74c3c'],
        ],
      });
    }
  }

  updateBudget(updatedBudget) {
    this.setState({
      budget: updatedBudget,
    });
  }

  updateLoadingState(updatedState) {
    this.setState({
      loadingState: updatedState,
    });
  }

  render() {
    const { flights, chosenAirport, loadingState } = this.state;
    let load = null;
    if (loadingState) {
      load = (<StyledSpinner name="circle" color="aqua" />);
    }
    return (
      <div>
        <TimelineControl updateDate={this.updateDate} />
        <ControlPanel updateLoadingState={this.updateLoadingState} updateBudget={this.updateBudget} updateFlights={this.updateFlights} />
        <DetailsPanel flights={flights} destination={chosenAirport} deselectAirport={this.deselectAirport} />
        <MapWrapper>
          <div ref={(el) => { this.mapContainer = el; }} className="absolute top right left bottom" />
        </MapWrapper>
        {load}
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
