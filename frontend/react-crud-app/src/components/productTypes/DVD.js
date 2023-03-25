import React, { Component, Fragment } from 'react';

export class DVD extends Component {
  render() {
    return (
      <Fragment>
        <div className='product-field'>
          <label>Size (MB) </label>
          <input
            type='number'
            min='1'
            name='size'
            id='size'
            onChange={this.props.onHandleInputChangeAttributes}
            required
          />
        </div>
        <p>*Please, provide disc space in MB.</p>
      </Fragment>
    );
  }
}

export default DVD;
