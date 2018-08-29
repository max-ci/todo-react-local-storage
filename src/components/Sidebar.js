import React, { Component } from 'react';
import './Sidebar.css';
import Categories from './Categories';
import logo from './../images/logo.png';

class Sidebar extends Component {

  constructor(props) {
    super(props);

    let categories = JSON.parse(localStorage.getItem('categories'));
    if(categories === null) {
      categories = [];
    }
    let tasks = JSON.parse(localStorage.getItem('categories'));
    if(tasks === null) {
      tasks = [];
    }
    this.state = {
      active: true,
      categories: categories,
      activeCategory: null,
      tasks: tasks
    }

    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    this.handleEditCategory = this.handleEditCategory.bind(this);
    this.showError = this.showError.bind(this);
  }

  handleAddCategory(name) {
    let categories = this.state.categories;
    categories.push({
      id: Math.floor((Math.random() * 10000) + 1),
      title: name
    });
    this.setState({
      categories: categories
    });
    localStorage.setItem('categories', JSON.stringify(categories));
  }

  handleDeleteCategory(id) {
    let categories = this.state.categories;
    let index = categories.findIndex(x => x.id === id);
    categories.splice(index, 1);
    this.setState({
      categories: categories
    });
    localStorage.setItem('categories', JSON.stringify(categories));
  }

  handleEditCategory(id, name) {
    let categories = this.state.categories;
    let index = categories.findIndex(x => x.id === id);
    categories[index].title = name;
    this.setState({
      categories: categories
    });
    localStorage.setItem('categories', JSON.stringify(categories));
  }

  showError(content) {
    this.props.showError(content);
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-logo-wrapper">
          <img src={logo} className="sidebar-logo" alt="Todo App" />
        </div>
        <Categories categories={this.state.categories} onDelete={this.handleDeleteCategory} onAdd={this.handleAddCategory} onEdit={this.handleEditCategory} showError={this.showError} />
      </div>
    );
  }

}

export default Sidebar;
