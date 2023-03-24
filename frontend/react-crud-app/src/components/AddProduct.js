import React, { Component, Fragment } from 'react';
import Select from './form/Select';
import FormFields from './form/FormFields';
import componentMap from './productTypes/ComponentMap';
import HeaderAdd from './headers/HeaderAdd';

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
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };
  handleInputChangeAttributes = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState((prevState) => ({
      attribute: {
        ...prevState.attribute,
        [name]: value,
      },
    }));
  };

  render() {
    const { type } = this.state;
    const SelectedComponent = componentMap[type];
    return (
      <Fragment>
        <form id='product_form' onSubmit={this.handleSubmit}>
          <HeaderAdd />
          <FormFields
            state={this.state}
            onHandleInputChange={this.handleInputChange}
          />
          <Select type={type} onHandleTypeChange={this.handleTypeChange} />
          {SelectedComponent && (
            <SelectedComponent
              onHandleInputChange={this.handleInputChangeAttributes}
            />
          )}
        </form>
      </Fragment>
    );
  }
}

export default AddProduct;
