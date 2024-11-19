import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getSession } from "next-auth/react";
import DateUtility from "../../utils/dateUtility";
import { AbsenceInMonth } from "../../types/absenceInMonth";
import { CustomSession } from "../../types/customSession";

interface AbsencesMonthlyModalProps {
  tmpshow: boolean;
  close: () => void;
  parameters: string;
}

const AbsencesMonthlyModal: React.FC<AbsencesMonthlyModalProps> = ({ tmpshow, close, parameters }) => {
  const [data, setData] = useState<AbsenceInMonth | null>(null);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (tmpshow) {
        const session = (await getSession()) as CustomSession | null;
        if (session?.accessToken) {
          const accessToken = session.accessToken;
          const url = `/api/rest/v4?endpoint=absences%2FabsenceInMonth&${parameters}`;
          try {
            const response = await fetch(url, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            });

            if (response.ok) {
              const data = await response.json();
              setData(data);
              setShow(true);
              setTitle(`Date in cui è stata effettuata l'assenza ${data.code}`);
            } else {
              console.error("Errore durante il recupero dei dati:", response.statusText);
              setData(null);
              setShow(false);
              setTitle("");
            }
          } catch (error) {
            console.error("Errore durante il fetch:", error);
            setData(null);
            setShow(false);
            setTitle("");
          }
        } else {
          setData(null);
          setShow(false);
          setTitle("");
        }
      } else {
        setData(null);
        setShow(false);
        setTitle("");
      }
    };

    fetchData();
  }, [tmpshow, parameters]);

  const handleClose = () => {
    setShow(false);
    close();
  };

  const dateList = data
    ? data.dateAbsences?.map((date) => (
        <li key={DateUtility.formatDate(date)}>{DateUtility.formatDate(date)}</li>
      ))
    : null;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="modal-absencemonth-info"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{show ? <ul>{dateList}</ul> : "Nessun dato disponibile."}</Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AbsencesMonthlyModal;
