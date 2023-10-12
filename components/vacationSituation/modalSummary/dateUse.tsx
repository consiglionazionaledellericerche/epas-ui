import React from "react";
import { Table, Button } from "react-bootstrap";
import DateUtility from "../../../utils/dateUtility";
import {VacationSummary} from "../../../types/vacationSummary";

interface DateUseProps {
    data: VacationSummary;
}

const DateUse: React.FC<DateUseProps> = ({
    data
  }) => {

  let rowElem =data.absencesUsed?.map((absence) => {
                                let trID = absence.absenceType.code + "$" + DateUtility.formatDate(absence.personDay.date);
                                 return (
                                     <tr key={trID}>
                                        <td data-order="{absence.personDay.date}">{DateUtility.formatDate(absence.personDay.date)}</td>
                                        <td>{absence.absenceType.code}</td>
                                        <td>{absence.absenceType.description}</td>
                                     </tr> );
                                 })

    return(
        <>

           {data.sourced && data.sourced > 0 ? (<div className="alert alert-info">
                                 <p><strong>{data.sourced}</strong> giorni utilizzati sono stati definiti da da inizializzazione ePAS.</p>
                                 </div>)  : ''
           }

          <div className="col-md-8 col-md-offset-2">
            <Table className="table table-condensed table-hover" datatable-small>
                <thead>
                  <tr className="warning">
                   <th className="col-xs-4">Data</th>
                     <th className="col-xs-2">Codice</th>
                     <th className="col-xs-6">Descrizione</th>
                  </tr>
                </thead>
                <tbody>
                {rowElem}
                </tbody>
              </Table>
          </div>
          </>
    );
}

export default DateUse