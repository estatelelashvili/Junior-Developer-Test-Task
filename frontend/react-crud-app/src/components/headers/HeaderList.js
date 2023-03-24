import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/header.scss';

export class HeaderList extends Component {
  render() {
    return (
      <header>
        <h1>Product List</h1>
        <ul>
          <li>
            <Link to='/addproduct'>
              <button>ADD</button>
            </Link>
          </li>
          <li>
            <button
              id='delete-product-btn'
              onClick={this.props.onHandleMassDelete}
            >
              MASS DELETE
            </button>
          </li>
        </ul>
      </header>
    );
  }
}

export default HeaderList;
