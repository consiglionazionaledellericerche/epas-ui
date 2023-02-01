import React from "react";
import { Table, Button } from "react-bootstrap";

interface calcAccProps {
    data;
}

const calcAcc: React.FC<calcAccProps> = ({
    data
  }) => {

    return(
         <p>Sono stati calcolati <strong>{data.accrued}</strong> giorni maturati alla data di oggi.<br/>
	     I giorni di maturazione trascorsi per l'anno {data.year} sono <strong>{data.accruedDay}</strong>.<br>
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
	     </tbody>
	     { data.absencePeriod.subPeriods?.map((period) => {
         	period.vacationCode ?
            (<tr
	           {data.subFixedPostPartum ? (className="bg-danger") : (
	            {data.subAccrued ? (className="bg-warning") : ()}
	           )} >
	         <td>{period.vacationCode.name}</td>
	         <td>{DateUtility.formatDate(period.from)}</td>
	         <td>
	          {data.subAmountBeforeFixedPostPartum}
	          {data.contractEndFirstYearInPeriod ? (
              <span className="text-success"><i className="fa fa-info-circle"
                 popover-hover data-content="Dal {DateUtility.formatDate(data.contractEndFirstYearInPeriod)} potrai usufruire anticipatamente di tutti i giorni maturati fino alla fine di questo anno."></i>
               </span> ) :()
            }
	         </td>
	         <td>
	           <strong>{data.subTotalAmount}</strong>
	         </td>
	         <td>${period.periodInterval().dayInInterval()} (${vacationSummary.subDayProgression(period)})</td>
	         #{if !vacationSummary.postPartum().empty}
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
	         #{/if}
	       </tr>
	       ) : ()
         })}
       </Table>
    );
}

export default calcAcc