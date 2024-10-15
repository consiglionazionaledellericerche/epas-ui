import React from "react";
import { Table } from "react-bootstrap";
import { PeriodChain } from "../../types/periodChain";
import DateUtility from "../../utils/dateUtility";
import { v4 as uuidv4 } from 'uuid';
import AbsencePopOver from "../absences/absencePopOver";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

interface PermissionGroupListProps {
    periodChain: PeriodChain;
}

const PermissionGroupList: React.FC<PermissionGroupListProps> = ({
    periodChain
  }) => {

    let res;
    let withLimit;

    let init: React.ReactNode | null = null;
    let toUse: React.ReactNode | null = null;

    res = periodChain.periods?.map((absencePeriod) => {

       let keyDesc = "absenceDescription$" + DateUtility.formatDate(absencePeriod.from)+"$"+DateUtility.formatDate(absencePeriod.to);
       let keyLimit = "absenceLimit$" +DateUtility.formatDate(absencePeriod.from)+"$"+DateUtility.formatDate(absencePeriod.to);
      const daysInPeriodHasElements = absencePeriod.daysInPeriod && Object.keys(absencePeriod.daysInPeriod).length > 0;

      absencePeriod.takableWithLimit ? (
          withLimit = <>
            <strong>Tipo periodo </strong>
            {absencePeriod.groupAbsenceType?.periodType ? DateUtility.formatPeriodType(absencePeriod.groupAbsenceType.periodType) : 'N/A'}
            <br/>
            <strong>Validità periodo </strong>
            {DateUtility.formatDate(absencePeriod.from)} - {DateUtility.formatDate(absencePeriod.to)}
            <strong>Totale utilizzabile </strong>
            {absencePeriod.periodTakableAmount !== undefined && absencePeriod.takeAmountType !== undefined
                ? DateUtility.fromMinuteToHour(absencePeriod.periodTakableAmount, absencePeriod.takeAmountType)
                : ''}
          </>
      ) : (
      withLimit = '');

//TODO: questa parte è dell'amministrazione da fare più avanti
//      absencePeriod.groupAbsenceType.initializable ? (
//          absencePeriod.initialization ? (
//            init =
//            <a className="btn btn-sm btn-warning pull-right" href="@{AbsenceGroups.initialization(absencePeriod.person.id, absencePeriod.groupAbsenceType.id, initializationGroup.date.format(), true)}" data-async-modal="#defaultModal">Modifica Inizializzazione</a>
//          ) : ( init = '')
//      ) : (
//        init = <>
//        <span>Per questo periodo non è stata definita alcuna inizializzazione.</span>
//        <a>Inizializzazione</a>
//        </>
//      );

       absencePeriod.takableWithLimit ? (
          toUse = <>
           <FontAwesomeIcon icon={faExclamationCircle}/>&nbsp;
           <span>Rimangono</span>&nbsp;
           <strong><span className="text-success">
           {absencePeriod.remainingAmount !== undefined && absencePeriod.takeAmountType !== undefined
               ? DateUtility.fromMinuteToHour(absencePeriod.remainingAmount, absencePeriod.takeAmountType)
               : ''}
           </span></strong>
           <span> da utilizzare entro il </span>
           <strong className="text-success">
           {DateUtility.formatDate(absencePeriod.to)}
           </strong>
           </>
       ) : ( toUse = '' );

      let absence;

      if (daysInPeriodHasElements) {
        absence = (
          <>
            <table className="table table-condensed table-bordered">
              <thead>
                <tr className="bg-warning">
                  <th className="warning">Data</th>
                  <th className="warning">Assenza</th>
                  {absencePeriod.takableWithLimit && (
                    <>
                      <th className="warning">Limite<br />Utilizzabile</th>
                      <th className="warning">Limite<br />Consumato</th>
                    </>
                  )}
                  <th className="warning">Completamento<br />Precedente</th>
                  <th className="warning">Completamento<br />Assenza</th>
                  <th className="warning">Completamento<br />Residuo</th>
                </tr>
              </thead>
              <tbody>
              {Object.keys(absencePeriod.daysInPeriod ?? {}).map((dayKey) => {
                  const dayInPeriod = absencePeriod.daysInPeriod![dayKey];
                  return dayInPeriod?.allTemplateRows?.map((rowRecap, index) => (
                    <tr key={index} className={rowRecap.beforeInitialization ? "bg-grey" : ""}>
                      <td>{dayInPeriod.date ? DateUtility.formatDate(dayInPeriod.date) : ''}</td>
                      <td className="text-success">
                        <strong>
                          <AbsencePopOver
                                    showGroup={false}
                                    absElem={rowRecap.absence}
                                    day={rowRecap.absence?.code ?? ''} />
                        </strong>
                      </td>
                      {absencePeriod.takableWithLimit && (
                        <>
                          <td>{rowRecap.usableLimit}</td>
                          <td>{rowRecap.usableTaken}</td>
                        </>
                      )}
                      <td>{rowRecap.consumedComplationBefore}</td>
                      <td>{rowRecap.consumedComplationAbsence}</td>
                      <td>{rowRecap.consumedComplationNext}</td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </>
        );
      } else {
        absence = (
          <>
            <p><em>Non ci sono assenze utilizzate per questo gruppo nel periodo selezionato.</em></p>
          </>
        );
      }


        return(
          <>
          <li className="list-group-item list-group-item-info" key={keyDesc}>
            <p>
              <strong>{absencePeriod?.groupAbsenceType ? absencePeriod.groupAbsenceType.description : 'Descrizione non disponibile'}</strong>
            </p>
          </li>

            <li className="list-group-item" key={keyLimit}>
             <p>
                {withLimit}
              </p>
             <p>
                {init}
              </p>
              <p>
              {toUse}
               </p>
              {absence}
            </li>
          </>
        )
    }
    )

    return (
    <>
      <div className="panel panel-primary">
         <div className="panel-heading">
           <h3 className="panel-title">Permessi personali (661)</h3>
         </div>
         <div className="panel-body">
          <ul key="permessiPersonali" className="list-group">
              {res}
          </ul>
          </div>
      </div>
    </>
    )
  }

export default PermissionGroupList