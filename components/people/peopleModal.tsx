import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { secureCheck } from '../../utils/secureCheck';
import PeopleModalTab from "./peopleModalTab";
import PeopleModalContent from "./peopleModalContent";

interface PeopleModalProps {
  title: string;
  tmpshow: boolean;
  close: Function;
  personId: number;
  modalType: string;
}

const PeopleModal: React.FC<PeopleModalProps> = ({ title, tmpshow, close, personId, modalType }) => {
  const [show, setShow] = useState(tmpshow);
  const [titleModal, setTitle] = useState(title);

  useEffect(() => {
    setShow(tmpshow);
    setTitle(title);
  }, [tmpshow]);

  const handleClose = () => {
    setShow(false);
    close();
  };

   return (
    <>
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      aria-labelledby="modal-absence-info"
    >
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">{titleModal}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {show && <PeopleModalContent personId={personId}
                                    modalType={modalType}
                                    handleClose={handleClose} />}
      </Modal.Body>
    </Modal>
    </>
  );
}

export default PeopleModal;
