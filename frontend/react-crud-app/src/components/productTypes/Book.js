import React, { Component, Fragment } from 'react';

export class Book extends Component {
  render() {
    return (
      <Fragment>
        <div className='product-field'>
          <label>Weight (KG) </label>
          <input
            type='number'
            min='0.1'
            step='0.01'
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
