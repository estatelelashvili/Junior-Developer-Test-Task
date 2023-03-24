import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class HeaderAdd extends Component {
  render() {
    return (
      <header>
        <h2>Add Product</h2>
        <ul>
          <li>
            <button type='submit'>Save</button>
          </li>
          <li>
            <Link to='/'>
              <button>Cancel</button>
            </Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default HeaderAdd;
