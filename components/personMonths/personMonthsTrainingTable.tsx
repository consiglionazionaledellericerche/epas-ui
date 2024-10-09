import React from "react";
import { Table } from "react-bootstrap";
import DateUtility from "../../utils/dateUtility";
import { TrainingHours } from "../../types/trainingHours";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface PersonMonthsTrainingTableProps {
  trainingData: TrainingHours;
  year: number;
}

const PersonMonthsTrainingTable: React.FC<PersonMonthsTrainingTableProps> = ({
  trainingData,
  year,
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

  let today = new Date(trainingData.today);

  let infoMessage = (
    <div className="alert-info">
      <p>
        È possibile aggiungere o modificare le ore di formazione del mese attuale o dei primi giorni del mese
        precedente (fino all'invio degli attestati).
      </p>
      <p>Nel momento in cui l'amministratore le approva, non potranno più essere modificate.</p>
    </div>
  );

  return (
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
          const recap = trainingData.personMonthRecaps.filter(
            (recap) => recap.month === parseInt(month.id, 10)
          );

          let monthIsEqual = DateUtility.areMonthEqual(today, month);
          let yearIsEqual = DateUtility.areYearEqual(today, year);
          let todayBeforeMonth = DateUtility.subtractMonth(today);
          let monthBeforeIsEqual = DateUtility.areMonthEqual(todayBeforeMonth, month);
          let yearBeforeIsEqual = DateUtility.areYearEqual(todayBeforeMonth, year);

          return (
            <tr key={month.id}>
              <td className="warning">{month.name}</td>
              <td>
                {recap.length > 0 ? (
                  recap.map((pm) => (
                    <p key={pm.id}>
                      <span className="label label-success">{pm.trainingHours} ore</span>
                      &nbsp;
                      <span>{pm.fromDate ? DateUtility.formatDate(pm.fromDate) : ""}</span>
                      {pm.fromDate && !DateUtility.areDatesEqual(pm.fromDate, pm.toDate) && (
                        <span> - {DateUtility.formatDate(pm.toDate)}</span>
                      )}
                      {pm.editable && (
                        <>
                          <a
                            href={`/personmonths/modifyTrainingHours/${pm.id}`}
                            data-async-modal="#defaultModal"
                          >
                            <FontAwesomeIcon icon={faPencil} />
                          </a>
                          <a
                            href={`/personmonths/deleteTrainingHours/${pm.id}`}
                            data-async-modal="#defaultModal"
                          >
                            <FontAwesomeIcon icon={faTrash} />
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
              {(monthIsEqual && yearIsEqual)
                   || (monthBeforeIsEqual && yearBeforeIsEqual) ?
                (<a href="@{PersonMonths.insertTrainingHours(mese, year)}" data-async-modal="#defaultModal">
                Inserisci ore di formazione
                </a>) : ("")
              }
            </td>

            <td>
               {pm.hoursApproved == true ?
                    ("SI"):("NO")
               }
            </td>
          </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default PersonMonthsTrainingTable;
