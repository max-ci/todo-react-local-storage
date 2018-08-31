import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Categories from './components/Categories';
import AddCategory from './components/AddCategory';
import Main from './components/Main';
import TodoModal from './components/TodoModal';
import InputError from './components/InputError';
import uuid from 'uuid/v1';

class App extends Component {
  constructor(props) {
    super(props);

    let categories = JSON.parse(localStorage.getItem('categories'));
    if (categories === null) {
      categories = [];
    }
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks === null) {
      tasks = [];
    }
    let activeCategoryIndex = categories.findIndex(
      x => x.id === JSON.parse(localStorage.getItem('activeCategory')).id
    );

    this.state = {
      mobileMenu: '',
      categories: categories,
      activeCategory: categories[activeCategoryIndex],
      tasks: tasks,
      modal: {
        active: false,
        action: '',
        type: '',
        content: ''
      },
      error: {
        active: false,
        content: ''
      },
      animateAddCategoryInput: false
    };

    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.openMobileMenu = this.openMobileMenu.bind(this);
    this.closeMobileMenu = this.closeMobileMenu.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleEditCategory = this.handleEditCategory.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleShowError = this.handleShowError.bind(this);
    this.handleCloseError = this.handleCloseError.bind(this);
    this.handleFocusAddNewCategory = this.handleFocusAddNewCategory.bind(this);

    this.handleAddNewTask = this.handleAddNewTask.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleTaskDone = this.handleTaskDone.bind(this);
    this.handleTaskUndone = this.handleTaskUndone.bind(this);
    this.handleTaskWorking = this.handleTaskWorking.bind(this);
    this.handleTaskUnWorking = this.handleTaskUnWorking.bind(this);
  }

  openMobileMenu() {
    this.setState({
      mobileMenu: 'active'
    });
  }

  closeMobileMenu() {
    this.setState({
      mobileMenu: ''
    });
  }

  toggleMobileMenu() {
    if (this.state.mobileMenu) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  saveCategoriesToLocalStorage(categories) {
    localStorage.setItem('categories', JSON.stringify(categories));
  }

  saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  handleAddCategory(name) {
    let categories = this.state.categories;
    const id = uuid();
    const category = {
      id: id,
      name: name
    };
    categories.push(category);
    this.setState({
      categories: categories
    });
    this.saveCategoriesToLocalStorage(categories);
    localStorage.setItem('activeCategory', JSON.stringify(category));
    this.handleChangeCategory(id);
  }

  handleDeleteCategory(id) {
    let tasks = this.state.tasks;
    let tasksToDelete = [];
    tasks.forEach(task => {
      if(task.categoryId === id) {
        tasksToDelete.push(task.id);
      }
    });
    tasksToDelete.forEach(taskId => {
      this.handleDeleteTask(taskId);
    });

    let categories = this.state.categories;
    let index = categories.findIndex(x => x.id === id);
    categories.splice(index, 1);
    this.setState({
      categories: categories
    });
    this.saveCategoriesToLocalStorage(categories);
    this.handleCloseModal();
    if (id === this.state.activeCategory.id && categories.length) {
      this.handleChangeCategory(categories[0].id);
    }
    if(!categories.length) {
      localStorage.removeItem('activeCategory');
    }
  }

  handleEditCategory(id, name) {
    if (name === '') {
      this.handleShowError("Category name can't empty");
      return;
    }
    let categories = this.state.categories;
    let index = categories.findIndex(x => x.id === id);
    categories[index].name = name;
    this.setState({
      categories: categories
    });
    this.saveCategoriesToLocalStorage(categories);
    this.handleCloseModal();
  }

  handleChangeCategory(id) {
    const categories = this.state.categories;
    const activeCategoryIndex = categories.findIndex(x => x.id === id);
    const activeCategory = categories[activeCategoryIndex];
    localStorage.setItem('activeCategory', JSON.stringify(activeCategory));
    this.setState({
      activeCategory: activeCategory
    });
  }

  handleAddNewTask(content, category) {
    if (content === '') {
      this.handleShowError("Task can't be empty");
      return;
    }
    let tasks = this.state.tasks;
    const id = uuid();
    tasks.push({
      id: id,
      content: content,
      categoryId: category.id,
      done: false,
      working: false
    });
    this.setState({
      tasks: tasks
    });
    this.saveTasksToLocalStorage(tasks);
  }

  handleEditTask(id, content) {
    if (content === '') {
      this.handleShowError('Task can\'t be empty');
      return;
    }
    let tasks = this.state.tasks;
    let index = tasks.findIndex(x => x.id === id);
    tasks[index].content = content;
    this.setState({
      tasks: tasks
    });
    this.saveTasksToLocalStorage(tasks);
    this.handleCloseModal();
  }

  handleDeleteTask(id) {
    let tasks = this.state.tasks;
    let index = tasks.findIndex(x => x.id === id);
    tasks.splice(index, 1);
    this.setState({
      tasks: tasks
    });
    this.handleCloseModal();
    this.saveTasksToLocalStorage(tasks);
  }

  handleTaskDone(id) {
    let tasks = this.state.tasks;
    const index = tasks.findIndex(x => x.id === id);
    if (tasks[index].done) {
      this.handleTaskUndone(id);
      return;
    }
    tasks[index].done = true;
    tasks[index].working = false;
    this.setState({
      tasks: tasks
    });
    this.saveTasksToLocalStorage(tasks);
  }

  handleTaskUndone(id) {
    let tasks = this.state.tasks;
    const index = tasks.findIndex(x => x.id === id);
    tasks[index].done = false;
    tasks[index].working = false;
    this.setState({
      tasks: tasks
    });
    this.saveTasksToLocalStorage(tasks);
  }

  handleTaskWorking(id) {
    let tasks = this.state.tasks;
    const index = tasks.findIndex(x => x.id === id);
    if (tasks[index].working) {
      this.handleTaskUnWorking(id);
      return;
    }
    tasks[index].working = true;
    tasks[index].done = false;
    this.setState({
      tasks: tasks
    });
    this.saveTasksToLocalStorage(tasks);
  }

  handleTaskUnWorking(id) {
    let tasks = this.state.tasks;
    const index = tasks.findIndex(x => x.id === id);
    tasks[index].working = false;
    tasks[index].done = false;
    this.setState({
      tasks: tasks
    });
    this.saveTasksToLocalStorage(tasks);
  }

  handleOpenModal(data) {
    this.setState({
      modal: {
        active: true,
        action: data.action,
        type: data.type,
        content: {
          id: data.id,
          name: data.name,
          content: data.content
        }
      }
    });
  }

  handleCloseModal() {
    this.setState(prevState => ({
      modal: {
        active: false,
        type: prevState.modal.type,
        action: prevState.modal.action,
        content: {}
      }
    }));
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

  handleFocusAddNewCategory() {
    if (window.innerWidth < 992) {
      this.openMobileMenu();
    }
    if (!this.state.animateAddCategoryInput) {
      this.setState({
        animateAddCategoryInput: true
      });
      setTimeout(() => {
        this.setState({ animateAddCategoryInput: false });
      }, 1000);
    }
  }

  render() {
    return (
      <div>
        <Header onClick={this.toggleMobileMenu} />
        <Sidebar
          categories={this.state.categories}
          showError={this.handleShowError}
          mobileMenu={this.state.mobileMenu}
          closeMobileMenu={this.closeMobileMenu}
        >
          <Categories
            categories={this.state.categories}
            onAdd={this.handleAddCategory}
            onCategoryChange={this.handleChangeCategory}
            openModal={this.handleOpenModal}
            showError={this.handleShowError}
          >
            <AddCategory
              onAdd={this.handleAddCategory}
              showError={this.handleShowError}
              animate={this.state.animateAddCategoryInput}
            />
          </Categories>
        </Sidebar>
        <Main
          categories={this.state.categories}
          activeCategory={this.state.activeCategory}
          tasks={this.state.tasks}
          onFocusAddNewCategory={this.handleFocusAddNewCategory}
          onAdd={this.handleAddNewTask}
          onDone={this.handleTaskDone}
          onWorking={this.handleTaskWorking}
          openModal={this.handleOpenModal}
        />
        <TodoModal
          active={this.state.modal.active}
          action={this.state.modal.action}
          type={this.state.modal.type}
          content={this.state.modal.content}
          closeModal={this.handleCloseModal}
          onEditCategory={this.handleEditCategory}
          onEditTask={this.handleEditTask}
          onDeleteCategory={this.handleDeleteCategory}
          onDeleteTask={this.handleDeleteTask}
        />
        <InputError
          error={this.state.error}
          closeError={this.handleCloseError}
        />
      </div>
    );
  }
}

export default App;
