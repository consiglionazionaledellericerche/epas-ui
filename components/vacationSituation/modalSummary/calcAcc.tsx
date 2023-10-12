import React from "react";
import { Table, Button } from "react-bootstrap";
import CalcAccRow from "./calcAccRow";
import {VacationSummary} from "../../../types/vacationSummary";

interface CalcAccProps {
    data: VacationSummary;
}

const CalcAcc: React.FC<CalcAccProps> = ({
    data
  }) => {
    return(
    <>
      <p>Sono stati calcolati <strong>{data.accrued}</strong> giorni maturati alla data di oggi.<br/>
       I giorni di maturazione trascorsi per l&#39;anno {data.year} sono <strong>{data.accruedDay}</strong>.<br/>
       { !data.postPartumisEmpty ? (<span>Dai giorni dell&#39;anno sono sottratti <strong>{data.postPartumSize}</strong>
       giorni di assenza usufruiti che non contribuiranno alla maturazione.</span>)  : ''
       }
       </p>
        <Table className="table table-condensed center">
         <thead>
           <tr>
             <th>Piano Ferie</th>
             <th>Data di Maturazione</th>
             <th>Maturati</th>
             <th>Progressione</th>
             <th>Giorni nell&#39;anno</th>
             { !data.postPartumisEmpty ? <th>Giorni riduzione</th> :''}
           </tr>
           </thead>
           <tbody>
           { data.absenceSubPeriods?.map((period) => {
              return ( period.vacationCode ? (
                            <>
                            <CalcAccRow subperiod={period}/>
                            </> ) : ''
                       );
             })
             }
           </tbody>
          </Table>
     </>
    );
    }

export default CalcAcc