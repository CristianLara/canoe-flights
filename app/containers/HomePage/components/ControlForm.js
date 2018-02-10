import React from 'react';
import styled from 'styled-components';
import _ from 'underscore';

// Using an ES6 transpiler like Babel
import Slider from 'react-rangeslider';

// To include the default styles
import 'react-rangeslider/lib/index.css';

const FormItem = styled.div`
  display: inline-block;
  width: 100px;
  margin-left: 50px;
  margin-right: 50px;
`;

class ControlForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      volume: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBudgetChange = this.handleBudgetChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
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
    const { volume } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <FormItem>
          Home Airport:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </FormItem>

        <FormItem>
          Trip Duration:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="1">1 day</option>
            { _.range(2, 30).map((value) => <option value={value}>{value} days</option>) }
          </select>
        </FormItem>

        <FormItem>
          Budget:
          <Slider
            min={50}
            max={2000}
            step={10}
            value={volume}
            orientation="horizontal"
            onChange={this.handleBudgetChange}
          />
        </FormItem>

        <input type="submit" value="Search Flights!" />
      </form>
    );
  }
}

export default ControlForm;
