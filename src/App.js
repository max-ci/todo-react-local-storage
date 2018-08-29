import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Categories from './components/Categories';
//import Tasks from './components/Tasks';
//import Modal from './components/Modal';
import InputError from './components/InputError';

class App extends Component {
  constructor(props) {
    super(props);

    let categories = JSON.parse(localStorage.getItem('categories'));
    if (categories === null) {
      categories = [];
    }
    let tasks = JSON.parse(localStorage.getItem('categories'));
    if (tasks === null) {
      tasks = [];
    }

    this.state = {
      mobileMenu: '',
      categories: categories,
      tasks: tasks,
      error: {
        active: false,
        content: ''
      }
    };

    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleEditCategory = this.handleEditCategory.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    this.handleShowError = this.handleShowError.bind(this);
    this.handleCloseError = this.handleCloseError.bind(this);
  }

  toggleMobileMenu() {
    if (this.state.mobileMenu) {
      this.setState({
        mobileMenu: ''
      });
    } else {
      this.setState({
        mobileMenu: 'active'
      });
    }
  }

  saveToLocalStorage(categories) {
    localStorage.setItem('categories', JSON.stringify(categories));
  }

  handleAddCategory(name) {
    let categories = this.state.categories;
    categories.push({
      id: Math.floor(Math.random() * 10000 + 1),
      title: name
    });
    this.setState({
      categories: categories
    });
    this.saveToLocalStorage(categories);
  }

  handleDeleteCategory(id) {
    let categories = this.state.categories;
    let index = categories.findIndex(x => x.id === id);
    categories.splice(index, 1);
    this.setState({
      categories: categories
    });
    this.saveToLocalStorage(categories);
  }

  handleEditCategory(id, name) {
    let categories = this.state.categories;
    let index = categories.findIndex(x => x.id === id);
    categories[index].title = name;
    this.setState({
      categories: categories
    });
    this.saveToLocalStorage(categories);
  }

  handleShowError(content) {
    if (!this.state.error.active) {
      setTimeout(() => {
        this.handleCloseError();
      }, 3000);
    }
    this.setState({
      error: {
        active: true,
        content: content
      }
    });
  }

  handleCloseError() {
    this.setState(prevState => ({
      error: {
        active: false,
        content: prevState.error.content
      }
    }));
  }

  render() {
    return (
      <div>
        <Header onClick={this.toggleMobileMenu} />
        <Sidebar
          categories={this.state.categories}
          showError={this.handleShowError}
          mobileMenu={this.state.mobileMenu}
        >
          <Categories
            categories={this.state.categories}
            onAdd={this.handleAddCategory}
            onEdit={this.handleEditCategory}
            onDelete={this.handleDeleteCategory}
            showError={this.handleShowError}
          />
        </Sidebar>
        {/* <Tasks /> */}
        {/* <Modal /> */}
        <InputError
          error={this.state.error}
          closeError={this.handleCloseError}
        />
      </div>
    );
  }
}

export default App;
