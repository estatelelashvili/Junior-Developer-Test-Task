import React, { Component } from 'react';
import attributeMap from './form/attribute/AttributeMap';

class Product extends Component {
  render() {
    const [lastKey, lastValue] = Object.entries(this.props.product).pop();
    const SelectedAttributeParagraph = attributeMap[lastKey];
    return (
      <div key={this.props.product.product_id} className='product-card'>
        <input
          className='delete-checkbox'
          type='checkbox'
          onChange={(event) => {
            this.props.onHandleCheckBoxChange(event, this.props.product);
          }}
        />
        <div className='product-card-content'>
          <p>{this.props.product.sku}</p>
          <p>{this.props.product.name}</p>
          <p>
            {this.props.product.price}
            <span> $</span>
          </p>
          {SelectedAttributeParagraph && (
            <SelectedAttributeParagraph
              lastKey={lastKey}
              lastValue={lastValue}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Product;
