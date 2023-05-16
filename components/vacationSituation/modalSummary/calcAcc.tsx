import React from "react";
import { Table, Button } from "react-bootstrap";
import CalcAccRow from "./calcAccRow";

interface CalcAccProps {
    data;
}

const CalcAcc: React.FC<CalcAccProps> = ({
    data
  }) => {
    return(
    <>
      <p>Sono stati calcolati <strong>{data.accrued}</strong> giorni maturati alla data di oggi.<br/>
       I giorni di maturazione trascorsi per l'anno {data.year} sono <strong>{data.accruedDay}</strong>.<br/>
       { !data.postPartumisEmpty ? (<span>Dai giorni dell'anno sono sottratti <strong>{data.postPartumSize}</strong>
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
             <th>Giorni nell'anno</th>
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