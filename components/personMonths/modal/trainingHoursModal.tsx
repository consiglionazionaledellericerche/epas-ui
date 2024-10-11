import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TrainingHoursModalContent from './trainingHoursModalContent';
import { secureCheck } from '../../../utils/secureCheck';

interface TrainingHoursModalProps {
  tmpshow: boolean;
  close: Function;
  parameters: any;
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
}

const TrainingHoursModal: React.FC<TrainingHoursModalProps> = ({
  tmpshow,
  close,
  parameters,
  showError,
  showSuccess
}) => {
  const [show, setShow] = useState(false);
  const [dataTraining, setDataTraining] = useState<any>(null);
  const [titleModal, setTitle] = useState("");

  useEffect(() => {
    let title = "";
    if (parameters.action === 'insert' || parameters.action === 'edit') {
      title = `Ore formazione ${parameters.month.name} ${parameters.year}`;
    } else {
      title = `Elimina ore di formazione`;
    }
    setTitle(title);
  }, [parameters.action]);


  useEffect(() => {
    if (tmpshow) {
      // Verifica della sicurezza e caricamento dati
      async function getData() {
        setShow(true);
      }
      getData();
    } else {
      setShow(false);
    }
  }, [tmpshow, parameters]);

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
          <Modal.Title>{titleModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {show && <TrainingHoursModalContent
            year={parameters.year}
            month={parameters.month}
            action={parameters.action}
            pm={parameters}
            handleClose={handleClose}
            showError={showError}
            showSuccess={showSuccess}
          />}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TrainingHoursModal;
