import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import StampingModalTab from "../stamping/stampingModalTab";
import { fetchDataStamping } from '../apiUtils';
import Alert from '../../../miscellanous/alert';
import { secureCheck } from '../../../../utils/secureCheck';

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
  const [showAlert, setShowAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState('SUCCESS');
  const [alertMessage, setAlertMessage] = useState('');
  const [showInsertTab, setShowInsertTab] = useState(false);
  const [showInsertOffSiteTab, setShowInsertOffSiteTab] = useState(false);

  useEffect(() => {
    if (tmpshow) {
      let paramsSC = {'method':'POST',
                    'path':'/rest/v4/stampings',
                    'entityType':'Person',
                    'id':parameters['personId']};
      secureCheck(paramsSC, setShowInsertTab);

      paramsSC = {'method':'POST',
                'path':'/rest/v4/stampings/saveOffSite',
                'entityType':'Person',
                'id':parameters['personId']};
      secureCheck(paramsSC, setShowInsertOffSiteTab);
      /***********************************************/
      fetchDataStamping(parameters, setData, setShow, setTitle);
    } else {
      setShow(false);
      setData(null);
    }
  }, [tmpshow]);

  const handleClose = () => {
    setShow(false);
    close();
  };

  const showError = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTypeAlert("ERROR");
    setTimeout(() => setShowAlert(false), 5000); // nascondo dopo 5 secondi
  };
  const showSuccess = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTypeAlert("SUCCESS");
    setTimeout(() => setShowAlert(false), 5000); // nascondo dopo 5 secondi
  };

  return (
    <>
    {showAlert && <Alert message={alertMessage} onClose={() => setShowAlert(false)} typeAlert={typeAlert} />}
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
        showError={showError}
        showSuccess={showSuccess}
        showInsertTab={showInsertTab}
        showInsertOffSiteTab={showInsertOffSiteTab}
        />}
      </Modal.Body>
    </Modal>
    </>
  );
}

export default StampingModal;
