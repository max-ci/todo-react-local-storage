import React, { Component } from 'react';
import './Category.css';

class Category extends Component {

  constructor(props) {
    super(props);

    this.deleteCategory = this.deleteCategory.bind(this, this.props.category.id);
    this.editCategory = this.editCategory.bind(this, this.props.category.id);
  }

  deleteCategory(id) {
    this.props.onDelete(id);
  }

  editCategory(id) {
    this.props.onEdit(id, this.props.category.title);
  }

  render() {
    return (
      <li>
        <button type="button" className="btn btn-category btn-category-text mr-auto">{this.props.category.title}</button>
        <button type="button" className="btn btn-category btn-category-edit" onClick={this.editCategory}><i className="fas fa-edit"></i></button>
        <button type="button" className="btn btn-category btn-category-remove" onClick={this.deleteCategory}><i className="fas fa-times"></i></button>
      </li>
    );
  }

}

export default Category;
