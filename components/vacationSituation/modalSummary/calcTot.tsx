import React from "react";
import { Table, Button } from "react-bootstrap";
import DateUtility from "../../../utils/dateUtility";

interface CalcTotProps {
    data;
}

const CalcTot: React.FC<CalcTotProps> = ({
    data
  }) => {

    return(
    <>
	     <p>Sono stati calcolati <strong>{data.total}</strong> giorni totali.<br/>
	     I giorni totali di maturazione per l'anno {data.year} sono <strong>{data.accruedDayTotal}</strong>.<br/>
	     { !data.postPartumisEmpty ? (<span>Dai giorni dell'anno sono sottratti <strong>{data.postPartumSize}</strong>
	                                  giorni di assenza usufruiti che non contribuiranno alla maturazione.</span>)  : ''
        }
	     </p>
      <div className="col-md-8 col-md-offset-2">
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
         { data.absencePeriod.subPeriods?.map((period) => {
         console.log('period', period.vacationCode, data.subFixedPostPartum);

            { period.vacationCode ?

(<tr {data.subFixedPostPartum ? (className="bg-danger") : ('')}>
              <td>{period.vacationCode.name}</td>
              <td>{DateUtility.formatDate(period.from)}</td>
              <td>
               {data.subAmountBeforeFixedPostPartum}
              </td>
              <td><strong>{data.subTotalAmount}</strong></td>
              <td>{period.periodInterval().dayInInterval()} ({data.subDayProgression})</td>
              { !data.postPartumisEmpty ? (
              <td>
                {data.subDayPostPartum > 0 ?
                  ({data.subDayPostPartum}
                  ({data.subDayPostPartumProgression})
                  {vacationSummary.subDayToFixPostPartum > 0 ?
                  (<span className="text-warning"><i className="fa fa-exclamation-triangle"
                   popover-hover data-content="Utilizzando ulteriori {data.subDayToFixPostPartum} giorni di riduzione si perderà il diritto ad utilizzare i {data.subAmountBeforeFixedPostPartum} giorni maturati in questo periodo."></i>
                  </span>
                  ) : ()}
                ) : ()}
              </td>
              ):('')}
            </tr>
            ) : ()

             }



            })
         }
         </tbody>
       </Table>
       </div>
	   </>
    );
}

export default CalcTot