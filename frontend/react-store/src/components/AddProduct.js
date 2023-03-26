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
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
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

  async handlePostProduct(data) {
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
  }

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

  updateState = (name, value) => {
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
