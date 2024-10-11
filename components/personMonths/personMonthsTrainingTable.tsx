import React, { useState, useEffect } from "react";
import { getSession } from 'next-auth/react';
import { CustomSession } from '../../types/customSession';
import { Table } from "react-bootstrap";
import DateUtility from "../../utils/dateUtility";
import { TrainingHours } from "../../types/trainingHours";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TrainingHoursModal from "./modal/trainingHoursModal";
import Alert from '../miscellanous/alert';

interface PersonMonthsTrainingTableProps {
  trainingData: TrainingHours;
  year: number;
}

const PersonMonthsTrainingTable: React.FC<PersonMonthsTrainingTableProps> = ({
  trainingData,
  year
}) => {
  const months = [
    { id: "01", name: "Gennaio" },
    { id: "02", name: "Febbraio" },
    { id: "03", name: "Marzo" },
    { id: "04", name: "Aprile" },
    { id: "05", name: "Maggio" },
    { id: "06", name: "Giugno" },
    { id: "07", name: "Luglio" },
    { id: "08", name: "Agosto" },
    { id: "09", name: "Settembre" },
    { id: "10", name: "Ottobre" },
    { id: "11", name: "Novembre" },
    { id: "12", name: "Dicembre" },
  ];

  const [dataTraining, setDataTraining] = useState(trainingData);
  const [parameters, setParameters] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState('SUCCESS');
  const [alertMessage, setAlertMessage] = useState('');
  const [yearModal, setYearModal] = useState(year);

  const closeModal = () => {
    setShowModal(false);
    fetchTrainingData();
  };

  const showError = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTypeAlert("ERROR");
    setTimeout(() => setShowAlert(false), 5000); // Nascondo dopo 5 secondi
  };

  const showSuccess = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTypeAlert("SUCCESS");
    setTimeout(() => setShowAlert(false), 5000); // Nascondo dopo 5 secondi
  };

  const fetchTrainingData = async () => {
    try {
      const session = await getSession();
      if (!session) throw new Error("No session found");
      const accessToken = session.accessToken;

      const url = `/api/rest/v4/personmonths/trainingHours?year=${year}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }
      });

      if (!response.ok) {
          throw new Error('Errore durante la richiesta API');
      } else {
        const data = await response.json();
        setDataTraining(data);
      }
    } catch (error) {
      console.error("Unable to save data", error);
      showError("Errore durante il caricamento dei dati");
    }
  };

  function setModalParam(action: string, pm: any) {
    let month = months.find((m) => parseInt(m.id) === parseInt(pm.month));
    var params = {
      month: month,
      year: pm.year,
      action: action,
      id:null,
      fromDate:null,
      toDate:null
    };
    if (action !== "insert") {
      params["id"] = pm.id;
      params["fromDate"] = pm.fromDate;
      params["toDate"] = pm.toDate;
    }
    setParameters(params);
    setShowModal(true);
  }

  let today = dataTraining?.today ? new Date(dataTraining.today) : new Date();

  return (
    <>
      {showAlert && <Alert message={alertMessage} onClose={() => setShowAlert(false)} typeAlert={typeAlert} />}
      <TrainingHoursModal
        tmpshow={showModal}
        close={() => closeModal()}
        parameters={parameters}
        showError={showError}
        showSuccess={showSuccess}
      />
      <Table id="trainingRecap" className="table hour-recap table-condensed center">
        <caption className="sr-only">Ore di formazione {year}</caption>
        <thead>
          <tr className="warning">
            <th>Mese</th>
            <th>Ore di formazione</th>
            <th>Aggiungi</th>
            <th>Inviate ad Attestati</th>
          </tr>
        </thead>
        <tbody>
          {months.map((month) => {
            const recap = dataTraining?.personMonthRecaps?.filter(
              (recap) => recap.month === parseInt(month.id, 10)
            );

            let monthIsEqual = DateUtility.areMonthEqual(today, month.id);
            let yearIsEqual = DateUtility.areYearEqual(today, year);
            let todayBeforeMonth = DateUtility.subtractMonth(today);
            let monthBeforeIsEqual = DateUtility.areMonthEqual(todayBeforeMonth, month.id);
            let yearBeforeIsEqual = DateUtility.areYearEqual(todayBeforeMonth, year);

            return (
              <tr key={month.id}>
                <td className="warning">{month.name}</td>
                <td>
                  {recap && recap.length > 0 ? (
                    recap.map((pm, index) => (
                      <p key={pm.id}>
                        <span className="label label-success">{pm.trainingHours} ore</span>
                        &nbsp;
                        <span>{pm.fromDate ? DateUtility.formatDate(pm.fromDate) : ""}</span>
                        {(pm.fromDate && pm.toDate) && !DateUtility.areDatesEqual(pm.fromDate, pm.toDate) && (
                          <span> - {DateUtility.formatDate(pm.toDate)}</span>
                        )}
                        {pm.editable && (
                          <>
                            <a id="editTraining" data-async-modal="#defaultModal" href="#" onClick={() => setModalParam("edit", pm)}>
                              &nbsp;&nbsp;<FontAwesomeIcon icon={faPencil} />
                            </a>
                            <a id="deleteTraining" data-async-modal="#defaultModal" href="#" onClick={() => setModalParam("delete", pm)}>
                              &nbsp;&nbsp;<FontAwesomeIcon icon={faTrash} />
                            </a>
                          </>
                        )}
                      </p>
                    ))
                  ) : (
                    <span></span>
                  )}
                </td>
                <td>
                  {
                    (monthIsEqual && yearIsEqual) || (monthBeforeIsEqual && yearBeforeIsEqual) ? (
                      <a id="insertTraining" data-async-modal="#defaultModal" href="#" onClick={() => setModalParam("insert",{'month':month.id,'year':yearModal})}>
                        Inserisci ore di formazione
                      </a>
                    ) : (
                      ""
                    )}
                </td>
                <td>
                  {recap && recap.length > 0 ? (
                    <span key={recap[0].id}>{recap[0].hoursApproved ? "SI" : "NO"}</span>
                  ) : (
                    "NO"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default PersonMonthsTrainingTable;
