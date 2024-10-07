import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AbsenceModalTab from "./absenceModalTab";
import { fetchDataAbsence, simulateData } from '../apiUtils';
import { secureCheck } from '../../../../utils/apiUtility';
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
    async function checkSecure() {
    // eseguo le chiamate alle api di securecheck per vedere se l'utente ha i permessi per alcuni endpoint
      let paramsSC = {'method':'GET',
                'path':'/rest/v4/absencesGroups/findCode',
                'entityType':'Office',
                'id':parameters['id']};
      var res = await secureCheck(paramsSC);
      setShowFindCodeTab(res);

      paramsSC = {'method':'GET',
                'path':'/rest/v4/absencesGroups/findCode', //TODO: check api per Certifications.certifications
                'entityType':'Office',
                'id':parameters['id']};
      var res = await secureCheck(paramsSC);
      setShowForceInsert(res);
      }
      checkSecure();
      /***********************************************/
      async function getData() {
        var dataAbs = await fetchDataAbsence(parameters, setShow);
        setData(dataAbs.data);
        setShow(dataAbs.show);
        setTitle(dataAbs.title);
        var simData = await simulateData(data);
        setSimData(simData);
      }
      getData();
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
