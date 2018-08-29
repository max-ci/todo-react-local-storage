import React, { Component } from 'react';
import './InputError.css';

class InputError extends Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.closeError();
  }

  render() {
    let content = '';
    if(this.props.error && this.props.error.content) {
      content = this.props.error.content;
    }
    let active = '';
    if(this.props.error && this.props.error.active) {
      active = 'active';
    }
    return (
      <div className={"error " + active}>
        <span>{content}</span>
        <button type="button" aria-label="Close" onClick={this.onClick}>
          <span aria-hidden="true">
            <i className="fas fa-times" />
          </span>
        </button>
      </div>
    );
  }
}

export default InputError;
