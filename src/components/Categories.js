import React, { Component } from 'react';
import './Categories.css';
import Category from './Category';
import AddCategory from './AddCategory';
import DeleteCategoryModal from './DeleteCategoryModal';
import EditCategoryModal from './EditCategoryModal';

class Categories extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalDelete: false,
      modalEdit: false,
      editId: null,
      editName: '',
      deleteId: null
    }

    this.addCategory = this.addCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.editCategory = this.editCategory.bind(this);
    this.showError = this.showError.bind(this);
    this.toggleModalDelete = this.toggleModalDelete.bind(this);
    this.closeModalDelete = this.closeModalDelete.bind(this);
    this.toggleModalEdit = this.toggleModalEdit.bind(this);
    this.closeModalEdit = this.closeModalEdit.bind(this);
  }

  addCategory(name) {
    this.props.onAdd(name);
  }

  deleteCategory(id) {
    if(this.state.modalDelete) {
      this.props.onDelete(id);
    }
    this.setState({
      deleteId: id,
      modalDelete: !this.state.modalDelete
    });
  }

  editCategory(id, name) {
    if(this.state.modalEdit) {
      this.props.onEdit(id, name);
    }
    this.setState({
      editId: id,
      editName: name,
      modalEdit: !this.state.modalEdit
    });
  }

  showError(content) {
    this.props.showError(content);
  }

  toggleModalDelete() {
    this.setState({
      modalDelete: !this.state.modalDelete
    });
  }

  closeModalDelete() {
    this.setState({
      modalDelete: false
    });
  }

  toggleModalEdit() {
    this.setState({
      modalEdit: !this.state.modal
    });
  }

  closeModalEdit() {
    this.setState({
      modalEdit: false
    });
  }

  render() {
    const categoriesLength = this.props.categories.length;
    let categories;
    if(this.props.categories) {
      categories = this.props.categories.map(category => {
        return(
          <Category key={category.id} category={category} onDelete={this.deleteCategory} onEdit={this.editCategory} showError={this.showError} />
        );
      })
    }
    return (
      <div>
        <div className="sidebar-categories-title">Categories</div>
        {!categoriesLength ? (
          <div className="sidebar-categories-empty">You don't have any categories yet. Add new category to start adding tasks.</div>
        ) : (
          <ul className="sidebar-categories">
            {categories}
          </ul>
        )}
        <AddCategory onAdd={this.addCategory} showError={this.showError} />

        <EditCategoryModal modalEdit={this.state.modalEdit} id={this.state.editId} name={this.state.editName} onEdit={this.editCategory} closeModalEdit={this.closeModalEdit} showError={this.showError}/>
        <DeleteCategoryModal modalDelete={this.state.modalDelete} id={this.state.deleteId} onDelete={this.deleteCategory} closeModalDelete={this.closeModalDelete} />
      </div>
    );
  }

}

export default Categories;
