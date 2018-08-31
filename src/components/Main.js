import React, { Component } from 'react';
import './Main.css';
import Task from './Task';

class Main extends Component {
  constructor(props) {
    super(props);

    this.focusAddNewCategory = this.focusAddNewCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onWorking = this.onWorking.bind(this);
    this.editTaskModal = this.editTaskModal.bind(this);
    this.deleteTaskModal = this.deleteTaskModal.bind(this);
  }

  onDone(id) {
    this.props.onDone(id);
  }

  onWorking(id) {
    this.props.onWorking(id);
  }

  deleteTaskModal(data) {
    this.props.openModal(data);
  }

  editTaskModal(data) {
    this.props.openModal(data);
  }

  focusAddNewCategory() {
    this.props.onFocusAddNewCategory();
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onAdd(this.refs.content.value, this.props.activeCategory);
    this.refs.content.value = '';
  }

  render() {
    let emptyState;
    let tasks;
    let tasksHidden = 'hidden';
    const activeCategory = this.props.activeCategory;
    const categoryTasks = this.props.tasks.filter(
      task => task.categoryId === activeCategory.id
    );
    if (categoryTasks.length === 0) {
      emptyState = (
        <div className="tasks-category-empty">0 tasks in this category</div>
      );

    }
    if (categoryTasks.length > 0) {
      tasksHidden = '';
      tasks = categoryTasks.map(task => {
        return (
          <Task
            key={task.id}
            task={task}
            onDone={this.onDone}
            onWorking={this.onWorking}
            onEdit={this.editTaskModal}
            onDelete={this.deleteTaskModal}
          />
        );
      });
    }
    let content;
    if (this.props.categories.length === 0) {
      content = (
        <div
          className="categories-empty-main"
          onClick={this.focusAddNewCategory}
        >
          Add new category
        </div>
      );
    } else {
      content = (
        <div className="container-fluid">
          <div className="tasks-wrapper">
            {/* categoryName jakoś przekazać z App.js */}
            <div className="category-name">{this.props.activeCategory.name}</div>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                className="form-control mb-2"
                ref="content"
                placeholder="Task..."
              />
              <button type="submit" className="btn add-new-task-btn">
                Add new task
              </button>
            </form>
            {emptyState}
            <div className="tasks" hidden={tasksHidden}>{tasks}</div>
          </div>
        </div>
      );
    }
    return <div className="main-wrapper">{content}</div>;
  }
}

export default Main;
