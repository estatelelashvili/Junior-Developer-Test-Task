import React, { Component, Fragment } from 'react';

export class Furniture extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <label>Height (CM) </label>
          <input
            type='number'
            name='height'
            id='height'
            onChange={this.props.onHandleInputChange}
            required
          />
        </div>
        <div>
          <label>Width (CM) </label>
          <input
            type='number'
            name='width'
            id='width'
            onChange={this.props.onHandleInputChange}
            required
          />
        </div>
        <div>
          <label>Length (CM) </label>
          <input
            type='number'
            name='length'
            id='length'
            onChange={this.props.onHandleInputChange}
            required
          />
        </div>
        <p>Please, provide dimensions in HxWxL format.</p>
      </Fragment>
    );
  }
}

export default Furniture;
