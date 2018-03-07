import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { AreaChart, Area, YAxis, Tooltip, ReferenceLine, ReferenceDot } from 'recharts';
import _ from 'underscore';

const DetailsPanelWrapper = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;

    height: 350px;
    width: 200px;
    margin: auto;
    z-index: 99;
    background-color: rgb(37, 37, 37);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    box-shadow: 0px 2px 5px rgb(28, 28, 28);

    transition: 1000ms ease-in-out;
    transform: translateX${(props) => _.isEmpty(props.enabled) ? '(300px)' : '(0px)'};
`;

const StyledChart = styled(AreaChart)`
    position: absolute !important;
    bottom: 0px;
`;

const Title = styled.h2`
    margin-left: 20px;
    margin-bottom: 0px;
    color: white;
    display: inline-block;
`;

const City = styled.h4`
    margin-left: 21px;
    margin-top: 0px;
    color: white;
`;

const Details = styled.h5`
    margin-left: 21px;
    margin-top: 0px;
    margin-bottom: 5px;
    color: white;
`;

const CustomTooltip = styled.div`
    padding: 5px 10px 5px 10px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-backdrop-filter: blur(1px);
    backdrop-filter: blur(1px);
    color: rgb(200, 200, 200);
`;

const CustomTooltipText = styled.p`
    padding: 0px;
    margin: 0px;
`;

const Close = styled.button`
    opacity: 0.8 !important;
    margin: 20px;
    color: white;

    :hover {
      color: rgb(200, 200, 200);
    }
`;

const AxisTick = styled.p`
    position: absolute;
    bottom: ${(props) => props.bottom};
    color: white;
    margin: 0px;
    font-size: 12px;
`;

class DetailsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flightData: [],
      highestPrice: 0,
      lowestPrice: Number.MAX_SAFE_INTEGER,
    };
  }

  componentWillReceiveProps(nextProps) {
    // create flight data
    const newFlightData = [];
    let max = 0;
    let min = Number.MAX_SAFE_INTEGER;
    nextProps.flights.forEach((flight) => {
      if (flight.properties.airport === nextProps.destination.airport) {
        const fare = flight.properties.lowestFare;
        if (fare !== undefined) {
          min = Math.min(min, fare);
          max = Math.max(max, fare);
          newFlightData.push({
            price: fare,
            dayOfYear: flight.properties.departureDate,
          });
        }
      }
    });
    this.setState({ flightData: newFlightData, highestPrice: max, lowestPrice: min });
  }

  renderToolTip(data) {
    if (data && data.payload[0]) {
      const { price, dayOfYear } = data.payload[0].payload;
      return (
        <CustomTooltip>
          <CustomTooltipText>Price: ${price}</CustomTooltipText>
          <CustomTooltipText>Date: {moment().dayOfYear(dayOfYear).format('ddd, MMM Do')}</CustomTooltipText>
        </CustomTooltip>
      );
    }
    return '';
  }

  render() {
    const { flightData, lowestPrice, highestPrice } = this.state;
    let date = '';
    if (this.props.destination.departureDate) {
      date = moment().dayOfYear(this.props.destination.departureDate).format('ddd, MMM Do');
    }
    let dateIndex = 0;
    if (this.props.destination.departureDate) {
      dateIndex = moment().dayOfYear(this.props.destination.departureDate).diff(moment(), 'days');
    }
    return (
      <DetailsPanelWrapper enabled={this.props.destination}>
        <Title>{this.props.destination.airport}</Title>
        <Close type="button" className="close" aria-label="Close" onClick={this.props.deselectAirport}>
          <span aria-hidden="true">&times;</span>
        </Close>
        <City>{this.props.destination.city}</City>
        <Details>{date}</Details>
        <Details>${this.props.destination.lowestFare}</Details>

        <AxisTick bottom="146px">-${highestPrice}</AxisTick>
        <StyledChart width={200} height={150} data={flightData} margin={{ right: 0, left: 0, bottom: 0 }}>
          <Area dot={false} type="monotone" dataKey="price" stroke="#3498db" />
          <Tooltip offset={10} content={this.renderToolTip} />
          <YAxis
            padding={{ top: 0, bottom: 0, right: 0, left: 0 }}
            domain={[0, highestPrice]}
            hide
          />
          <ReferenceLine
            y={lowestPrice}
            label={{ value: `$${lowestPrice}`, fill: 'white', fontSize: 10, position: 'bottom' }}
            stroke="white"
            strokeDasharray="4 4"
          />
          {!_.isEmpty(flightData) && <ReferenceDot x={dateIndex} y={this.props.destination.lowestFare} r={5} fill="white" stroke="none" />}
        </StyledChart>
        <AxisTick bottom="0px">-$0</AxisTick>
      </DetailsPanelWrapper>
    );
  }
}

DetailsPanel.propTypes = {
  flights: PropTypes.array.isRequired,
  destination: PropTypes.object.isRequired,
  deselectAirport: PropTypes.func.isRequired,
};

export default DetailsPanel;
