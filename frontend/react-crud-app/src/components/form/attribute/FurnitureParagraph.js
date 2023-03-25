import React, { Component } from 'react';

export class FurnitureParagraph extends Component {
  render() {
    return (
      <p>
        <span className='capital'>{this.props.lastKey}</span>:{' '}
        <span>{this.props.lastValue}</span>
      </p>
    );
  }
}

export default FurnitureParagraph;
