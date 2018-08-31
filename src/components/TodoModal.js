import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class TodoModal extends Component {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.focusInput = this.focusInput.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  closeModal() {
    this.props.closeModal();
  }

  deleteCategory() {
    this.props.onDeleteCategory(this.props.content.id);
  }

  deleteTask() {
    this.props.onDeleteTask(this.props.content.id)
  }

  onSubmit(event) {
    event.preventDefault();
    if(this.props.type === 'category') {
      this.props.onEditCategory(this.props.content.id, this.refs.content.value);
    }
    if(this.props.type === 'task') {
      this.props.onEditTask(this.props.content.id, this.refs.content.value);
    }
  }

  focusInput() {
    if(this.props.action === 'edit') {
      this.refs.content.focus();
    }
    if(this.props.action === 'delete') {
      document.addEventListener('keydown', this.confirmDelete, false);
    }
  }

  confirmDelete(event) {
    if(event.keyCode === 13) {
      if(this.props.type === 'category') {
        this.props.onDeleteCategory(this.props.content.id);
      }
      if(this.props.type === 'task') {
        this.props.onDeleteTask(this.props.content.id);
      }
    }
    document.removeEventListener('keydown', this.confirmDelete);
  }

  render() {
    let modalBody;
    let button;
    let title;
    if (this.props.action === 'delete' && this.props.type === 'category') {
      title = 'Delete category';
      modalBody = 'Are you sure? All tasks from this category will be deleted.';
      button = (
        <Button type="button" color="primary" onClick={this.deleteCategory}>
          Delete
        </Button>
      );
    }
    if (this.props.action === 'delete' && this.props.type === 'task') {
      title = 'Delete task';
      modalBody = 'Are you sure? This task will be removed permanently.';
      button = (
        <Button type="button" color="primary" onClick={this.deleteTask}>
          Delete
        </Button>
      );
    }
    if (this.props.action === 'edit' && this.props.type === 'category') {
      title = 'Edit category';
      modalBody = (
        <input
          type="text"
          className="form-control"
          ref="content"
          defaultValue={this.props.content.name}
        />
      );
      button = (
        <Button type="submit" color="primary">
          Edit
        </Button>
      );
    }
    if (this.props.action === 'edit' && this.props.type === 'task') {
      title = 'Edit task';
      modalBody = (
        <input
          type="text"
          className="form-control"
          ref="content"
          defaultValue={this.props.content.content}
        />
      );
      button = (
        <Button type="submit" color="primary">
          Edit
        </Button>
      );
    }
    return (
      <Modal
        isOpen={this.props.active}
        toggle={this.closeModal}
        centered={true}
        fade={false}
        onOpened={this.focusInput}
      >
        <form onSubmit={this.onSubmit} >
          <ModalHeader toggle={this.closeModal}>{title}</ModalHeader>
          <ModalBody>{modalBody}</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.closeModal}>
              Close
            </Button>
            {button}
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

export default TodoModal;
