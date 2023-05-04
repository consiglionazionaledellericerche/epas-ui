import React from "react";
import { Table } from "react-bootstrap";
import { PeriodChain } from "../../types/periodChain";
import DateUtility from "../../utils/dateUtility";
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

    let init;
    let toUse;

    res = periodChain.periods?.map((absencePeriod) => {

      absencePeriod.takableWithLimit ? (
              withLimit = <>
              <strong>Tipo periodo </strong>
              {DateUtility.formatPeriodType(absencePeriod.groupAbsenceType.periodType)}
              <br/>
              <strong>Validità periodo </strong>
              {DateUtility.formatDate(absencePeriod.from)} - {DateUtility.formatDate(absencePeriod.to)}
              <br/>
              <strong>Totale utilizzabile </strong>
              {DateUtility.fromMinuteToHour(absencePeriod.periodTakableAmount, absencePeriod.takeAmountType)}
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
           <FontAwesomeIcon icon={faExclamationCircle}/>
           <span>Rimangono </span>
           <strong><span className="text-success">
           {DateUtility.fromMinuteToHour(absencePeriod.remainingAmount, absencePeriod.takeAmountType)}
           </span></strong>
           <span> da utilizzare entro il </span>
           <strong className="text-success">
           {DateUtility.formatDate(absencePeriod.to)}
           </strong>
           </>
       ) : ( toUse = '' )

       let keyDesc = "absenceDescription$" + absencePeriod.groupAbsenceType.description;
       let keyLimit = "absenceLimit$" + absencePeriod.groupAbsenceType.description;

        return(
          <>
            <li className="list-group-item list-group-item-info" key={keyDesc}>
                <p>
                  <strong>{absencePeriod.groupAbsenceType.description}</strong>
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
              <p><em>Non ci sono assenze utilizzate per questo gruppo nel periodo selezionato.</em></p>
            </li>
          </>
        )
    }
    )

    return (
    <>
    <h4>Permessi personali (661)</h4>
    <ul key="permessiPersonali">
        {res}
    </ul>
    </>

    )

  }


export default PermissionGroupList