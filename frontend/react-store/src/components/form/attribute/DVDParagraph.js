import React, { Component } from 'react';

export class DVDParagraph extends Component {
  render() {
    const attribute = 'MB';
    return (
      <p>
        <span className='capital'>{this.props.lastKey}</span>:{' '}
        <span>{this.props.lastValue}</span>
        <span> {attribute}</span>
      </p>
    );
  }
}

export default DVDParagraph;
