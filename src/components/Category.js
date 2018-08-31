import React, { Component } from 'react';
import './Category.css';

class Category extends Component {

  constructor(props) {
    super(props);

    this.deleteCategoryModal = this.deleteCategoryModal.bind(this);
    this.editCategoryModal = this.editCategoryModal.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }

  deleteCategoryModal() {
    this.props.onDelete(this.props.category.id);
  }

  editCategoryModal() {
    this.props.onEdit(this.props.category.id, this.props.category.name);
  }

  changeCategory() {
    this.props.onCategoryChange(this.props.category.id)
  }

  render() {
    const activeCategory = JSON.parse(localStorage.getItem('activeCategory'));
    let active = '';
    if(activeCategory.id === this.props.category.id) {
      active = 'active';
    }
    return (
      <li className={active}>
        <button type="button" className="btn btn-category btn-category-text mr-auto" onClick={this.changeCategory}>{this.props.category.name}</button>
        <button type="button" className="btn btn-category btn-category-edit" onClick={this.editCategoryModal}><i className="fas fa-edit"></i></button>
        <button type="button" className="btn btn-category btn-category-remove" onClick={this.deleteCategoryModal}><i className="fas fa-times"></i></button>
      </li>
    );
  }

}

export default Category;
