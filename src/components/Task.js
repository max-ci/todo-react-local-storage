import React, { Component } from 'react';
//import './Task.css';

class Task extends Component {

  constructor(props) {
    super(props);

    this.deleteTaskModal = this.deleteTaskModal.bind(this);
    this.editTaskModal = this.editTaskModal.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onWorking = this.onWorking.bind(this);
  }

  deleteTaskModal() {
    this.props.onDelete({
      action: 'delete',
      type: 'task',
      id: this.props.task.id
    })
  }

  editTaskModal() {
    this.props.onEdit({
      action: 'edit',
      type: 'task',
      id: this.props.task.id,
      content: this.props.task.content
    });
  }

  onDone() {
    this.props.onDone(this.props.task.id);
  }

  onWorking() {
    this.props.onWorking(this.props.task.id);
  }

  render() {
    const done = this.props.task.done ? 'done' : '';
    const working = this.props.task.working ? 'working' : '';
    return(
      <div className={'task d-flex flex-column flex-lg-row justify-content-between align-items-lg-center ' + done + ' ' + working}>
        <div className="task-content order-last order-lg-first">{this.props.task.content}</div>
        <div className="mb-2 mb-lg-0">
          <button type="button" className="btn btn-task btn-task-done" onClick={this.onDone}>
            <i className="fas fa-check" />
          </button>
          <button type="button" className="btn btn-task btn-task-active" onClick={this.onWorking}>
            <i className="fas fa-cogs" />
          </button>
          <button type="button" className="btn btn-task btn-task-edit" onClick={this.editTaskModal}>
            <i className="fas fa-edit" />
          </button>
          <button type="button" className="btn btn-task btn-task-remove" onClick={this.deleteTaskModal}>
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
    );
  }

}

export default Task;
