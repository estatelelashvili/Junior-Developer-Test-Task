import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export class HeaderAdd extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <h1>Add Product</h1>
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
        <hr />
      </Fragment>
    );
  }
}

export default HeaderAdd;
