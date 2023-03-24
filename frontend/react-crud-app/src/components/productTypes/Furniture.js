import React, { Component, Fragment } from 'react';
// import '../../styles/form/productTypes/furniture.scss';

export class Furniture extends Component {
  render() {
    return (
      <Fragment>
        <div className='product-field'>
          <label>Height (CM) </label>
          <input
            type='number'
            name='height'
            id='height'
            onChange={this.props.onHandleInputChangeAttributes}
            required
          />
        </div>
        <div className='product-field'>
          <label>Width (CM) </label>
          <input
            type='number'
            name='width'
            id='width'
            onChange={this.props.onHandleInputChangeAttributes}
            required
          />
        </div>
        <div className='product-field'>
          <label>Length (CM) </label>
          <input
            type='number'
            name='length'
            id='length'
            onChange={this.props.onHandleInputChangeAttributes}
            required
          />
        </div>
        <p>Please, provide dimensions in HxWxL format.</p>
      </Fragment>
    );
  }
}

export default Furniture;
