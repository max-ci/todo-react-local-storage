import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EditCategoryModal extends Component {

  constructor(props) {
    super(props);

    this.closeModalEdit = this.closeModalEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  closeModalEdit() {
    this.props.closeModalEdit();
  }

  onSubmit(event) {
    event.preventDefault();
    if(this.refs.name.value === '') {
      this.props.showError('Category name can\'t be empty');
      return false;
    }
    this.props.onEdit(this.props.id, this.refs.name.value);
  }

  render() {
    return (
      <Modal isOpen={this.props.modalEdit} toggle={this.closeModalEdit} className={this.props.className} centered={true}>
        <ModalHeader toggle={this.closeModal}>Edit category</ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <input type="text" className="form-control" ref="name" defaultValue={this.props.name} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.closeModalEdit}>Close</Button>
            <Button type="submit" color="primary">Edit</Button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }

}

export default EditCategoryModal;
