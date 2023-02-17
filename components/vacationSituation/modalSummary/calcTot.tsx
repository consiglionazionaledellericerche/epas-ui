import React from "react";
import { Table, Button } from "react-bootstrap";
import CalcTotRow from "./calcTotRow";

interface CalcTotProps {
    data;
}

const CalcTot: React.FC<CalcTotProps> = ({
    data
  }) => {

    console.log('data.absencePeriod', data.absencePeriod);
    return(
    <>
	     <p>Sono stati calcolati <strong>{data.total}</strong> giorni totali.<br/>
	     I giorni totali di maturazione per l'anno {data.year} sono <strong>{data.accruedDayTotal}</strong>.<br/>
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
         {  data.absencePeriod.subPeriods?.map((period) => {
            console.log('data.absencePeriod.subPeriods period', period);
            return ( period.vacationCode ? (
              <>
              <CalcTotRow data={data} period={period} />
              </> ) : ''
            );
         })
         }
         </tbody>
       </Table>
	   </>
    );
}

export default CalcTot