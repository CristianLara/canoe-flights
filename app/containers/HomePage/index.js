/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 * Commented out imports are currently unused (lint errors)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import mapboxgl from 'mapbox-gl';
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
import Tooltip from './tooltip';
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
    };
  }

  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    this.tooltipContainer = document.createElement('div');

    const { lng, lat, zoom } = this.state;

    new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      center: [lng, lat],
      zoom,
    });

    // const tooltip = new mapboxgl.Marker(this.tooltipContainer, {
    //   offset: [-120, 0],
    // }).setLngLat([0, 0]).addTo(map);

    // map.on('mousemove', (e) => {
    //   const features = map.queryRenderedFeatures(e.point);
    //   tooltip.setLngLat(e.lngLat);
    //   map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    //   this.setTooltip(features);
    // });
  }

  setTooltip(features) {
    if (features.length) {
      ReactDOM.render(
        React.createElement(
          Tooltip, {
            features,
          }
        ),
        this.tooltipContainer
      );
    } else {
      this.tooltipContainer.innerHTML = '';
    }
  }

  tooltipContainer;

  render() {
    // const { lng, lat, zoom } = this.state;
    // const { loading, error, repos } = this.props;
    // const reposListProps = {
    //   loading,
    //   error,
    //   repos,
    // };

    return (
      <div>
        <TimelineControl />
        <ControlPanel />
        <MapWrapper>
          <div ref={(el) => this.mapContainer = el} className="absolute top right left bottom" />
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
