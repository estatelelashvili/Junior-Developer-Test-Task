import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class HeaderList extends Component {
  render() {
    return (
      <header>
        <h2>Product List</h2>
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
