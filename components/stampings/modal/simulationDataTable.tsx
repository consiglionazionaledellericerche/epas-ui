import React from "react";
import { Table, Button } from "react-bootstrap";
import 'react-tooltip/dist/react-tooltip.css';
import {Tooltip} from 'react-tooltip';
import { AbsenceFormSimulationResponse } from "../../../types/absenceFormSimulationResponse";
import DateUtility from "../../../utils/dateUtility";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AbsencePopOver from "../../absences/absencePopOver";
import { useState } from 'react';
import {useTranslations} from 'next-intl';

library.add(faCheck);
library.add(faTimes);

interface SimulationDataTableProps {
    data: AbsenceFormSimulationResponse;
}

const SimulationDataTable: React.FC<SimulationDataTableProps> = ({
    data
  }) => {

    const trans = useTranslations('Message');
    const [tooltipContent, setTooltipContent] = useState('');
    const [showTooltip, setShowTooltip] = useState(true);

    const [tooltipError, setTooltipError] = useState('');
    const [showTooltipError, setShowTooltipError] = useState(true);

    if (!data) {
      return "";
    }

    let usableCols = data.usableColumn ? (<>
                                         <th>Limite Utilizzabile</th>
                                         <th>Limite Consumato</th>
                                         </>
                                         ) : "";

    let complationCols = data.complationColumn ? (<>
                                              <th>Completamento Precedente</th>
                                              <th>Completamento Assenza</th>
                                              <th>Completamento Residuo</th>
                                          </>
                                          ) : "";

    let messageSuccess;
    let messageReplacing;
    let messageIgnored;
    let messageError;

    if (data.howManySuccess === 1) {
        messageSuccess = (<p>Verrà inserito <strong>1</strong> codice di assenza.</p>);
     } else if (data.howManySuccess > 1) {
        messageSuccess = (<p>Verranno inseriti <strong>{data.howManySuccess}</strong> codici di assenza.</p>);
    } else {
        messageSuccess = (<p>Non verrà inserito alcun codice di assenza.</p>);
    }

    if (data.howManyReplacing === 1) {
        messageReplacing = (<p>Verrà inserito <strong>1</strong> codice di completamento.</p>);
    } else if (data.howManyReplacing > 1) {
        messageReplacing = (<p>Verranno inseriti <strong>{data.howManyReplacing}</strong> codici di completamento.</p>);
    }

    if (data.howManyIgnored === 1) {
        messageIgnored = (<p>Verrà ignorato <strong>1</strong> giorno per festività.</p>);
    } else if (data.howManyIgnored > 1) {
        messageIgnored = (<p>Verranno ignorati <strong>{data.howManyIgnored}</strong> giorni per festività.</p>);
    }

    if (data.howManyError === 1) {
        messageError = (<p><strong>1</strong> giorno verrà escluso dall'inserimento a causa di errori.</p>);
    } else if (data.howManyError > 1) {
        messageError = (<p><strong>{data.howManyError}</strong> giorni verranno esclusi dall'inserimento a causa di errori.</p>);
    }

    let classTr;
    let popupAbsence;
    let esito;
    let esitoWarn;
    let tdUsable;
    let tdComplation;

    let rowsDetails = data.insertTemplateRows?.map((row) => {
          if (row.onlyNotOnHoliday) {
            classTr = "text-muted";
          }
          else if (row.beforeInitialization) {
            classTr = "bg-grey";
          }
          else if (row.absenceErrors) {
            classTr = "bg-danger";
          }

          if (row.absence){
             let day = DateUtility.formatDateDay(row.date);
             let month = DateUtility.formatDateMonth(row.date);
             popupAbsence = <>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <AbsencePopOver showGroup={true}
                              key={`popup-${month}-${day}`}
                              item={row.absence}
                              day={day}
                              setTooltipContent={setTooltipContent}
                              setShowTooltip={setShowTooltip} />
                            </a>
                            </>;
           }

           if (row.onlyNotOnHoliday){
            esito = "Giorno festivo ignorato";
            } else if (row.absenceErrors.length>0) {
            let conflicts ;
            let errors = row.absenceErrors.map((err)=>{
                        conflicts = err.conflictingAbsences?.map((conflict)=>{
                                   return <strong>{conflict.absenceType.code}</strong>
                                   });
                        return <strong>{trans(err.absenceProblem)}</strong>
            });
            let tooltipContentError = (
                <>
                    {errors}<br/>{conflicts}
                </>
            );

              esito = (<>
                    <div
                                data-tooltip-id="tooltip-error"
                                onMouseEnter={() => {
                                    setTooltipError(tooltipContentError);
                                    setShowTooltipError(true);
                                }}
                                onClick={() => setShowTooltipError(false)}
                            >
                            <span className="text-danger"><FontAwesomeIcon icon={faTimes}/></span>
                            <em className="text-danger" >Mostra i dettagli</em>

                            </div>
                    </>);
            } else {
              esito = <>
                      <span className="text-success"><FontAwesomeIcon icon={faCheck}/></span>
                      </>
            }
           if (row.absenceWarnings){
            esitoWarn = row.absenceWarnings?.map((warn) => {
                          return <span className="label label-warning">&{warn.absenceProblem}</span>
                        })
            }

            if (row.usableColumn) {
              tdUsable = <>
              <td>{row.usableLimit}</td>
              <td>{row.usableTaken}</td>
              </>
            }
            else {
              tdUsable = "";
            }

            if (row.complationColumn) {
              tdComplation = <>
              <td>{row.consumedComplationBefore}</td>
              <td>{row.consumedComplationAbsence}</td>
              <td>{row.consumedComplationNext}</td>
              </>
            }
            else {
              tdComplation = "";
            }

          return (
            <tr className={classTr} key={`tr-${DateUtility.formatDate(row.date)}`}>
              <td>{DateUtility.formatDate(row.date)}</td>
              <td>{popupAbsence}</td>
              <td>{esito} {esitoWarn}</td>
              {tdUsable}
              {tdComplation}
            </tr>
          );
        });

    return(<>
    <br/><br/>
    <Tooltip id="tooltip-absencecode" className="tooltip-white webui-popover" isOpen={showTooltip} clickable={true}>
       {tooltipContent}
     </Tooltip>
     <Tooltip id="tooltip-error" className="tooltip-white webui-popover" isOpen={showTooltipError} clickable={true}>
        {tooltipError}
      </Tooltip>
     <Table className="table table-condensed table-bordered">
      <thead>
      <tr>
        <th>Data</th>
        <th>Assenza</th>
        <th>Esito</th>
        {usableCols}
        {complationCols}
      </tr>
      </thead>
      <tbody>
      {rowsDetails}
      </tbody>
      </Table>

      <br/>
      {messageSuccess}
      {messageReplacing}
      {messageIgnored}
      {messageError}
      </>
  );
}

export default SimulationDataTable;