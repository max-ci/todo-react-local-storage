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

  handleSubmit(event) {
    event.preventDefault();
    if(this.refs.name.value === '') {
      this.props.showError('Category name can\'t be empty');
    } else {
      this.setState({
        categoryName: this.refs.name.value
      }, function() {
        this.props.onAdd(this.state.categoryName);
        this.refs.name.value = '';
      });
    }
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="input-group add-new-category">
          <input type="text" className="form-control" placeholder="New category..." ref="name" />
          <div className="input-group-append">
            <button type="submit" className="input-group-text add-new-category-btn">+</button>
          </div>
        </div>
      </form>
    );
  }
}

export default AddCategory;
