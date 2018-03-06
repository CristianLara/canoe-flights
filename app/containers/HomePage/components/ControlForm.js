import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'underscore';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import Autocomplete from 'react-autocomplete';


// Using an ES6 transpiler like Babel
import Slider from 'react-rangeslider';

// To include the default styles
import 'react-rangeslider/lib/index.css';

// Use the SabreDevStudioFlight API
import SabreDevStudioFlight from '../api/sabre-flight';

const FormContainer = styled.div`
  padding: 0px 20px 0px 20px;

  .form-control {
      background-color: rgb(60, 60, 60);
      border-color: rgba(60, 60, 60, 0);
      color: white;
      -webkit-appearance:none;
  }
`;

const DarkButton = styled(Button)`
    color: white !important;
    background-color: rgb(70, 70, 70);
    border-color: rgba(70, 70, 70, 0);

    :hover {
        color: white !important;
        background-color: rgb(90, 90, 90);
        border-color: rgba(70, 70, 70, 0);
    }

`;


const FormattedLabel = styled(ControlLabel)`
    color: white !important;
`;

const PaddedFormControl = styled(FormControl)`
    margin-bottom: 8px;
`;

class ControlForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departureAirport: 'SFO',
      duration: 1,
      budget: 500,
      isLoading: false,
    };

    this.handleDepartureAirportChange = this.handleDepartureAirportChange.bind(this);
    this.handleTripDurationChange = this.handleTripDurationChange.bind(this);
    this.handleBudgetChange = this.handleBudgetChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getValidationState() {
    const length = this.state.departureAirport.length;
    if (length > 0) {
      if (airportCodes.includes(this.state.departureAirport.toUpperCase())) return 'success';
      return 'error';
    }
    return null;
  }

  handleDepartureAirportChange(event) {
    this.setState({
      departureAirport: event.target.value.toUpperCase(),
    });
    this.handleSubmit();
  }

  handleTripDurationChange(event) {
    this.setState({
      duration: event.target.value,
    });
    this.handleSubmit();
  }

  handleBudgetChange(value) {
    this.setState({
      budget: value,
    });
    this.props.updateBudget(value);
    this.handleSubmit();
  }

  handleSubmit(event) {
    // event.preventDefault();

    const sabreDevStudio = new SabreDevStudioFlight({
      client_id: 'V1:ah4wtsaa8y09idu8:DEVCENTER:EXT',
      client_secret: 'd4InUP8r',
      uri: 'https://api.test.sabre.com',
    });

    const options = {
      origin: this.state.departureAirport,
      lengthofstay: this.state.duration,
      // maxfare: this.state.budget,
    };

    const parent = this;
    const updateFlights = this.props.updateFlights;

    const callback = function (error, data) {
      parent.setState({ isLoading: false });
      if (error) {
        console.log(error);
      } else {
        const parsedData = JSON.parse(data);
        updateFlights(parsedData);
      }
    };

    this.setState({ isLoading: true });
    sabreDevStudio.destination_finder(options, callback);
  }

  render() {
    const { budget, departureAirport, duration, isLoading } = this.state;

    return (
      <FormContainer>
        <form onSubmit={this.handleSubmit}>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <FormattedLabel>Departure Airport</FormattedLabel>
            <Autocomplete
              items={airportCodes}
              inputProps={{ className: 'form-control', placeholder: 'SFO' }}
              shouldItemRender={(item, value) => {
                if (value === '') {
                  return false;
                }
                return item.toLowerCase().indexOf(value.toLowerCase()) > -1;
              }}
              getItemValue={(item) => item}
              renderItem={(item, highlighted) => (
                <div
                  key={item.id}
                  style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                >
                  {item}
                </div>
              )}
              value={departureAirport}
              onChange={this.handleDepartureAirportChange}
              onSelect={(val) => this.setState({ departureAirport: val })}
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
              { _.range(2, 16).map((value) => <option key={value} value={value}>{value} days</option>) }
            </PaddedFormControl>

            <FormattedLabel>Budget: ${budget}</FormattedLabel>
            <div>
              <Slider
                min={50}
                max={2000}
                step={10}
                value={budget}
                orientation="horizontal"
                onChange={this.handleBudgetChange}
              />
            </div>
          </FormGroup>
        </form>
      </FormContainer>
    );
  }
}

ControlForm.propTypes = {
  updateBudget: PropTypes.func.isRequired,
  updateFlights: PropTypes.func.isRequired,
};

const airportCodes = ['POM', 'KEF', 'YEG', 'YHZ', 'YMX', 'YOW', 'YUL', 'YVR', 'YWG', 'YYC', 'YYJ', 'YYT', 'YYZ', 'ZFA', 'ALG', 'ACC', 'ABV', 'LOS', 'TUN', 'BRU', 'CRL', 'LGG', 'SXF', 'DRS', 'FRA', 'FMO', 'HAM', 'CGN', 'DUS', 'MUC', 'NUE', 'LEJ', 'STR', 'TXL', 'HAJ', 'BRE', 'DTM', 'TLL', 'HEL', 'BFS', 'BHD', 'BHX', 'MAN', 'CWL', 'BRS', 'LPL', 'LTN', 'BOH', 'SOU', 'LGW', 'LHR', 'LBA', 'NCL', 'EMA', 'ABZ', 'GLA', 'EDI', 'NWI', 'STN', 'EXT', 'MHZ', 'FFD', 'BZZ', 'AMS', 'MST', 'EIN', 'ORK', 'DUB', 'SNN', 'BLL', 'CPH', 'AAL', 'LUX', 'BOO', 'BGO', 'OSL', 'TOS', 'TRD', 'SVG', 'GDN', 'KRK', 'KTW', 'POZ', 'WAW', 'WRO', 'GOT', 'MMX', 'LLA', 'ARN', 'RMS', 'CPT', 'DUR', 'GRJ', 'JNB', 'NCS', 'RRG', 'LUN', 'LPA', 'TFS', 'TFN', 'CMN', 'DKR', 'NKC', 'ADD', 'CAI', 'HRG', 'LXR', 'MBA', 'TIP', 'JUB', 'KRT', 'DAR', 'TIA', 'BOJ', 'SOF', 'VAR', 'LCA', 'PFO', 'AKT', 'ZAG', 'ALC', 'BCN', 'MAD', 'AGP', 'SCQ', 'BOD', 'TLS', 'MRS', 'NCE', '\\N', 'CDG', 'ORY', 'BSL', 'HER', 'SKG', 'BUD', 'BRI', 'CTA', 'PMO', 'CAG', 'MXP', 'BGY', 'TRN', 'GOA', 'LIN', 'BLQ', 'TSF', 'VRN', 'VCE', 'CIA', 'FCO', 'NAP', 'PSA', 'LJU', 'PRG', 'TLV', 'VDA', 'MLA', 'VIE', 'FAO', 'TER', 'PDL', 'OPO', 'LIS', 'SJJ', 'OTP', 'GVA', 'ZRH', 'ESB', 'ADA', 'AYT', 'GZT', 'IST', 'ADB', 'DLM', 'ERZ', 'TZX', 'BEG', 'TGD', 'PRN', 'BTS', 'PUJ', 'SDQ', 'KIN', 'ACA', 'GDL', 'HMO', 'MEX', 'MTY', 'PPE', 'PVR', 'SJD', 'TIJ', 'CUN', 'PTY', 'SAL', 'HAV', 'VRA', 'GCM', 'NAS', 'BZE', 'RAR', 'AKL', 'CHC', 'WLG', 'BAH', 'DMM', 'DHA', 'JED', 'MED', 'RUH', 'THR', 'SYZ', 'TBZ', 'AMM', 'KWI', 'BEY', 'AUH', 'DXB', 'SHJ', 'MCT', 'ISB', 'BSR', 'ALP', 'DAM', 'LTK', 'GUM', 'KNH', 'KHH', 'TPE', 'NRT', 'CTS', 'FUK', 'KOJ', 'ITM', 'HND', 'OKO', 'CJU', 'PUS', 'OSN', 'GMP', 'OKA', 'DNA', 'MNL', 'CGY', 'BEL', 'BSB', 'CNF', 'CWB', 'FLN', 'GIG', 'GRU', 'NAT', 'CGH', 'SSA', 'SCL', 'LTX', 'UIO', 'BOG', 'SMR', 'LIM', 'CUZ', 'MVD', 'BLA', 'CCS', 'PTP', 'SJU', 'SXM', 'ALA', 'TSE', 'FRU', 'GYD', 'KHV', 'KBP', 'SIP', 'ODS', 'LED', 'MSQ', 'ROV', 'AER', 'SVX', 'TAS', 'SVO', 'VKO', 'KZN', 'UFA', 'KUF', 'BOM', 'GOI', 'CMB', 'PNH', 'REP', 'CCU', 'HKG', 'ATQ', 'DEL', 'MFM', 'BLR', 'COK', 'CCJ', 'MAA', 'TRV', 'MLE', 'DMK', 'HKT', 'DAD', 'HAN', 'SGN', 'MDL', 'RGN', 'UPG', 'SOQ', 'BWN', 'CGK', 'KUL', 'SIN', 'BNE', 'MEL', 'ADL', 'PER', 'CBR', 'SYD', 'PEK', 'TSN', 'TYN', 'CAN', 'CSX', 'KWL', 'NNG', 'SZX', 'CGO', 'WUH', 'XIY', 'KMG', 'XMN', 'FOC', 'HGH', 'NGB', 'NKG', 'SHA', 'CKG', 'KWE', 'CTU', 'URC', 'HRB', 'DLC', 'PVG', 'FSM', 'BOS', 'SUU', 'OAK', 'ICT', 'MCI', 'MSN', 'PHX', 'BGR', 'GEG', 'SFO', 'MEM', 'DLF', 'LAX', 'CLE', 'DOV', 'CVG', 'LFT', 'EWR', 'BOI', 'DAL', 'LUF', 'END', 'EDW', 'DCA', 'TIK', 'FLL', 'SLC', 'IAH', 'ADW', 'CAE', 'HOU', 'PIT', 'MIA', 'SEA', 'CHA', 'JAN', 'IND', 'SZL', 'DLH', 'RIC', 'SHV', 'ORF', 'SAV', 'SAT', 'ROC', 'RDU', 'DAY', 'PHF', 'LTS', 'TUS', 'BAB', 'GSB', 'DTW', 'TPA', 'HIB', 'GRB', 'AGS', 'LIT', 'MGE', 'SKA', 'PAM', 'DFW', 'MLB', 'TCM', 'AUS', 'LCK', 'TYS', 'STL', 'SPS', 'ATL', 'BNA', 'DYS', 'LGA', 'TLH', 'JAX', 'IAD', 'MKE', 'PDX', 'PBI', 'FTW', 'BFI', 'HNL', 'DSM', 'SAN', 'MLU', 'SSC', 'ONT', 'CRP', 'SYR', 'MDW', 'SJC', 'DEN', 'PHL', 'SUX', 'RND', 'CMH', 'FFO', 'ANC', 'MOB', 'MCF', 'BLV', 'RSW', 'JFK', 'HMN', 'CHS', 'RNO', 'VBG', 'BHM', 'SMF', 'COS', 'BUF', 'MUO', 'BDL', 'LBB', 'ORD', 'FAI', 'CVS', 'AMA', 'BAD', 'BWI', 'TUL', 'MSP', 'MSY', 'PWM', 'OKC', 'LFI', 'SNA', 'CBM', 'GUS', 'CPR', 'VPS', 'CLT', 'LAS', 'MCO', 'WRB', 'BKK', 'NAH', 'SUB', 'ICN', 'CNX', 'DPS', 'ATH', 'NGO', 'DAB', 'RIX', 'VNO', 'EVN', 'TBS', 'EZE', 'KIX', 'PMI', 'AVL', 'GSO', 'MHT', 'SDF', 'ROA', 'LEX', 'ABQ', 'BIL', 'RFD', 'DME', 'SYX', 'GSP', 'BMI', 'GPT', 'TOL', 'FWA', 'CID', 'PIA', 'RST', 'NBO', 'SRQ', 'MLI', 'OVB', 'DVO', 'TNA', 'HSV', 'MGM', 'TRI', 'HAK', 'MBS', 'BGW', 'CRK', 'SHE', 'FKB', 'SFB', 'MWX', 'CEB', 'ERI', 'CRW', 'BJV', 'SAW', 'NTL', 'IKA', 'MHD', 'SPI', 'SGF', 'JLN', 'SBN', 'KJA', 'KGF', 'DBQ', 'HTS', 'ISE', 'KUV', 'CJJ', 'HRK', 'GRV', 'NAY', 'HET', 'WNZ', 'SKT', 'SUS', 'CKL', 'DWC', 'AFW', 'WMI', 'HRI', 'QUO', 'KNO'];

export default ControlForm;
