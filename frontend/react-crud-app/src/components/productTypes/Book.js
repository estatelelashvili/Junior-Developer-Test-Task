import React, { Component, Fragment } from 'react';

export class Book extends Component {
  render() {
    return (
      <Fragment>
        <div className='product-field'>
          <label>Weight (KG) </label>
          <input
            type='number'
            name='weight'
            id='weight'
            onChange={this.props.onHandleInputChangeAttributes}
            required
          />
        </div>
        <p>*Please, provide weight in Kg.</p>
      </Fragment>
    );
  }
}

export default Book;
