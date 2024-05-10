import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { getSession } from 'next-auth/react';
import DateUtility from "../../../utils/dateUtility";
import AbsenceModalTab from "./absenceModalTab";
import { CustomSession } from "../../../types/customSession";

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
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (tmpshow) {
      const fetchData = async () => {
        const session = await getSession() as CustomSession;
        let accessToken = null;
        if (session) {
          accessToken = session.accessToken;
        }

        const queryString = Object.entries(parameters)
          .map(([key, value]) => `${key}=${value}`)
          .join('&');

        const url = '/api/rest/v4/absencesGroups/groupsForCategory?' + queryString;
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + accessToken
            }
          });
          const data = await response.json();
          let person = data.person.surname + " " + data.person.name;
          let title = "Nuovo codice assenza in data " + DateUtility.formatDate(data.from) + " per " + person;
          console.log("person>>>");
          setData(data);
          setShow(true);
        } catch (error) {
          console.error("Unable to fetch data", error);
        }
      };
      fetchData();
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
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {show && <AbsenceModalTab data={data}
        parameters={parameters}
        tabName={data.categoryTabSelected.name}
        tabsVisible={data.tabsVisibile} />}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AbsenceModal;
