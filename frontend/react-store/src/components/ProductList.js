import React, { Component } from 'react';
import HeaderList from './header/HeaderList';
import Product from './Product';
import '../styles/product.scss';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedProducts: [],
    };
  }

  handleMassDelete = async () => {
    const { selectedProducts } = this.state;
    const deletePromises = selectedProducts.map((product) =>
      this.handleDeleteProduct(product)
    );
    try {
      await Promise.all(deletePromises);
      await this.fetchProducts();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
    this.setState({ selectedProducts: [] });
  };

  handleDeleteProduct = async (product) => {
    product._METHOD = 'DELETE';
    try {
      const response = await fetch('/api/endpoint.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-HTTP-Method-Override': 'DELETE',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  fetchProducts = async () => {
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
  };

  componentDidMount() {
    this.fetchProducts();
  }

  handleCheckBoxChange = (event, product) => {
    const { selectedProducts } = this.state;
    if (event.target.checked) {
      selectedProducts.push(product);
    } else {
      const index = selectedProducts.findIndex(
        (p) => p.product_id === product.product_id
      );
      if (index !== -1) {
        selectedProducts.splice(index, 1);
      }
    }
    this.setState({ selectedProducts });
  };

  render() {
    const { products } = this.state;
    return (
      <div className='products-container'>
        <HeaderList onHandleMassDelete={this.handleMassDelete} />
        <hr />
        <div className='product-grid-view'>
          {products &&
            products.map((product, index) => (
              <Product
                key={index}
                product={product}
                onHandleCheckBoxChange={this.handleCheckBoxChange}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
