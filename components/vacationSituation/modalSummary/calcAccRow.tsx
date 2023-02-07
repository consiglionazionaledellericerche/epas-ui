import React from "react";
import Button from 'react-bootstrap/Button';
import DateUtility from "../../../utils/dateUtility";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

interface CalcAccRowProps {
    data;
    period;
}

const CalcAccRow: React.FC<CalcAccRowProps> = ({
    data,
    period
  }) => {
    console.log('period.vacationCode.name', period.vacationCode.name);
    console.log('period.from', period.from);

    let spanContractEnd;
    let dataContentContractEnd = "Dal {DateUtility.formatDate(period.contractEndFirstYearInPeriod)} potrai usufruire anticipatamente di tutti i giorni maturati fino alla fine di questo anno.";
    let spanPostPartum;
    let tdPostPartum;
    let dataContentPostPartum = "Utilizzando ulteriori {period.subDayToFixPostPartum} giorni di riduzione si perderà il diritto ad utilizzare i {period.subAmountBeforeFixedPostPartum} giorni maturati in questo periodo."

    period.contractEndFirstYearInPeriod ? (
              spanContractEnd = <>
              <span className="text-success"><i className="fa fa-info-circle"
                 popover-hover data-content={dataContentContractEnd}></i>
               </span>
               </>)
               : spanContractEnd = ''

     period.subDayToFixPostPartum > 0 ? (
      spanPostPartum = <>
              <span className="text-warning">
              <i className="fa fa-exclamation-triangle" popover-hover data-content={dataContentPostPartum}></i>
              </span>
              </>)
       : spanPostPartum = ''

      period.subDayPostPartum > 0 ? (
             tdPostPartum = <>
                  {period.subDayPostPartum}
                  ({period.subDayPostPartumProgression})
                  {spanPostPartum}
                  </>)
             : tdPostPartum = ''

    let className = period.subFixedPostPartum ? "bg-danger" :  period.subAccrued ? "bg-warning" : ""
    return(
            <>
            <tr className={className}>
              <td>{period.vacationCode.name}</td>
              <td>{DateUtility.formatDate(period.from)}</td>
              <td>{period.subAmount}</td>
              <td>
               {period.subAmountBeforeFixedPostPartum}
               {spanContractEnd}
              </td>
              <td><strong>{period.subTotalAmount}</strong></td>
              <td>{period.dayInInterval} ({period.subDayProgression})</td>
              {tdPostPartum}
            </tr>
            </>
    );
}

export default CalcAccRow