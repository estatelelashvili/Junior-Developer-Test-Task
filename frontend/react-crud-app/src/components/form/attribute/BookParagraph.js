import React, { Component } from 'react';

export class BookParagraph extends Component {
  render() {
    const attribute = 'KG';
    return (
      <p>
        <span className='capital'>{this.props.lastKey}</span>:{' '}
        <span>{this.props.lastValue}</span>
        <span> {attribute}</span>
      </p>
    );
  }
}

export default BookParagraph;
