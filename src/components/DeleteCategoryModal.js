import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class DeleteCategoryModal extends Component {

  constructor(props) {
    super(props);

    this.closeModalDelete = this.closeModalDelete.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  closeModalDelete() {
    this.props.closeModalDelete();
  }

  deleteCategory() {
    this.props.onDelete(this.props.id);
  }

  render() {
    return (
      <Modal isOpen={this.props.modalDelete} toggle={this.closeModalDelete} className={this.props.className} centered={true}>
        <ModalHeader toggle={this.closeModal}>Delete category</ModalHeader>
        <ModalBody>
          Are you sure? All tasks from this category will be deleted.
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.closeModalDelete}>Close</Button>
          <Button color="primary" onClick={this.deleteCategory}>Delete</Button>
        </ModalFooter>
      </Modal>
    );
  }

}

export default DeleteCategoryModal;
