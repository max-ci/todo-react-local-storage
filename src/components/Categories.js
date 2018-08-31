import React, { Component } from 'react';
import './Categories.css';
import Category from './Category';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.deleteCategoryModal = this.deleteCategoryModal.bind(this);
    this.editCategoryModal = this.editCategoryModal.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }

  deleteCategoryModal(id) {
    this.props.openModal({
      action: 'delete',
      type: 'category',
      id: id
    });
  }

  editCategoryModal(id, name) {
    this.props.openModal({
      action: 'edit',
      type: 'category',
      id: id,
      name: name
    });
  }

  changeCategory(id) {
    this.props.onCategoryChange(id);
  }

  render() {
    const categoriesLength = this.props.categories.length;
    let categories;
    if (this.props.categories) {
      categories = this.props.categories.map(category => {
        return (
          <Category
            key={category.id}
            category={category}
            onDelete={this.deleteCategoryModal}
            onEdit={this.editCategoryModal}
            onCategoryChange={this.changeCategory}
          />
        );
      });
    }
    return (
      <span>
        <div className="sidebar-categories-title">Categories</div>
        {!categoriesLength ? (
          <div className="sidebar-categories-empty">
            You don't have any categories yet. Add new category to start adding
            tasks.
          </div>
        ) : (
          <ul className="sidebar-categories">{categories}</ul>
        )}
        {this.props.children}
      </span>
    );
  }
}

export default Categories;
