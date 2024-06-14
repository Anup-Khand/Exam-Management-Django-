/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteModel = ({ deleteInfo, showModal, onDelete, onClose }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    onClose();
  };

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  const handleDelete = () => {
    onDelete();
    setShow(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Subject Name: {deleteInfo?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={() => handleDelete()}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModel;
