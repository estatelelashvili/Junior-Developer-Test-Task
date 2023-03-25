import React, { Component, Fragment } from 'react';

export class FormFields extends Component {
  render() {
    return (
      <Fragment>
        <div className='product-field'>
          <label>SKU</label>
          <input
            type='text'
            name='sku'
            id='sku'
            value={this.props.state.sku}
            onChange={this.props.onHandleInputChange}
            required
          />
        </div>
        <div className='product-field'>
          <label>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            value={this.props.state.name}
            onChange={this.props.onHandleInputChange}
            required
          />
        </div>
        <div className='product-field'>
          <label>Price ($)</label>
          <input
            type='number'
            min='0'
            step='0.01'
            name='price'
            id='price'
            value={this.props.state.price}
            onChange={this.props.onHandleInputChange}
            required
          />
        </div>
      </Fragment>
    );
  }
}

export default FormFields;
