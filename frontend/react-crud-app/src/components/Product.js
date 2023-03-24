import React, { Component } from 'react';

class Product extends Component {
  render() {
    const [lastKey, lastValue] = Object.entries(this.props.product).pop();
    return (
      <div key={this.props.product.product_id} className='product-card'>
        <input
          className='delete-checkbox'
          type='checkbox'
          onChange={(event) => {
            this.props.onHandleCheckBoxChange(event, this.props.product);
          }}
        />
        <p>{this.props.product.sku}</p>
        <p>{this.props.product.name}</p>
        <p>{this.props.product.price}</p>
        <p>
          <strong>{lastKey}</strong>: {lastValue}
        </p>
      </div>
    );
  }
}

export default Product;
