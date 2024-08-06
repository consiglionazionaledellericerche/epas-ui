import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import StampingModalTab from "../stamping/stampingModalTab";
import { fetchDataStamping } from '../apiUtils';

interface StampingModalProps {
  title: string,
  tmpshow: boolean,
  close: Function,
  parameters: any
}

interface StampingModalState {
  title: string,
  show: boolean,
  data: any,
}

const StampingModal: React.FC<StampingModalProps> = ({ title, tmpshow, close, parameters }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<any>(null);
  const [titleModal, setTitle] = useState(title);
  const [categoryTab, setCategoryTab] = useState("");

  useEffect(() => {
    if (tmpshow) {
    console.log("parameters1111>>> ", parameters);
      fetchDataStamping(parameters, setData, setShow, setTitle);
      console.log("parameters22222>>> ", parameters);
    } else {
      setShow(false);
      setData(null);
    }
  }, [tmpshow]);

  const handleClose = () => {
    setShow(false);
    close();
  }

  return (
    <Modal
      tmpshow={tmpshow.toString()}
      show={show}
      onHide={handleClose}
      size="xl"
      aria-labelledby="modal-absence-info"
    >
      <Modal.Header closeButton>
        <Modal.Title>{titleModal}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {show && <StampingModalTab data={data}
        parameters={parameters}
        handleClose={handleClose}
        />}
      </Modal.Body>
    </Modal>
  );
}

export default StampingModal;
