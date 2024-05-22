import React from "react";
import { Table, Button } from "react-bootstrap";
import { AbsenceFormSimulationResponse } from "../../../types/absenceFormSimulationResponse";
import DateUtility from "../../../utils/dateUtility";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faCheck);

interface SimulationDataTableProps {
    data: AbsenceFormSimulationResponse;
}

const SimulationDataTable: React.FC<SimulationDataTableProps> = ({
    data
  }) => {
/*
      #{list items:insertReport.insertTemplateRows, as:'templateRow' }
        <tr
             #{if templateRow.onlyNotOnHoliday()} class="text-muted" #{/if}
             #{elseif templateRow.beforeInitialization} class="bg-grey" #{/elseif}
             #{elseif templateRow.absenceErrors} class="bg-danger"#{/elseif}
             #{elseif templateRow.absenceErrors.empty} *{ class="bg-success" }* #{/elseif}
          >
          <td data-order="${templateRow.date}">
            ${templateRow.date.format()}
          </td>
          <td>
            #{if templateRow.absence}
	          #{absences.absence-popover absence:templateRow.absence, groupSelected:templateRow.groupAbsenceType /}
	        #{/if}
          </td>

          <td>
            #{if templateRow.onlyNotOnHoliday()} Giorno festivo ignorato #{/if}
            #{elseif templateRow.absenceErrors}

              *{ popover degli errori dell'assenza }*
              %{id = insertReport.insertTemplateRows.indexOf(templateRow); }%
              <span webui-popover-hover data-url="#pop${id}">
                <i class="fa fa-times text-danger" aria-hidden="true"></i> <em class="text-danger">Mostra i dettagli</em>
              </span>
              <div class="webui-popover-content" id="pop${id}">
              #{list items:templateRow.absenceErrors, as:'absenceError'}
                &{absenceError.absenceProblem}
                #{list items:absenceError.conflictingAbsences, as:'conflictingAbsence'}
                  <strong>${conflictingAbsence.absenceType.code}</strong>
                #{/list}
              #{/list}
              </div>

            #{/elseif}
            #{else} <i class="fa fa-check text-success" aria-hidden="true"></i> #{/else}

            #{if templateRow.absenceWarnings}
              #{list items:templateRow.absenceWarnings, as:'absenceWarning'}
                <span class="label label-warning">&{absenceWarning.absenceProblem}</span>
              #{/list}
            #{/if}
          </td>

          #{if insertReport.usableColumn}
            <td>${templateRow.usableLimit}</td>
            <td>${templateRow.usableTaken}</td>
          #{/if}
           #{if insertReport.complationColumn}
            <td>${templateRow.consumedComplationBefore}</td>
            <td>${templateRow.consumedComplationAbsence}</td>
            <td>${templateRow.consumedComplationNext}</td>
          #{/if}

        </tr>
      #{/list}
      */

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

    let rowsDetails = data.insertTemplateRows.map((row) => {
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
           popupAbsence = row.absence.code;
           } else {
           popupAbsence = "";
           }

           if (row.onlyNotOnHoliday){
            esito = "Giorno festivo ignorato";
            } else if (row.absenceErrors) {
            esito = "popup errori";
            } else {
              esito = <span className="text-success"><FontAwesomeIcon icon={faCheck}/></span>;
            }
           if (row.absenceWarnings){
            esitoWarn = row.absenceWarnings.map((warn) => {
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
            <tr className={classTr}>
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