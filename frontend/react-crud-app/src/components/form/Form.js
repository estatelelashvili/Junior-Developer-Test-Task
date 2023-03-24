import React, { Component, Fragment } from 'react';
import HeaderAdd from '../headers/HeaderAdd';
import FormFields from './FormFields';
import componentMap from '../productTypes/ComponentMap';
import Select from './Select';
import '../../styles/form.scss';

export class Form extends Component {
  render() {
    const SelectedComponent = componentMap[this.props.state.type];
    return (
      <Fragment>
        <form id='product_form' onSubmit={this.props.onHandleSubmit}>
          <HeaderAdd />
          <FormFields
            state={this.props.state}
            onHandleInputChange={this.props.onHandleInputChange}
          />
          <Select
            type={this.props.state.type}
            onHandleTypeChange={this.props.onHandleTypeChange}
          />
          {SelectedComponent && (
            <SelectedComponent
              onHandleInputChangeAttributes={
                this.props.onHandleInputChangeAttributes
              }
            />
          )}
        </form>
      </Fragment>
    );
  }
}

export default Form;
