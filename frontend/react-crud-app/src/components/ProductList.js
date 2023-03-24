import React, { Component, Fragment } from 'react';
import HeaderList from './headers/HeaderList';
import Product from './Product';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedProducts: [],
    };
    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleMassDelete = this.handleMassDelete.bind(this);
  }

  async handleMassDelete() {
    const { selectedProducts } = this.state;
    const deletePromises = selectedProducts.map((product) =>
      this.handleDeleteProduct(product)
    );
    try {
      await Promise.all(deletePromises);
      await this.fetchProducts();
      this.setState({ selectedProducts: [] }, () => {});
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  async handleDeleteProduct(product) {
    product._METHOD = 'DELETE';
    return fetch('/api/endpoint.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-HTTP-Method-Override': 'DELETE',
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  async fetchProducts() {
    try {
      const response = await fetch('/api/endpoint.php');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (Array.isArray(data) && data.length === 0) {
        this.setState({ products: [] });
      } else {
        this.setState({ products: data });
      }
    } catch (error) {
      console.error(error);
      this.setState({ products: [] });
    }
  }

  componentDidMount() {
    this.fetchProducts();
  }

  handleCheckBoxChange = (event, product) => {
    const { selectedProducts } = this.state;
    event.target.checked && selectedProducts.push(product);
    this.setState({ selectedProducts });
  };

  render() {
    const { products } = this.state;

    return (
      <Fragment>
        <HeaderList onHandleMassDelete={this.handleMassDelete} />
        <hr />
        <div className='product-grid-view'>
          {products &&
            products.map((product, index) => (
              <Product
                key={index}
                product={product}
                handleFetchProducts={this.fetchProducts}
                onHandleCheckBoxChange={this.handleCheckBoxChange}
                onHandleDeleteProduct={this.handleDeleteProduct}
              />
            ))}
        </div>
      </Fragment>
    );
  }
}

export default ProductList;
