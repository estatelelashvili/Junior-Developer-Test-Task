import React, { Component } from 'react';

export class Select extends Component {
  render() {
    return (
      <div>
        <label>Type Switcher</label>
        <select
          name='type'
          id='productType'
          value={this.props.type}
          onChange={this.props.onHandleTypeChange}
          required
        >
          <option value=''>Type Switcher</option>
          <option id='DVD' value='dvd'>
            DVD
          </option>
          <option id='Book' value='book'>
            Book
          </option>
          <option id='Furniture' value='furniture'>
            Furniture
          </option>
        </select>
      </div>
    );
  }
}

export default Select;
