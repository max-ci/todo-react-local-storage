import React, { Component } from 'react';
import './AddCategory.css';

class AddCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryName: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { animate } = this.props
    const { animate: wasComposing } = prevProps

    if (!wasComposing && animate) {
      this.refs.name.focus()
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.refs.name.value === '') {
      this.props.showError('Category name can\'t be empty');
      return;
    }
    this.props.onAdd(this.refs.name.value);
    this.refs.name.value = '';
  }

  render() {
    const animate = this.props.animate ? 'add-category-input-animation' : '';
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="input-group add-new-category">
          <input type="text" className={'form-control ' + animate} placeholder="New category..." ref="name"  />
          <div className="input-group-append">
            <button type="submit" className="input-group-text add-new-category-btn">+</button>
          </div>
        </div>
      </form>
    );
  }
}

export default AddCategory;
