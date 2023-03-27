import React, { Component } from 'react';
import Form from './form/Form';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: '',
      name: '',
      price: '',
      type: '',
      attribute: {},
      skuError: false,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const sameSkuExists = await this.handleCheckSKU(this.state.sku);
    if (sameSkuExists) {
      this.setState({ skuError: true });
      return;
    }
    const { sku, name, price, type, attribute } = this.state;
    const data = {
      sku,
      name,
      price,
      product_type: type,
      attribute,
    };
    this.handlePostProduct(data);
  };

  fetchProducts = async () => {
    try {
      const response = await fetch('/api/endpoint.php');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (Array.isArray(data) && data.length !== 0) {
        this.setState({ products: [] });
        return data;
      } else {
        this.setState({ products: data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  handleCheckSKU = async (sku) => {
    const products = await this.fetchProducts();
    if (Array.isArray(products) && products.length !== 0) {
      return products.some((p) => p.sku === sku);
    } else {
      return false;
    }
  };

  handlePostProduct = async (data) => {
    try {
      const response = await fetch('/api/endpoint.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      response.ok && (window.location.href = '/');
    } catch (error) {
      console.error(error);
    }
  };

  handleTypeChange = (event) => {
    this.setState({
      type: event.target.value,
      attribute: {},
    });
  };

  handleInputChange = (event) => {
    this.updateState(event.target.name, event.target.value);
  };

  handleInputChangeAttributes = (event) => {
    this.updateState('attribute', {
      [event.target.name]: event.target.value,
    });
  };

  updateState = async (name, value) => {
    this.setState((prevState) => ({
      [name]:
        typeof value === 'object' ? { ...prevState[name], ...value } : value,
    }));
  };

  render() {
    return (
      <Form
        state={this.state}
        onHandleSubmit={this.handleSubmit}
        onHandleInputChange={this.handleInputChange}
        onHandleTypeChange={this.handleTypeChange}
        onHandleInputChangeAttributes={this.handleInputChangeAttributes}
      />
    );
  }
}

export default AddProduct;
