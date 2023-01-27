import React from "react";
import { Table, Button } from "react-bootstrap";

interface calcTotProps {
    data;
}

const calcTot: React.FC<calcTotProps> = ({
    data
  }) => {

    return(
	     <p>Sono stati calcolati <strong>{data.total}</strong> giorni totali.<br>
	     I giorni totali di maturazione per l'anno {data.year} sono <strong>{data.accruedDayTotal}</strong>.<br/>
	     #{if !vacationSummary.postPartum().empty }
	     Dai giorni dell'anno sono sottratti <strong>{data.postPartumSize}</strong> giorni di assenza usufruiti
	        che non contribuiranno alla maturazione.
	     #{/if}
	     </p>


	   <Table className="table table-condensed center">
	     <tr>
           <th>Piano Ferie</th>
	       <th>Data di Maturazione</th>
	       <th>Maturati</th>
	       <th>Progressione</th>
	       <th>Giorni nell'anno</th>
	       #{if !vacationSummary.postPartum().empty}
	         <th>Giorni riduzione</th>
	       #{/if}
	     </tr>
	     {data.absencePeriod.subPeriods?.map((period) => {
	       {period.vacationCode ?
	       (<tr {data.subFixedPostPartum ? (className="bg-danger") : ()}>
	         <td>{period.vacationCode.name}</td>
	         <td>{DateUtility.formatDate(period.from)}</td>
	         <td>
	          {data.subAmountBeforeFixedPostPartum}
	         </td>
	         <td><strong>{data.subTotalAmount}</strong></td>
	         <td>{period.periodInterval().dayInInterval()} ({data.subDayProgression})</td>
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

export default calcTot