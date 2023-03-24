import React, { Component } from 'react';

export class Book extends Component {
  render() {
    return (
      <div>
        <label>Weight (KG) </label>
        <input
          type='number'
          name='weight'
          id='weight'
          onChange={this.props.onHandleInputChange}
          required
        />
        <p>Please, provide weight in Kg.</p>
      </div>
    );
  }
}

export default Book;
