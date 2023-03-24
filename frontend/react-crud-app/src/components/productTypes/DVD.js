import React, { Component } from 'react';

export class DVD extends Component {
  render() {
    return (
      <div>
        <label>Size (MB) </label>
        <input
          type='number'
          name='size'
          id='size'
          onChange={this.props.onHandleInputChangeAttributes}
          required
        />
        <p>Please, provide disc space in MB.</p>
      </div>
    );
  }
}

export default DVD;
