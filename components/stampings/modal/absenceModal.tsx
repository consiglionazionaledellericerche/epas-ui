import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AbsenceModalTab from "./absenceModalTab";
import { fetchData, simulateData } from './callApi';
import { secureCheck } from '../../../utils/apiUtility';
interface AbsenceModalProps {
  title: string,
  tmpshow: boolean,
  close: Function,
  parameters: any
}

interface AbsenceModalState {
  title: string,
  show: boolean,
  data: any,
}

  const AbsenceModal: React.FC<AbsenceModalProps> = ({ title, tmpshow, close, parameters }) => {
  const [show, setShow] = useState(false);
  const [showFindCodeTab, setShowFindCodeTab] = useState(false);
  const [showForceInsert, setShowForceInsert] = useState(false);
  const [data, setData] = useState<any>(null);
  const [simData, setSimData] = useState<any>(null);
  const [titleModal, setTitle] = useState(title);
  const [categoryTab, setCategoryTab] = useState("");

  useEffect(() => {
    if (tmpshow) {
    // eseguo le chiamate alle api di securecheck per vedere se l'utente ha i permessi per alcuni endpoint
      let paramsSC = {'method':'GET',
                'path':'/rest/v4/absencesGroups/findCode',
                'entityType':'Office',
                'id':parameters['id']};
      secureCheck(paramsSC, setShowFindCodeTab);

      paramsSC = {'method':'GET',
                'path':'/rest/v4/absencesGroups/findCode', //TODO: check api per Certifications.certifications
                'entityType':'Office',
                'id':parameters['id']};
      secureCheck(paramsSC, setShowForceInsert);
      /***********************************************/

      fetchData(parameters, setData, setShow, setTitle);
      simulateData(data, setSimData);
    } else {
      setShow(false);
      setData(null);
    }
  }, [tmpshow, parameters]);

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
        {show && <AbsenceModalTab data={data}
        simData={simData}
        parameters={parameters}
        tabName={data.categoryTabSelected.name}
        tabsVisible={data.tabsVisibile}
        handleClose={handleClose}
        showFindCodeTab={showFindCodeTab}
        showForceInsert={showForceInsert}
        />}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AbsenceModal;
