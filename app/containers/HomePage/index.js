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
import moment from 'moment';

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
      date: moment(), // this is the state variable that the date slider modifies
      flights: {},
      budget: 100,
    };
    this.map = {};
    this.updateDate = this.updateDate.bind(this);
    this.updateBudget = this.updateBudget.bind(this);
  }

  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    this.tooltipContainer = document.createElement('div');

    const { lng, lat, zoom } = this.state;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      // style: 'mapbox://styles/mapbox/streets-v9',
      style: 'mapbox://styles/cs194/cjdi54hifhzbi2sq3nptfdb9k',
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

  componentWillUpdate() {

    console.log("UPDATING JAFL;KJFL;KJ");
    // const { date, budget } = this.state;
    const flights = {
  "OriginLocation": "SFO",
  "FareInfo": [
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "DL"
        ],
        "Fare": 1364.61
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 496.29
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.6,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 898.2
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 336.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 336.61
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.4,
      "LowestFare": {
        "AirlineCodes": [
          "VS",
          "BA"
        ],
        "Fare": 2210.71
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 413.38
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 413.38
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "SQ"
        ],
        "Fare": 961.41
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 326.59
      },
      "PricePerMile": 0.34,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 326.59
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 430.61
      },
      "PricePerMile": 0.29,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 430.61
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 786.6
      },
      "PricePerMile": 0.31,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 786.6
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 668.59
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 668.59
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.38,
      "LowestFare": {
        "AirlineCodes": [
          "VS",
          "BA"
        ],
        "Fare": 2159.11
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.38,
      "LowestFare": {
        "AirlineCodes": [
          "AM"
        ],
        "Fare": 618.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 635.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX",
          "HA"
        ],
        "Fare": 478
      },
      "PricePerMile": 0.19,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 454.4
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1461.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 607.99
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 112.21
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "OZ"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 900.51
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 786.6
      },
      "PricePerMile": 0.31,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 786.6
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 198.6
      },
      "PricePerMile": 0.4,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 170.01
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 90.61
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 90.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VS",
          "DL"
        ],
        "Fare": 2899.11
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 815.31
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 436.58
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "AS"
        ],
        "Fare": 361.21
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 668.59
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 581
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 784.01
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "OZ"
        ],
        "Fare": 636.01
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 626.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 928.59
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "AS"
        ],
        "Fare": 375.2
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX",
          "AS"
        ],
        "Fare": 400.59
      },
      "PricePerMile": 0.7,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 382.68
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 570.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 720.6
      },
      "PricePerMile": 0.95,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 620.41
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 490.6
      },
      "PricePerMile": 1.14,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 490.6
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 970.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "CX",
          "KA"
        ],
        "Fare": 730.91
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.3,
      "LowestFare": {
        "AirlineCodes": [
          "DL",
          "AM"
        ],
        "Fare": 466.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "CM"
        ],
        "Fare": 420.94
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 286.59
      },
      "PricePerMile": 0.66,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 286.59
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "DL"
        ],
        "Fare": 556.6
      },
      "PricePerMile": 0.82,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "DL"
        ],
        "Fare": 556.6
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 851.91
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 698.31
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.3,
      "LowestFare": {
        "AirlineCodes": [
          "AM",
          "DL"
        ],
        "Fare": 374.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 306.61
      },
      "PricePerMile": 0.82,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 306.61
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 786.41
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "CX"
        ],
        "Fare": 783.71
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC",
          "UA"
        ],
        "Fare": 911.16
      },
      "PricePerMile": 0.44,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 351.51
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2384.34
      },
      "PricePerMile": 0.39,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 881.06
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "LX"
        ],
        "Fare": 2960.61
      },
      "PricePerMile": 0.43,
      "LowestFare": {
        "AirlineCodes": [
          "VS",
          "BA"
        ],
        "Fare": 2491.61
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-02-13T00:00:00",
      "ReturnDateTime": "2018-02-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-02-13&returndate=2018-02-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 946.6
      },
      "PricePerMile": 0.4,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 855.01
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 796.6
      },
      "PricePerMile": 0.29,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 438.68
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 336.6
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 336.6
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AF"
        ],
        "Fare": 3746.51
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 804.68
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 823.38
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 351.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1170.21
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 675.41
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 326.59
      },
      "PricePerMile": 0.34,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 326.59
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 430.61
      },
      "PricePerMile": 0.29,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 430.61
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 786.6
      },
      "PricePerMile": 0.31,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 786.6
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 668.59
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 668.59
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "LH"
        ],
        "Fare": 3026.71
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 804.11
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 618.25
      },
      "PricePerMile": 0.38,
      "LowestFare": {
        "AirlineCodes": [
          "DL",
          "AM"
        ],
        "Fare": 618.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 605.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "HA"
        ],
        "Fare": 503
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "HA"
        ],
        "Fare": 441.2
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1461.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 607.99
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1158.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 870.51
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 786.6
      },
      "PricePerMile": 0.31,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 786.6
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 198.6
      },
      "PricePerMile": 0.44,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 187.01
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL",
          "VS"
        ],
        "Fare": 2899.11
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 721.98
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 426.61
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 426.61
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 668.59
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "SY"
        ],
        "Fare": 413.21
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 754.01
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "OZ"
        ],
        "Fare": 636.01
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 596.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 928.59
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 296
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 400.59
      },
      "PricePerMile": 0.7,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 382.68
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 739.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "AS",
          "HU"
        ],
        "Fare": 462.71
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 720.6
      },
      "PricePerMile": 0.87,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 568.4
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 490.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 970.61
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU"
        ],
        "Fare": 454.21
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 456.25
      },
      "PricePerMile": 0.29,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 456.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "CM"
        ],
        "Fare": 420.94
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 286.59
      },
      "PricePerMile": 0.66,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 286.59
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 556.6
      },
      "PricePerMile": 0.67,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 458
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "SQ"
        ],
        "Fare": 928.91
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 668.31
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 440.57
      },
      "PricePerMile": 0.3,
      "LowestFare": {
        "AirlineCodes": [
          "DL",
          "AM"
        ],
        "Fare": 374.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 306.61
      },
      "PricePerMile": 0.82,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 306.61
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 766.41
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 702.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC",
          "UA"
        ],
        "Fare": 911.16
      },
      "PricePerMile": 0.44,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 351.51
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 2357.46
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 569.52
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 2960.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 727.81
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-02-14T00:00:00",
      "ReturnDateTime": "2018-02-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-02-14&returndate=2018-02-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 946.6
      },
      "PricePerMile": 0.28,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 588.29
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 796.6
      },
      "PricePerMile": 0.36,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 535.99
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 336.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "SY"
        ],
        "Fare": 304
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH",
          "UA"
        ],
        "Fare": 3687.51
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 804.68
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1567.38
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 509.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1130.21
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 668.21
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 326.59
      },
      "PricePerMile": 0.34,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 326.59
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 430.61
      },
      "PricePerMile": 0.29,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 430.61
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 786.6
      },
      "PricePerMile": 0.31,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 786.6
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 668.59
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 559.99
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "LH"
        ],
        "Fare": 3066.71
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 794.11
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 618.25
      },
      "PricePerMile": 0.38,
      "LowestFare": {
        "AirlineCodes": [
          "AM"
        ],
        "Fare": 618.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CX"
        ],
        "Fare": 637.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 608.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "HA"
        ],
        "Fare": 513
      },
      "PricePerMile": 0.19,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 454.4
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1461.6
      },
      "PricePerMile": 0.36,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 882
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1158.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "SQ"
        ],
        "Fare": 863.71
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 786.6
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "SY"
        ],
        "Fare": 510
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 198.6
      },
      "PricePerMile": 0.47,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 198.6
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 90.61
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 90.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 3139.11
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 721.98
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 426.61
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "SY"
        ],
        "Fare": 374
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 668.59
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 581
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 974.01
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "NH"
        ],
        "Fare": 590.01
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2030.31
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "SQ"
        ],
        "Fare": 702.91
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 928.59
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 492
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX",
          "AS"
        ],
        "Fare": 400.59
      },
      "PricePerMile": 0.73,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "AS"
        ],
        "Fare": 400.59
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 489.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU"
        ],
        "Fare": 454.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 720.6
      },
      "PricePerMile": 0.8,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 523.4
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 490.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 945.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 672.61
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS",
          "UA"
        ],
        "Fare": 816.25
      },
      "PricePerMile": 0.3,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 470.75
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "CM"
        ],
        "Fare": 420.94
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 286.59
      },
      "PricePerMile": 0.66,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 286.59
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 556.6
      },
      "PricePerMile": 0.67,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 458
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "SQ"
        ],
        "Fare": 869.91
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 754.91
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 440.57
      },
      "PricePerMile": 0.3,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 374.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 306.61
      },
      "PricePerMile": 0.82,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 306.61
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 736.41
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 702.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 911.16
      },
      "PricePerMile": 0.44,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 351.51
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "AC"
        ],
        "Fare": 2357.46
      },
      "PricePerMile": 0.39,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 881.06
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 3000.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 717.81
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-02-15T00:00:00",
      "ReturnDateTime": "2018-02-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-02-15&returndate=2018-02-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 875.59
      },
      "PricePerMile": 0.31,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 656.02
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 709.6
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 490.7
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 296.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 296.61
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH",
          "UA"
        ],
        "Fare": 3487.51
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "EI",
          "B6"
        ],
        "Fare": 829.58
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1250.38
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 427.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "LX"
        ],
        "Fare": 685.21
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 243.6
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 243.6
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 351.61
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 351.61
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 506.61
      },
      "PricePerMile": 0.19,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 477
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 512.6
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 466.98
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "LH"
        ],
        "Fare": 2526.71
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 804.11
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.36,
      "LowestFare": {
        "AirlineCodes": [
          "AM"
        ],
        "Fare": 593.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 635.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "HA",
          "UA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "HA",
          "UA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 1301.6
      },
      "PricePerMile": 0.3,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 721.99
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 980.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 1055.91
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 900.51
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 506.61
      },
      "PricePerMile": 0.19,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "SY"
        ],
        "Fare": 499.01
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 198.6
      },
      "PricePerMile": 0.43,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 182.31
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VS"
        ],
        "Fare": 2549.11
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "SK"
        ],
        "Fare": 790.91
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 398.6
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 367.01
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 512.6
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 425
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 784.01
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "NH"
        ],
        "Fare": 642.01
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 626.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 762.6
      },
      "PricePerMile": 0.19,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 351
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 338.6
      },
      "PricePerMile": 0.62,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 338.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 712.61
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "NH"
        ],
        "Fare": 502.41
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 565.59
      },
      "PricePerMile": 0.72,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 469.99
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 430.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 990.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 672.61
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 389.25
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 389.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "CM"
        ],
        "Fare": 420.94
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 226.59
      },
      "PricePerMile": 0.52,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 226.59
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 466.6
      },
      "PricePerMile": 0.61,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 414
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "SQ"
        ],
        "Fare": 883.91
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 698.31
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 382.57
      },
      "PricePerMile": 0.28,
      "LowestFare": {
        "AirlineCodes": [
          "DL",
          "AM"
        ],
        "Fare": 354.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 246.6
      },
      "PricePerMile": 0.66,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 246.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "BR"
        ],
        "Fare": 826.41
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "AC",
          "KA",
          "UA"
        ],
        "Fare": 751.21
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "AC"
        ],
        "Fare": 632.74
      },
      "PricePerMile": 0.44,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 351.51
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 1570.56
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 747.76
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 2460.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 727.81
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-02-16T00:00:00",
      "ReturnDateTime": "2018-02-20T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-02-16&returndate=2018-02-20&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 347.58
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 347.58
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 709.6
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 492
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 296.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 296.6
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AF",
          "DL"
        ],
        "Fare": 3746.51
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "AF",
          "BA"
        ],
        "Fare": 1241.31
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1116.38
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 347.48
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1170.21
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "AC"
        ],
        "Fare": 705.21
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 221.59
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 221.59
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 351.61
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 351.61
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 506.61
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 506.61
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 512.6
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 512.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH"
        ],
        "Fare": 2644.21
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 804.11
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "H1"
        ],
        "Fare": 444.25
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "H1"
        ],
        "Fare": 444.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CX"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 635.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "HA",
          "UA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "HA",
          "UA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 1301.6
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 509
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 980.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 1055.91
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 900.51
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 506.61
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 430
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 157.59
      },
      "PricePerMile": 0.37,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 157.59
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL",
          "VS"
        ],
        "Fare": 2899.11
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "SK"
        ],
        "Fare": 790.91
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 398.6
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 367.01
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 512.6
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 425
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 784.01
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "NH"
        ],
        "Fare": 640.01
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 626.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 762.6
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 324.01
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 338.6
      },
      "PricePerMile": 0.62,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 338.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 489.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU",
          "VX"
        ],
        "Fare": 479.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 565.59
      },
      "PricePerMile": 0.72,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 469.99
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 430.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 970.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 672.61
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 389.25
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 389.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "CM"
        ],
        "Fare": 420.94
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 226.59
      },
      "PricePerMile": 0.52,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 226.59
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 466.6
      },
      "PricePerMile": 0.61,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 414
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 851.91
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 698.31
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 382.57
      },
      "PricePerMile": 0.28,
      "LowestFare": {
        "AirlineCodes": [
          "DL",
          "AM"
        ],
        "Fare": 354.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 246.6
      },
      "PricePerMile": 0.66,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 246.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 826.41
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "AC",
          "KA"
        ],
        "Fare": 777.61
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "AC"
        ],
        "Fare": 632.74
      },
      "PricePerMile": 0.44,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 351.51
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "AC"
        ],
        "Fare": 1570.56
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 747.76
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 2960.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 727.81
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-02-17T00:00:00",
      "ReturnDateTime": "2018-02-21T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-02-17&returndate=2018-02-21&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1131.6
      },
      "PricePerMile": 0.31,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 656.02
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 709.6
      },
      "PricePerMile": 0.32,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 475
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 296.6
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "SY",
          "VX"
        ],
        "Fare": 280.3
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AF",
          "DL"
        ],
        "Fare": 3746.51
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "BA"
        ],
        "Fare": 1201.31
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1250.38
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 506.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1170.21
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "CZ"
        ],
        "Fare": 817.81
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 221.59
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 221.59
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 351.61
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 351.61
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 506.61
      },
      "PricePerMile": 0.19,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 477
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 512.6
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 427.3
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH"
        ],
        "Fare": 2604.21
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "SQ",
          "VX"
        ],
        "Fare": 1143.31
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AM",
          "DL"
        ],
        "Fare": 593.25
      },
      "PricePerMile": 0.36,
      "LowestFare": {
        "AirlineCodes": [
          "AM"
        ],
        "Fare": 593.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 605.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "HA",
          "UA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "HA",
          "UA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 1301.6
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 536
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1358.59
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 870.51
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 506.61
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "SY",
          "VX"
        ],
        "Fare": 394.31
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 173.6
      },
      "PricePerMile": 0.41,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 173.6
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 90.61
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 90.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL",
          "VS"
        ],
        "Fare": 2859.11
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ"
        ],
        "Fare": 1073.71
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 398.6
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "SY",
          "VX"
        ],
        "Fare": 309.01
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 512.6
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "SY",
          "VX"
        ],
        "Fare": 383.2
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 754.01
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "NH",
          "UA"
        ],
        "Fare": 592.81
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 596.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 762.6
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 471.99
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA",
          "AS"
        ],
        "Fare": 338.6
      },
      "PricePerMile": 0.62,
      "LowestFare": {
        "AirlineCodes": [
          "AA",
          "AS"
        ],
        "Fare": 338.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 489.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU"
        ],
        "Fare": 454.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 565.59
      },
      "PricePerMile": 0.72,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 469.99
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 430.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 945.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AC",
          "UA"
        ],
        "Fare": 676.21
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 389.25
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 389.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "CM"
        ],
        "Fare": 420.94
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 226.59
      },
      "PricePerMile": 0.52,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 226.59
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 466.6
      },
      "PricePerMile": 0.6,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 406
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 851.91
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 668.31
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 382.57
      },
      "PricePerMile": 0.28,
      "LowestFare": {
        "AirlineCodes": [
          "DL",
          "AM"
        ],
        "Fare": 354.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 246.6
      },
      "PricePerMile": 0.66,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 246.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 766.41
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 702.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "AC"
        ],
        "Fare": 654.24
      },
      "PricePerMile": 0.42,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "WS",
          "AS"
        ],
        "Fare": 336.22
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1570.56
      },
      "PricePerMile": 0.34,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 759.59
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 2920.61
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "BA"
        ],
        "Fare": 1282.21
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-02-18T00:00:00",
      "ReturnDateTime": "2018-02-22T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-02-18&returndate=2018-02-22&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 347.58
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 347.58
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 669.6
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 490.7
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 296.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 296.6
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 3687.51
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "AF"
        ],
        "Fare": 1241.31
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1250.38
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 506.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1170.21
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "SQ"
        ],
        "Fare": 896.01
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 261.59
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 261.59
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 351.61
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 351.61
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 506.61
      },
      "PricePerMile": 0.19,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 477
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 512.6
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 441.98
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH"
        ],
        "Fare": 2644.21
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "SQ"
        ],
        "Fare": 1171.31
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AM",
          "DL"
        ],
        "Fare": 593.25
      },
      "PricePerMile": 0.36,
      "LowestFare": {
        "AirlineCodes": [
          "DL",
          "AM"
        ],
        "Fare": 593.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CX"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 635.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "HA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "HA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 1301.6
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 506
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1358.59
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 900.51
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 506.61
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 430
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 157.59
      },
      "PricePerMile": 0.37,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 157.59
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VS"
        ],
        "Fare": 2859.11
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ"
        ],
        "Fare": 1113.71
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 398.6
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 398.6
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 512.6
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 425
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 784.01
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "OZ"
        ],
        "Fare": 636.01
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 626.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 762.6
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 276.01
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX",
          "AS"
        ],
        "Fare": 338.6
      },
      "PricePerMile": 0.62,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "AS"
        ],
        "Fare": 338.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 489.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU",
          "VX"
        ],
        "Fare": 479.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 540.6
      },
      "PricePerMile": 0.68,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 445
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 430.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 982.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "CX",
          "KA"
        ],
        "Fare": 730.91
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 479.25
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "DL",
          "AM"
        ],
        "Fare": 399.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 211.6
      },
      "PricePerMile": 0.49,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 211.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 466.6
      },
      "PricePerMile": 0.61,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 413.01
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 851.91
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 698.31
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 382.57
      },
      "PricePerMile": 0.28,
      "LowestFare": {
        "AirlineCodes": [
          "AM"
        ],
        "Fare": 354.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 231.6
      },
      "PricePerMile": 0.62,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 231.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 786.41
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 702.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 654.24
      },
      "PricePerMile": 0.44,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 351.51
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC",
          "UA"
        ],
        "Fare": 1597.44
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 568.82
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 2960.61
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "BA"
        ],
        "Fare": 1322.21
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-02-19T00:00:00",
      "ReturnDateTime": "2018-02-23T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-02-19&returndate=2018-02-23&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 898.6
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 391.29
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 582.6
      },
      "PricePerMile": 0.3,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 456.01
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 256.6
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 256.6
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AF",
          "DL"
        ],
        "Fare": 3746.51
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "BA"
        ],
        "Fare": 1291.31
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1032.38
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 427.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "CZ"
        ],
        "Fare": 892.81
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 116.6
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 116.6
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 272.6
      },
      "PricePerMile": 0.19,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 272.6
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 336.61
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 336.61
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 356.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 356.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH"
        ],
        "Fare": 2644.21
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "SQ"
        ],
        "Fare": 1115.31
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.32,
      "LowestFare": {
        "AirlineCodes": [
          "DL",
          "AM"
        ],
        "Fare": 518.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 685.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "HA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "HA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 1106.61
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 511.99
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 952.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "SQ"
        ],
        "Fare": 913.71
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 336.61
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 336.61
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 147.59
      },
      "PricePerMile": 0.35,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 147.59
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "OS",
          "UA"
        ],
        "Fare": 2479.11
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 815.31
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 370.6
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "AS"
        ],
        "Fare": 326.21
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 356.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 356.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 844.01
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "OZ"
        ],
        "Fare": 636.01
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AC",
          "UA"
        ],
        "Fare": 724.31
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 596.61
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 374
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.5,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 489.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 489.61
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 385.6
      },
      "PricePerMile": 0.59,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 385.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 396.59
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 970.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "CX"
        ],
        "Fare": 730.91
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "AS"
        ],
        "Fare": 322.25
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "AS"
        ],
        "Fare": 322.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 211.6
      },
      "PricePerMile": 0.49,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 211.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 376.6
      },
      "PricePerMile": 0.54,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 369.01
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 907.91
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 748.31
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 324.57
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 324.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 211.6
      },
      "PricePerMile": 0.57,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 211.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "BR"
        ],
        "Fare": 826.41
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 702.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 425.26
      },
      "PricePerMile": 0.36,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 284.86
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "AC"
        ],
        "Fare": 1267.41
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 563.82
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 2960.61
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "BA"
        ],
        "Fare": 1372.21
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-02-20T00:00:00",
      "ReturnDateTime": "2018-02-24T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-02-20&returndate=2018-02-24&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 804.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 536.03
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 582.6
      },
      "PricePerMile": 0.31,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 458.03
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 256.6
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 256.6
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AF"
        ],
        "Fare": 2399.51
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 804.68
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1031.38
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 351.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1170.21
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 710.41
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 178.61
      },
      "PricePerMile": 0.19,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 178.61
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 272.6
      },
      "PricePerMile": 0.19,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 272.6
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 336.61
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 336.61
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 356.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 356.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "LH"
        ],
        "Fare": 2176.71
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 804.11
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "H1"
        ],
        "Fare": 444.25
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "H1"
        ],
        "Fare": 444.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CX"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 655.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "HA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "HA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 1106.61
      },
      "PricePerMile": 0.19,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 456.01
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 802.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "SQ"
        ],
        "Fare": 913.71
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 336.61
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 336.61
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 147.59
      },
      "PricePerMile": 0.35,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 147.59
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 1669.11
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 721.98
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 370.6
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "AS"
        ],
        "Fare": 322.01
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 356.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 356.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 814.01
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "OZ"
        ],
        "Fare": 636.01
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 724.31
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 596.61
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 329
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.5,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 489.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "AS",
          "HU"
        ],
        "Fare": 462.71
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 385.6
      },
      "PricePerMile": 0.59,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 385.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 396.59
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 970.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "CX",
          "KA"
        ],
        "Fare": 680.91
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 322.25
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 322.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 211.6
      },
      "PricePerMile": 0.49,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 211.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 376.6
      },
      "PricePerMile": 0.54,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 369.01
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "SQ"
        ],
        "Fare": 883.91
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 718.31
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "AS"
        ],
        "Fare": 424.57
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "DL",
          "AM"
        ],
        "Fare": 334.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 211.6
      },
      "PricePerMile": 0.57,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 211.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 726.41
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 702.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 425.26
      },
      "PricePerMile": 0.36,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 284.86
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "AC"
        ],
        "Fare": 1267.41
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 568.24
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 2110.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 727.81
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-02-21T00:00:00",
      "ReturnDateTime": "2018-02-25T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-02-21&returndate=2018-02-25&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 804.6
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 391.29
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 582.6
      },
      "PricePerMile": 0.31,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 458.03
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 256.6
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "SY"
        ],
        "Fare": 245.99
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 2439.51
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 804.68
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1250.38
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 506.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1130.21
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "AC"
        ],
        "Fare": 668.21
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 196.6
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 196.6
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 272.6
      },
      "PricePerMile": 0.19,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 272.6
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 336.6
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 336.6
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 356.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 356.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "LH"
        ],
        "Fare": 2216.71
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 794.11
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 518.25
      },
      "PricePerMile": 0.32,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 518.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 637.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 608.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "HA",
          "VX"
        ],
        "Fare": 478
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "HA"
        ],
        "Fare": 441.2
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 1106.61
      },
      "PricePerMile": 0.19,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 456.01
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 802.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "SQ"
        ],
        "Fare": 863.71
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 336.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "SY"
        ],
        "Fare": 304
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 147.59
      },
      "PricePerMile": 0.35,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 147.59
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 90.6
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 90.6
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL",
          "VS"
        ],
        "Fare": 1709.11
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 721.98
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 370.6
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "SY"
        ],
        "Fare": 320.2
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 356.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 356.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 814.01
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "NH"
        ],
        "Fare": 590.01
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2030.31
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "SQ"
        ],
        "Fare": 702.91
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 596.61
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 276.01
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.5,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 489.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU"
        ],
        "Fare": 454.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 385.6
      },
      "PricePerMile": 0.59,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 385.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 396.59
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 945.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "CX",
          "KA"
        ],
        "Fare": 680.91
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 736.25
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "DL",
          "AM"
        ],
        "Fare": 332.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 211.6
      },
      "PricePerMile": 0.49,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 211.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 376.6
      },
      "PricePerMile": 0.54,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 369.01
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "SQ"
        ],
        "Fare": 833.91
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 718.31
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 324.57
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 324.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 211.6
      },
      "PricePerMile": 0.57,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 211.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 696.41
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 696.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC",
          "UA"
        ],
        "Fare": 446.76
      },
      "PricePerMile": 0.37,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 295.61
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "AC"
        ],
        "Fare": 1267.41
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 563.82
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 2150.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 717.81
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-02-22T00:00:00",
      "ReturnDateTime": "2018-02-26T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-02-22&returndate=2018-02-26&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 615.6
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 469.02
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 402.6
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 359.01
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 226.6
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 226.6
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 2399.51
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "EI",
          "B6"
        ],
        "Fare": 811.58
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 714.38
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 418.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "LX"
        ],
        "Fare": 685.21
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 156.6
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 156.6
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 255.6
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 255.6
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 286.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 286.6
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 321.6
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 321.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "LH"
        ],
        "Fare": 2176.71
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 804.11
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.3,
      "LowestFare": {
        "AirlineCodes": [
          "DL",
          "AM"
        ],
        "Fare": 493.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CX"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "CX"
        ],
        "Fare": 687.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "HA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "HA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 941.61
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 419.99
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 591.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 1055.91
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "SQ"
        ],
        "Fare": 913.71
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 286.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 286.6
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 138.59
      },
      "PricePerMile": 0.32,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 136.49
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 90.6
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 90.6
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "SN"
        ],
        "Fare": 1669.11
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 815.31
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 290.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "SY",
          "VX"
        ],
        "Fare": 267.3
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 321.6
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 321.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 844.01
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "NH"
        ],
        "Fare": 640.01
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 676.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 431.61
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 271.31
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 201.6
      },
      "PricePerMile": 0.37,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 201.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 589.61
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "HU",
          "AS"
        ],
        "Fare": 529.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 280.6
      },
      "PricePerMile": 0.43,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 280.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 368.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 970.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "CX",
          "KA"
        ],
        "Fare": 730.91
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 322.25
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 322.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 166.6
      },
      "PricePerMile": 0.38,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 166.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 256.6
      },
      "PricePerMile": 0.38,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 256.6
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "SQ"
        ],
        "Fare": 883.91
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 748.31
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 324.57
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "AS"
        ],
        "Fare": 323.67
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 166.6
      },
      "PricePerMile": 0.45,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 166.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "AA",
          "JL"
        ],
        "Fare": 779.51
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC",
          "UA"
        ],
        "Fare": 341.41
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "WS",
          "AS"
        ],
        "Fare": 267.49
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "AC"
        ],
        "Fare": 981.46
      },
      "PricePerMile": 0.19,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 432.79
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 2110.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 727.81
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-02-23T00:00:00",
      "ReturnDateTime": "2018-02-27T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-02-23&returndate=2018-02-27&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 240.58
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 240.58
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 402.6
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 390.99
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 226.6
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 226.6
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 3746.51
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "BA",
          "AF"
        ],
        "Fare": 1241.31
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 404.38
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 347.48
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1220.21
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 710.41
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 116.6
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 116.6
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 255.6
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 255.6
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 286.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 286.6
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 321.6
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 321.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH"
        ],
        "Fare": 2644.21
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 804.11
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "H1"
        ],
        "Fare": 444.25
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "H1"
        ],
        "Fare": 444.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CX"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 635.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "HA",
          "UA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "HA",
          "UA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 941.61
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 419.99
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 591.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 1055.91
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 900.51
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 286.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 286.6
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 106.58
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 106.58
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AY"
        ],
        "Fare": 2479.11
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 815.31
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 290.6
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 233.3
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 321.6
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 321.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 784.01
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "NH"
        ],
        "Fare": 640.01
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 626.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 431.61
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 271.31
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 201.6
      },
      "PricePerMile": 0.37,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 201.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 664.61
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "NH"
        ],
        "Fare": 502.41
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 280.6
      },
      "PricePerMile": 0.43,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 280.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 368.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 970.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "CX"
        ],
        "Fare": 730.91
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 322.25
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 322.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 166.6
      },
      "PricePerMile": 0.38,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 166.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS",
          "VX"
        ],
        "Fare": 256.6
      },
      "PricePerMile": 0.38,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "VX"
        ],
        "Fare": 256.6
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "SQ"
        ],
        "Fare": 883.91
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 698.31
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 324.57
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "AS"
        ],
        "Fare": 323.67
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 166.6
      },
      "PricePerMile": 0.45,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 166.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "BR"
        ],
        "Fare": 826.41
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "AC",
          "KA",
          "UA"
        ],
        "Fare": 762.71
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 341.41
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "WS",
          "AS"
        ],
        "Fare": 267.49
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "AC"
        ],
        "Fare": 1008.34
      },
      "PricePerMile": 0.19,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 432.79
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 2960.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 727.81
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-02-24T00:00:00",
      "ReturnDateTime": "2018-02-28T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-02-24&returndate=2018-02-28&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 763.6
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "AS"
        ],
        "Fare": 424.42
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 402.6
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 390.99
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 291.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "SY",
          "VX"
        ],
        "Fare": 286.29
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AF"
        ],
        "Fare": 3746.51
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "AF",
          "BA"
        ],
        "Fare": 1201.31
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 486.38
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 486.38
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1220.21
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "CZ"
        ],
        "Fare": 847.81
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 156.6
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 156.6
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 255.6
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 255.6
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 286.59
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 286.59
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 321.6
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 321.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH"
        ],
        "Fare": 2604.21
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "SQ"
        ],
        "Fare": 1115.31
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 493.25
      },
      "PricePerMile": 0.3,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 493.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 605.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 941.61
      },
      "PricePerMile": 0.19,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 454.99
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1358.59
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 870.51
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 286.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "SY",
          "VX"
        ],
        "Fare": 270.29
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 138.59
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 138.59
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 90.61
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 90.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AY"
        ],
        "Fare": 2479.11
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ"
        ],
        "Fare": 1073.71
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 315.6
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "SY"
        ],
        "Fare": 286.21
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 321.6
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 321.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 754.01
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "OZ"
        ],
        "Fare": 636.01
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 596.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 431.61
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 316
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 201.6
      },
      "PricePerMile": 0.37,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 201.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 589.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU"
        ],
        "Fare": 454.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 280.6
      },
      "PricePerMile": 0.43,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 280.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 368.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 945.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "CX"
        ],
        "Fare": 730.91
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 322.25
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 322.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 166.6
      },
      "PricePerMile": 0.38,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 166.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS",
          "VX"
        ],
        "Fare": 256.6
      },
      "PricePerMile": 0.38,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "VX"
        ],
        "Fare": 256.6
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 851.91
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 668.31
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 324.57
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 324.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 166.6
      },
      "PricePerMile": 0.45,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 166.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 706.41
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 702.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC",
          "UA"
        ],
        "Fare": 380.11
      },
      "PricePerMile": 0.34,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 275.19
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 1008.34
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 438.16
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 2920.61
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "BA",
          "LX"
        ],
        "Fare": 1282.21
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-02-25T00:00:00",
      "ReturnDateTime": "2018-03-01T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-02-25&returndate=2018-03-01&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 260.58
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 260.58
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 477.6
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 359.2
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 291.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 291.6
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 3687.51
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "AF"
        ],
        "Fare": 1241.31
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 486.38
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 486.38
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1120.21
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "CZ"
        ],
        "Fare": 842.81
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 143.6
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 143.6
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 255.6
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 255.6
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 286.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 286.6
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 321.6
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 321.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH"
        ],
        "Fare": 2644.21
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "SQ"
        ],
        "Fare": 1115.31
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 493.25
      },
      "PricePerMile": 0.3,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 493.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CX"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 685.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "HA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "HA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 941.61
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 432
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1358.59
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 865.11
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 286.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 286.6
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 106.58
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 106.58
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 90.6
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 90.6
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AY"
        ],
        "Fare": 2479.11
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ"
        ],
        "Fare": 1113.71
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 315.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 258.31
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 321.6
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 321.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 844.01
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "OZ"
        ],
        "Fare": 636.01
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 676.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 545.6
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 276.01
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 221.61
      },
      "PricePerMile": 0.4,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 221.61
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 589.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU",
          "VX"
        ],
        "Fare": 479.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 320.6
      },
      "PricePerMile": 0.49,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 320.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 368.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 970.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "CZ"
        ],
        "Fare": 711.41
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 322.25
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 322.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 172.6
      },
      "PricePerMile": 0.4,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 172.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS",
          "AA"
        ],
        "Fare": 295.6
      },
      "PricePerMile": 0.43,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 292.3
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 851.91
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 748.31
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 324.57
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 324.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 171.6
      },
      "PricePerMile": 0.46,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 171.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 801.41
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 702.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC",
          "UA"
        ],
        "Fare": 380.11
      },
      "PricePerMile": 0.34,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 275.19
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 981.46
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 438.16
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 2960.61
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "BA"
        ],
        "Fare": 1322.21
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-02-26T00:00:00",
      "ReturnDateTime": "2018-03-02T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-02-26&returndate=2018-03-02&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 628.6
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 253.29
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 262.61
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 253.99
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 261.59
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 261.59
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 3746.51
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "AF"
        ],
        "Fare": 1241.31
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 455.38
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 418.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "CZ"
        ],
        "Fare": 847.81
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 116.6
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 116.6
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 286.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 286.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH"
        ],
        "Fare": 2644.21
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "SQ"
        ],
        "Fare": 1115.31
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "DL",
          "AM"
        ],
        "Fare": 448.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CX"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 635.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "HA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "HA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 776.61
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 327.99
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 716.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 900.51
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 138.59
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 138.59
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 90.61
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 90.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AY",
          "AA"
        ],
        "Fare": 2479.11
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 815.31
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 235.6
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 233.3
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 286.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 286.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 784.01
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "OZ"
        ],
        "Fare": 636.01
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 626.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 266.61
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 253.99
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 126.6
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 126.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 597.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU"
        ],
        "Fare": 454.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 200.6
      },
      "PricePerMile": 0.31,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 200.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 340.61
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 970.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "OZ"
        ],
        "Fare": 724.61
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "AS"
        ],
        "Fare": 322.25
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "AS"
        ],
        "Fare": 322.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 136.59
      },
      "PricePerMile": 0.31,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 136.59
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 136.59
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 136.59
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "SQ"
        ],
        "Fare": 883.91
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 698.31
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 324.57
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 317.17
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 136.59
      },
      "PricePerMile": 0.37,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 136.59
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 786.41
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 702.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 319.91
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 263.36
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 695.51
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 348.94
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 2960.61
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "BA",
          "LX"
        ],
        "Fare": 1322.21
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-02-27T00:00:00",
      "ReturnDateTime": "2018-03-03T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-02-27&returndate=2018-03-03&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 426.6
      },
      "PricePerMile": 0.19,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 402.02
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 337.6
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 253.99
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 261.59
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 261.59
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AF"
        ],
        "Fare": 2399.51
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 804.68
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 878.38
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 478.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1293.21
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "AC"
        ],
        "Fare": 679.91
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 165.61
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 165.61
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 286.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 286.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "LH"
        ],
        "Fare": 1826.71
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 804.11
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "H1"
        ],
        "Fare": 444.25
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "H1"
        ],
        "Fare": 444.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 655.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 776.61
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 363
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 511.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 870.51
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 138.59
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 138.59
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 1169.11
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 721.98
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 235.6
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 235.6
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 286.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 286.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 814.01
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "OZ"
        ],
        "Fare": 636.01
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "AC"
        ],
        "Fare": 724.31
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 380.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 255.99
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 146.6
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 146.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 589.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "HU",
          "AS"
        ],
        "Fare": 479.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 240.6
      },
      "PricePerMile": 0.37,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 240.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 340.61
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 970.61
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU"
        ],
        "Fare": 454.21
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 322.25
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 322.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 142.59
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 142.59
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 175.6
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 175.6
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "SQ"
        ],
        "Fare": 883.91
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 718.31
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 324.57
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 317.17
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 141.59
      },
      "PricePerMile": 0.38,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 141.59
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 706.41
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 702.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 274.76
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 263.36
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 695.51
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 348.94
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 1760.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 727.81
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-02-28T00:00:00",
      "ReturnDateTime": "2018-03-04T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-02-28&returndate=2018-03-04&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 426.6
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 273.29
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 262.61
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 253.99
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 326.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "SY"
        ],
        "Fare": 245.99
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2963.51
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 804.68
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 650.38
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 478.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1253.21
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 668.21
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 170.6
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 170.6
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 286.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 286.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "LH"
        ],
        "Fare": 1866.71
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 794.11
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AM"
        ],
        "Fare": 448.25
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AM"
        ],
        "Fare": 448.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 637.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 608.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 776.61
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 398
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 380.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 835.11
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 146.59
      },
      "PricePerMile": 0.34,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 145.35
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 721.98
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 260.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 260.61
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 286.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 286.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 814.01
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "NH"
        ],
        "Fare": 590.01
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2030.31
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 646.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 266.61
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 257.99
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 126.6
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 126.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 597.61
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 597.61
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 200.6
      },
      "PricePerMile": 0.31,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 200.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 340.61
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 945.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "CX",
          "KA"
        ],
        "Fare": 680.91
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 505.25
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 336.75
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 136.59
      },
      "PricePerMile": 0.31,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 136.59
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 136.59
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 136.59
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 801.91
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 718.31
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 324.57
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "AS"
        ],
        "Fare": 317.17
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 136.59
      },
      "PricePerMile": 0.37,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 136.59
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 676.41
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 676.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 313.46
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 267.66
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 695.51
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 354.31
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 1800.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 717.81
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-03-01T00:00:00",
      "ReturnDateTime": "2018-03-05T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-03-01&returndate=2018-03-05&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 344.6
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 344.6
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 314.59
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 253.99
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 284.59
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 284.59
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2923.51
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 804.68
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 650.38
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 418.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 710.41
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 165.61
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 165.61
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 237.59
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 237.59
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 281.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 281.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "LH"
        ],
        "Fare": 1826.71
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 804.11
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AM"
        ],
        "Fare": 448.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 635.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "HA",
          "UA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "HA",
          "UA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 586.6
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 363
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 501.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 1055.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 865.11
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 231.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 231.59
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 128.6
      },
      "PricePerMile": 0.29,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 122.29
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 87.61
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 87.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 721.98
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 235.6
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 235.6
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 281.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 281.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 784.01
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 618.61
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 626.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 365.59
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 255.99
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 131.61
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 131.61
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 639.61
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "NH"
        ],
        "Fare": 502.41
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 230.6
      },
      "PricePerMile": 0.35,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 230.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 258.61
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 722.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 722.61
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 315.25
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 315.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "CM"
        ],
        "Fare": 420.94
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 132.6
      },
      "PricePerMile": 0.3,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 132.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 165.6
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 165.6
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "SQ"
        ],
        "Fare": 883.91
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 633.51
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.57
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 302.07
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 121.6
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 121.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 796.41
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "AC",
          "KA",
          "UA"
        ],
        "Fare": 751.21
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 274.76
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 263.36
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 652.51
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 348.94
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 1760.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 727.81
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-03-02T00:00:00",
      "ReturnDateTime": "2018-03-06T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-03-02&returndate=2018-03-06&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 190.58
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 190.58
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 239.6
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 239.6
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 284.59
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 284.59
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 3746.51
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 804.68
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 455.38
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AM"
        ],
        "Fare": 414.38
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1120.21
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 710.41
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 138.6
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 138.6
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 237.59
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 237.59
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 281.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 281.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH"
        ],
        "Fare": 2644.21
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 804.11
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "H1"
        ],
        "Fare": 444.25
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "H1"
        ],
        "Fare": 444.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CX"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 512.61
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 586.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 327.99
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 370.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 1055.91
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 900.51
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 231.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 231.59
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 106.58
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 106.58
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 87.61
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 87.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 721.98
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 254.59
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 233.3
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 281.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 281.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 784.01
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 498.61
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 626.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 251.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 251.6
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 111.6
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 111.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 664.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU",
          "VX"
        ],
        "Fare": 479.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 200.6
      },
      "PricePerMile": 0.31,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 199.3
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 258.61
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 730.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "AS",
          "HU"
        ],
        "Fare": 462.71
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS",
          "UA"
        ],
        "Fare": 315.25
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "UA"
        ],
        "Fare": 315.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 126.6
      },
      "PricePerMile": 0.29,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 126.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 126.6
      },
      "PricePerMile": 0.19,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 126.6
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "SQ"
        ],
        "Fare": 892.91
      },
      "PricePerMile": 0.06,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 513.51
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 308.57
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "AS"
        ],
        "Fare": 302.07
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 116.6
      },
      "PricePerMile": 0.31,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 116.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 796.41
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "AC",
          "KA",
          "UA"
        ],
        "Fare": 762.71
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 319.91
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 263.36
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 652.51
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 348.94
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 2960.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 727.81
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-03-03T00:00:00",
      "ReturnDateTime": "2018-03-07T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-03-03&returndate=2018-03-07&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 578.6
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 354.02
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 337.6
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 253.99
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 306.6
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "SY",
          "VX"
        ],
        "Fare": 266.3
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "LH"
        ],
        "Fare": 3687.51
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "BA",
          "AF"
        ],
        "Fare": 1201.31
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 477.38
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 477.38
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1120.21
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "CZ"
        ],
        "Fare": 807.81
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 170.6
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 170.6
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 281.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 281.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH"
        ],
        "Fare": 2604.21
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "SQ"
        ],
        "Fare": 1116.01
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL",
          "AM"
        ],
        "Fare": 448.25
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AM"
        ],
        "Fare": 448.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CX"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 512.61
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "HA",
          "UA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "HA",
          "UA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 669.6
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 398
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1358.59
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 865.11
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 120.6
      },
      "PricePerMile": 0.28,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 120.6
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 90.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ"
        ],
        "Fare": 1073.71
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 260.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 260.61
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 281.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 281.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 754.01
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 498.61
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 596.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 380.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 257.99
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 146.59
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 146.59
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 589.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU"
        ],
        "Fare": 454.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 240.6
      },
      "PricePerMile": 0.37,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 240.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 296.61
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 722.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 676.21
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 315.25
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 315.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "CM"
        ],
        "Fare": 420.94
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 132.6
      },
      "PricePerMile": 0.3,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 132.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 175.6
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 175.6
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 851.91
      },
      "PricePerMile": 0.06,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 513.51
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.57
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "AS"
        ],
        "Fare": 302.07
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 121.6
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 121.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 706.41
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 702.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 358.61
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 267.66
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 679.39
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 354.31
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 2920.61
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "LX",
          "BA"
        ],
        "Fare": 1282.21
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-03-04T00:00:00",
      "ReturnDateTime": "2018-03-08T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-03-04&returndate=2018-03-08&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 230.59
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 230.59
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 287.6
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 253.99
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 306.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 306.6
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH",
          "UA"
        ],
        "Fare": 3687.51
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "AF"
        ],
        "Fare": 1241.31
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 650.38
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 480.48
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1220.21
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 850.21
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 143.6
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 143.6
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 281.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 281.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH"
        ],
        "Fare": 2644.21
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "SQ",
          "VX"
        ],
        "Fare": 1116.01
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL",
          "AM"
        ],
        "Fare": 448.25
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AM"
        ],
        "Fare": 448.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 635.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "HA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "HA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 669.6
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 396.69
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1383.59
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 865.11
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 106.58
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 106.58
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 90.6
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 90.6
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ"
        ],
        "Fare": 1113.71
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 260.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 260.61
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 281.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 281.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 784.01
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 618.61
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 626.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 350.61
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 271.31
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS",
          "VX"
        ],
        "Fare": 133.6
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "VX"
        ],
        "Fare": 133.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 589.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU",
          "VX"
        ],
        "Fare": 479.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 220.6
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 216
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 296.61
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 722.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 672.61
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 315.25
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 315.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 126.6
      },
      "PricePerMile": 0.29,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 126.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 163.6
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 163.6
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 851.91
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 633.51
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.57
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "PricePerMile": 0.31,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 786.41
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 702.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 358.61
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 267.66
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 679.39
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 355.81
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 2960.61
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "LX"
        ],
        "Fare": 1322.21
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-03-05T00:00:00",
      "ReturnDateTime": "2018-03-09T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-03-05&returndate=2018-03-09&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 528.6
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 252.29
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 216.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 216.6
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 242.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 242.59
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 3746.51
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "AA",
          "TN"
        ],
        "Fare": 814.11
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 477.38
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 477.38
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "CZ"
        ],
        "Fare": 772.81
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 160.61
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 160.61
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 237.59
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 237.59
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH"
        ],
        "Fare": 2644.21
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "SQ",
          "VX"
        ],
        "Fare": 1116.01
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "DL",
          "AM"
        ],
        "Fare": 398.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 512.61
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "HA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "HA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 479.59
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 327.99
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 736.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 865.11
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 226.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 226.59
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 115.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 108.03
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 84.61
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 84.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 815.31
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 235.6
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 235.6
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 784.01
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 498.61
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 626.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 335.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 254.31
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 96.6
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 96.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 489.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU"
        ],
        "Fare": 454.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 188.6
      },
      "PricePerMile": 0.29,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 188.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 214.61
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 722.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "AC"
        ],
        "Fare": 672.61
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.25
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "CM"
        ],
        "Fare": 420.94
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 116.6
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 116.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "SQ"
        ],
        "Fare": 886.41
      },
      "PricePerMile": 0.06,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 513.51
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 96.6
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 96.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 786.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 573.01
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 319.91
      },
      "PricePerMile": 0.34,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 272.06
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 636.39
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 350.44
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LX",
          "UA"
        ],
        "Fare": 2960.61
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "LX"
        ],
        "Fare": 1322.21
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-03-06T00:00:00",
      "ReturnDateTime": "2018-03-10T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-03-06&returndate=2018-03-10&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 275.59
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 275.59
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 264.59
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 253.99
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 264.59
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 264.59
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "LH"
        ],
        "Fare": 1689.51
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "VS",
          "BA"
        ],
        "Fare": 685.71
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 705.38
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 480.48
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1220.21
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 675.41
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 165.61
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 165.61
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 237.59
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 237.59
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1726.71
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 804.11
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 348.25
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 348.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 512.61
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "HA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "HA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 479.59
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 342.99
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 486.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 865.11
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 231.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 231.59
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 115.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 108.03
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 87.6
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 87.6
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 773.11
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 721.98
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 235.6
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 235.6
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "SY"
        ],
        "Fare": 264.01
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 754.01
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 498.61
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 596.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 335.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 256.3
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 118.6
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 118.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 489.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "AS",
          "HU"
        ],
        "Fare": 459.71
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 188.6
      },
      "PricePerMile": 0.29,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 188.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 214.61
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 722.61
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU"
        ],
        "Fare": 454.21
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.25
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "CM"
        ],
        "Fare": 420.94
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 153.6
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 153.6
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 851.91
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 633.51
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 96.6
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 96.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 706.41
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 702.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 341.41
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 263.36
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 636.39
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 350.44
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1660.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 727.81
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-03-07T00:00:00",
      "ReturnDateTime": "2018-03-11T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-03-07&returndate=2018-03-11&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 288.6
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 273.29
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 262.61
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 253.99
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 286.6
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "SY"
        ],
        "Fare": 245.99
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL",
          "AF"
        ],
        "Fare": 1729.51
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 804.68
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 477.38
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 413.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1180.21
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 668.21
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 170.6
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 170.6
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1766.71
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 794.11
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 348.25
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 348.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CX"
        ],
        "Fare": 637.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 605.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 562.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 342.99
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 380.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 835.11
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 120.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 108.03
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 90.6
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 90.6
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 773.11
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 721.98
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 260.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 260.61
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 754.01
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "NH"
        ],
        "Fare": 590.01
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2030.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 596.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 266.61
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 266.61
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 126.6
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 126.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 489.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU"
        ],
        "Fare": 454.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 196.6
      },
      "PricePerMile": 0.3,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 196.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 252.61
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 697.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "AC"
        ],
        "Fare": 672.61
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.25
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "CM"
        ],
        "Fare": 420.94
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 136.59
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 136.59
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "SQ"
        ],
        "Fare": 845.41
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 633.51
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 96.6
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 96.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 676.41
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 676.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 403.76
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 267.66
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 609.51
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 357.31
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1700.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 717.81
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-03-08T00:00:00",
      "ReturnDateTime": "2018-03-12T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-03-08&returndate=2018-03-12&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 275.6
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 275.6
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 264.59
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 249.3
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 264.59
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 264.59
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL",
          "AF"
        ],
        "Fare": 1689.51
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "VS",
          "BA"
        ],
        "Fare": 685.71
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 705.38
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 479.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "LH"
        ],
        "Fare": 708.81
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 165.6
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 165.6
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH",
          "UA"
        ],
        "Fare": 1726.71
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 804.11
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "DL",
          "AM"
        ],
        "Fare": 348.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 632.61
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "HA",
          "UA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "HA",
          "UA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 562.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 342.99
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 481.61
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 1055.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 865.11
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 231.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 231.59
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 115.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 108.03
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 87.6
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 87.6
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 773.11
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 721.98
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 235.6
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 235.6
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 844.01
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 618.61
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 676.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 340.61
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 269.01
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 118.6
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 118.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 489.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "HU",
          "AS"
        ],
        "Fare": 479.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 188.6
      },
      "PricePerMile": 0.29,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 188.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 252.61
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 722.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 672.61
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.25
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "CM"
        ],
        "Fare": 420.94
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 153.6
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 153.6
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "SQ"
        ],
        "Fare": 883.91
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 633.51
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 96.6
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 96.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 786.41
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "AC",
          "HX"
        ],
        "Fare": 751.21
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 319.91
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 263.36
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 609.51
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 350.44
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1660.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 727.81
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-03-09T00:00:00",
      "ReturnDateTime": "2018-03-13T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-03-09&returndate=2018-03-13&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 190.58
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 190.58
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 216.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 216.6
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 242.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 242.59
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL",
          "AF"
        ],
        "Fare": 3746.51
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 804.68
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 650.38
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 478.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1170.21
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AC",
          "UA"
        ],
        "Fare": 671.81
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 160.6
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 160.6
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH"
        ],
        "Fare": 2644.21
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 804.11
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL",
          "AM"
        ],
        "Fare": 348.25
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "DL",
          "AM"
        ],
        "Fare": 348.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CX"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 635.41
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "HA",
          "UA"
        ],
        "Fare": 437
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "HA",
          "UA"
        ],
        "Fare": 437
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 562.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 327.99
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 360.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 1055.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 865.11
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 226.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 226.59
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 106.58
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 106.58
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 84.61
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 84.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 721.98
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 235.6
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 235.6
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 784.01
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 618.61
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 626.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 246.61
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 246.61
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 96.6
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 96.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 489.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU",
          "VX"
        ],
        "Fare": 479.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 188.6
      },
      "PricePerMile": 0.29,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 188.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 252.61
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 722.61
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "AS",
          "HU"
        ],
        "Fare": 459.71
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 308.25
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 308.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 851.91
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 633.51
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 96.6
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 96.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 786.41
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "AC",
          "KA"
        ],
        "Fare": 762.71
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 319.91
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 263.36
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 609.51
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 348.94
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2960.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 727.81
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-03-10T00:00:00",
      "ReturnDateTime": "2018-03-14T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-03-10&returndate=2018-03-14&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 528.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 306.02
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 287.6
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 253.99
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 286.6
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "SY",
          "VX"
        ],
        "Fare": 266.3
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH",
          "UA"
        ],
        "Fare": 3687.51
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "AF",
          "BA"
        ],
        "Fare": 1251.31
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 650.38
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 413.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1220.21
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "CZ"
        ],
        "Fare": 742.81
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 170.6
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 170.6
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH"
        ],
        "Fare": 2604.21
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "B6",
          "LO"
        ],
        "Fare": 918.31
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 402.75
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 512.61
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "HA",
          "VX"
        ],
        "Fare": 478
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "HA",
          "VX"
        ],
        "Fare": 478
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 562.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 342.99
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1408.59
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 865.11
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 110.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 108.03
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 90.6
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 90.6
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ"
        ],
        "Fare": 1123.71
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 260.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 258.31
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 754.01
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 498.61
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 596.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 350.61
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 276.01
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX",
          "AS"
        ],
        "Fare": 133.6
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "AS"
        ],
        "Fare": 133.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 489.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU"
        ],
        "Fare": 454.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 196.6
      },
      "PricePerMile": 0.3,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 196.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 252.61
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 722.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 676.21
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 308.25
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 308.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "CM"
        ],
        "Fare": 420.94
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 116.6
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 116.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA",
          "AS"
        ],
        "Fare": 163.6
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "AA",
          "AS"
        ],
        "Fare": 163.6
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 851.91
      },
      "PricePerMile": 0.06,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 513.51
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 96.6
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 96.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 706.41
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 702.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 403.76
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 267.66
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 566.51
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 357.31
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2920.61
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "LX"
        ],
        "Fare": 1332.21
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-03-11T00:00:00",
      "ReturnDateTime": "2018-03-15T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-03-11&returndate=2018-03-15&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 240.59
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 240.59
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 287.6
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 253.99
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 286.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 286.6
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH",
          "UA"
        ],
        "Fare": 3687.51
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "BA",
          "AF"
        ],
        "Fare": 1291.31
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 650.38
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 480.48
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1170.21
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "CZ"
        ],
        "Fare": 772.81
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 170.6
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 170.6
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH"
        ],
        "Fare": 2644.21
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "SQ"
        ],
        "Fare": 1116.01
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AM"
        ],
        "Fare": 398.25
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 344.85
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CX"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 512.61
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "HA",
          "VX"
        ],
        "Fare": 503
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "HA",
          "VX"
        ],
        "Fare": 503
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 562.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 342.99
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1403.59
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 865.11
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 110.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 108.03
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 90.6
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 90.6
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ"
        ],
        "Fare": 1163.71
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 260.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 258.31
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 784.01
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 498.61
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 626.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 350.61
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 276.01
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 133.6
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 133.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 489.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU",
          "VX"
        ],
        "Fare": 479.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 196.6
      },
      "PricePerMile": 0.3,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 196.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 252.61
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 722.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "CZ"
        ],
        "Fare": 661.41
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.25
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 163.6
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 163.6
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 851.91
      },
      "PricePerMile": 0.06,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 513.51
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 96.6
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 96.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 786.41
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 702.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 358.61
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 267.66
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 566.51
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 355.81
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2960.61
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "LX"
        ],
        "Fare": 1372.21
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-03-12T00:00:00",
      "ReturnDateTime": "2018-03-16T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-03-12&returndate=2018-03-16&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 528.6
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "F9"
        ],
        "Fare": 262.3
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 229.59
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 229.59
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 264.59
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 264.59
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AF"
        ],
        "Fare": 3746.51
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "BA"
        ],
        "Fare": 1291.31
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 705.38
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 478.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "CZ"
        ],
        "Fare": 742.81
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 160.61
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 160.61
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH"
        ],
        "Fare": 2644.21
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "SQ"
        ],
        "Fare": 1116.01
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 398.25
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 344.85
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 512.61
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "HA"
        ],
        "Fare": 503
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "HA"
        ],
        "Fare": 503
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 562.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 342.99
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 736.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "OZ"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 865.11
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 226.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 226.59
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 115.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 108.03
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 87.61
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 87.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": "N/A",
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 815.31
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 235.6
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 235.6
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 784.01
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 498.61
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 676.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 246.61
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 246.61
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 96.6
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 96.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 489.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU"
        ],
        "Fare": 454.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 180.61
      },
      "PricePerMile": 0.28,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 180.61
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 252.61
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 722.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "AC"
        ],
        "Fare": 672.61
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.25
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "CM"
        ],
        "Fare": 420.94
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 116.6
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 116.6
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "SQ"
        ],
        "Fare": 883.91
      },
      "PricePerMile": 0.06,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 513.51
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 96.6
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 96.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 786.41
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 573.01
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 319.91
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 263.36
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 566.51
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 351.94
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2960.61
      },
      "PricePerMile": 0.24,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "NZ",
          "LX"
        ],
        "Fare": 1372.21
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-03-13T00:00:00",
      "ReturnDateTime": "2018-03-17T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-03-13&returndate=2018-03-17&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 275.59
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 275.59
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 264.59
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 249.3
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 264.59
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 264.59
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH",
          "UA"
        ],
        "Fare": 1689.51
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 804.68
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 650.38
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 413.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1220.21
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "LX"
        ],
        "Fare": 688.81
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 165.61
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 165.61
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1626.71
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 804.11
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AM",
          "DL"
        ],
        "Fare": 334.25
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AM",
          "DL"
        ],
        "Fare": 334.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CX"
        ],
        "Fare": 687.41
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 512.61
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "HA"
        ],
        "Fare": 503
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "UA",
          "HA"
        ],
        "Fare": 503
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 562.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 342.99
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 486.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "OZ"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 865.11
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 231.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 231.59
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 115.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 108.03
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 87.61
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 87.61
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 773.11
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 721.98
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 235.6
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 235.6
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 754.01
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 498.61
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2130.31
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 646.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "VX"
        ],
        "Fare": 340.61
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 269.01
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 118.6
      },
      "PricePerMile": 0.22,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 118.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 489.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "VX",
          "AS",
          "HU"
        ],
        "Fare": 459.71
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 188.6
      },
      "PricePerMile": 0.29,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 188.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 252.61
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 722.61
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU"
        ],
        "Fare": 454.21
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.25
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "CM"
        ],
        "Fare": 420.94
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 153.6
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 153.6
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 851.91
      },
      "PricePerMile": 0.06,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 513.51
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 96.6
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 96.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 706.41
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "KE"
        ],
        "Fare": 702.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 319.91
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 263.36
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 566.51
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 350.44
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1560.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 727.81
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-03-14T00:00:00",
      "ReturnDateTime": "2018-03-18T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-03-14&returndate=2018-03-18&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 288.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 288.6
      },
      "DestinationLocation": "ATL",
      "Distance": 2135,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ATL&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 262.61
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 253.99
      },
      "DestinationLocation": "AUS",
      "Distance": 1497,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=AUS&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 286.6
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "SY"
        ],
        "Fare": 245.99
      },
      "DestinationLocation": "BOS",
      "Distance": 2698,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=BOS&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH",
          "UA"
        ],
        "Fare": 1729.51
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 804.68
      },
      "DestinationLocation": "CDG",
      "Distance": 5573,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CDG&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 944.38
      },
      "PricePerMile": 0.17,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 413.98
      },
      "DestinationLocation": "CUN",
      "Distance": 2404,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=CUN&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AI"
        ],
        "Fare": 1180.21
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AC",
          "UA"
        ],
        "Fare": 668.21
      },
      "DestinationLocation": "DEL",
      "Distance": 9935,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEL&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 170.6
      },
      "PricePerMile": 0.18,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 170.6
      },
      "DestinationLocation": "DEN",
      "Distance": 954,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DEN&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 238.59
      },
      "DestinationLocation": "DFW",
      "Distance": 1468,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=DFW&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "EWR",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=EWR&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "FLL",
      "Distance": 2580,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FLL&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA",
          "LH"
        ],
        "Fare": 1666.71
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 794.11
      },
      "DestinationLocation": "FRA",
      "Distance": 5685,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=FRA&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 334.25
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 334.25
      },
      "DestinationLocation": "GDL",
      "Distance": 1644,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=GDL&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 637.41
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 512.61
      },
      "DestinationLocation": "HKG",
      "Distance": 6915,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HKG&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 519
      },
      "PricePerMile": 0.21,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 507.67
      },
      "DestinationLocation": "HNL",
      "Distance": 2397,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=HNL&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 562.6
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 342.99
      },
      "DestinationLocation": "IAD",
      "Distance": 2426,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAD&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 380.6
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "IAH",
      "Distance": 1641,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=IAH&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "OZ"
        ],
        "Fare": 955.91
      },
      "PricePerMile": 0.15,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 835.11
      },
      "DestinationLocation": "ICN",
      "Distance": 5636,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ICN&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 236.59
      },
      "PricePerMile": 0.09,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 236.59
      },
      "DestinationLocation": "JFK",
      "Distance": 2572,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=JFK&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 120.6
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "B6"
        ],
        "Fare": 108.03
      },
      "DestinationLocation": "LAS",
      "Distance": 424,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAS&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 90.6
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 90.6
      },
      "DestinationLocation": "LAX",
      "Distance": 339,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LAX&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "LH"
        ],
        "Fare": 790.61
      },
      "PricePerMile": 0.13,
      "LowestFare": {
        "AirlineCodes": [
          "EI"
        ],
        "Fare": 721.98
      },
      "DestinationLocation": "LHR",
      "Distance": 5362,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=LHR&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 260.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 260.61
      },
      "DestinationLocation": "MCO",
      "Distance": 2438,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MCO&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 276.6
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 276.6
      },
      "DestinationLocation": "MIA",
      "Distance": 2582,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MIA&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 754.01
      },
      "PricePerMile": 0.07,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 498.61
      },
      "DestinationLocation": "MNL",
      "Distance": 6978,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=MNL&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 2030.31
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "PR"
        ],
        "Fare": 596.71
      },
      "DestinationLocation": "NRT",
      "Distance": 5130,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=NRT&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 266.61
      },
      "PricePerMile": 0.14,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 266.61
      },
      "DestinationLocation": "ORD",
      "Distance": 1847,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ORD&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 126.6
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 126.6
      },
      "DestinationLocation": "PDX",
      "Distance": 550,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PDX&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 489.61
      },
      "PricePerMile": 0.08,
      "LowestFare": {
        "AirlineCodes": [
          "AS",
          "HU"
        ],
        "Fare": 454.21
      },
      "DestinationLocation": "PEK",
      "Distance": 5898,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PEK&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 196.6
      },
      "PricePerMile": 0.3,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 196.6
      },
      "DestinationLocation": "PHX",
      "Distance": 652,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PHX&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 252.61
      },
      "PricePerMile": 0.25,
      "LowestFare": {
        "AirlineCodes": [
          "AA"
        ],
        "Fare": 108.01
      },
      "DestinationLocation": "PSP",
      "Distance": 429,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PSP&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 697.61
      },
      "PricePerMile": 0.11,
      "LowestFare": {
        "AirlineCodes": [
          "AC",
          "UA"
        ],
        "Fare": 672.61
      },
      "DestinationLocation": "PVG",
      "Distance": 6146,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVG&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.25
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 308.25
      },
      "DestinationLocation": "PVR",
      "Distance": 1557,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=PVR&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AV"
        ],
        "Fare": 428.44
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "CM"
        ],
        "Fare": 420.94
      },
      "DestinationLocation": "SAL",
      "Distance": 2627,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAL&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "PricePerMile": 0.27,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 116.6
      },
      "DestinationLocation": "SAN",
      "Distance": 436,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SAN&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 136.59
      },
      "PricePerMile": 0.2,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 136.59
      },
      "DestinationLocation": "SEA",
      "Distance": 679,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SEA&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 801.91
      },
      "PricePerMile": 0.06,
      "LowestFare": {
        "AirlineCodes": [
          "MU"
        ],
        "Fare": 513.51
      },
      "DestinationLocation": "SIN",
      "Distance": 8442,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SIN&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "PricePerMile": 0.23,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 292.57
      },
      "DestinationLocation": "SJD",
      "Distance": 1257,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SJD&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 96.6
      },
      "PricePerMile": 0.26,
      "LowestFare": {
        "AirlineCodes": [
          "AS"
        ],
        "Fare": 96.6
      },
      "DestinationLocation": "SNA",
      "Distance": 373,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=SNA&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 676.41
      },
      "PricePerMile": 0.1,
      "LowestFare": {
        "AirlineCodes": [
          "CI"
        ],
        "Fare": 676.41
      },
      "DestinationLocation": "TPE",
      "Distance": 6450,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=TPE&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC",
          "UA"
        ],
        "Fare": 358.61
      },
      "PricePerMile": 0.33,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 267.66
      },
      "DestinationLocation": "YVR",
      "Distance": 800,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YVR&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "AC"
        ],
        "Fare": 523.51
      },
      "PricePerMile": 0.16,
      "LowestFare": {
        "AirlineCodes": [
          "DL"
        ],
        "Fare": 357.31
      },
      "DestinationLocation": "YYZ",
      "Distance": 2245,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=YYZ&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    },
    {
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
        "AirlineCodes": [
          "UA"
        ],
        "Fare": 1600.61
      },
      "PricePerMile": 0.12,
      "LowestFare": {
        "AirlineCodes": [
          "TK"
        ],
        "Fare": 717.81
      },
      "DestinationLocation": "ZRH",
      "Distance": 5826,
      "DepartureDateTime": "2018-03-15T00:00:00",
      "ReturnDateTime": "2018-03-19T00:00:00",
      "Links": [
        {
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=SFO&destination=ZRH&departuredate=2018-03-15&returndate=2018-03-19&pointofsalecountry=US"
        }
      ]
    }
  ],
  "UsageNote": "The response may be very large when you request a wide range of dates in earliestdeparturedate and latestdeparturedate. Please consider narrowing this date range to retrieve fewer results.",
  "Links": [
    {
      "rel": "self",
      "href": "https://api.test.sabre.com/v2/shop/flights/fares?origin=SFO&lengthofstay=4"
    },
    {
      "rel": "linkTemplate",
      "href": "https://api.test.sabre.com/v2/shop/flights/fares?origin=<origin>&departuredate=<departuredate>&returndate=<returndate>&location=<location>&theme=<theme>&minfare=<minfare>&maxfare=<maxfare>&lengthofstay=<lengthofstay>&earliestdeparturedate=<earliestdeparturedate>&latestdeparturedate=<latestdeparturedate>&pointofsalecountry=<pointofsalecountry>&region=<region>&topdestinations=<topdestinations>&pricepermile=<pricepermile>"
    }
  ]
}
  console.log(flights);
    if (this.map.loaded()) {
      const budget = this.state.budget;
      console.log(this.state)
      console.log("MAP LOADING");
      const dateFilter = this.state.date.dayOfYear();
      // const iataCodes = flights.FareInfo.map(a => a.DestinationLocation);
      let iataCodes = [];
      let total_airports = [];
      flights.FareInfo.forEach(function(a){
        if (moment(a.DepartureDateTime).dayOfYear() == dateFilter) {
          if (a.LowestFare.Fare < budget) {
            iataCodes.push(a.DestinationLocation);
            if (total_airports.indexOf(a.DestinationLocation) == -1) {
              total_airports.push(a.DestinationLocation);
            }
          }
        }
      });
      console.log(total_airports);
        
      // const iataCodes = flights.FareInfo.map((a) => {
      //   if (moment(a.DepartureDateTime).dayOfYear() == dateFilter) {
      //     console.log(moment(a.DepartureDateTime).dayOfYear());
      //     console.log(dateFilter);
      //     return a.DestinationLocation;
      //   } else {
      //     return '';
      //   }
      // });
      console.log(iataCodes);

      this.map.setFilter('airports', ['in', 'IATA'].concat(iataCodes.map(function(feature) {
        return feature;
      })));


    };
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
