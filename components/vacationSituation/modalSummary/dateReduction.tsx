import React from "react";
import { Table, Button } from "react-bootstrap";
import DateUtility from "../../../utils/dateUtility";

interface DateReductionProps {
    data;
}

const DateReduction: React.FC<DateReductionProps> = ({
    data
  }) => {

    return(
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
        {
          data.postPartum?.map((absence) => {
              <tr>
                 <td data-order="{absence.personDay.date}">{DateUtility.formatDate(absence.personDay.date)}</td>
                 <td>{absence.absenceType.code}</td>
                 <td>{absence.absenceType.description}</td>
              </tr>
            })
        }
      </tbody>
		  </Table>
      </div>
    );
}

export default DateReduction