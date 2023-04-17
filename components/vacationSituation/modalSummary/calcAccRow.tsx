import React from "react";
import Button from 'react-bootstrap/Button';
import DateUtility from "../../../utils/dateUtility";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

interface CalcAccRowProps {
    data;
    period;
}

const CalcAccRow: React.FC<CalcAccRowProps> = ({
    data,
    period
  }) => {
    let spanContractEnd;
    let dataContentContractEnd = `Dal ${DateUtility.formatDate(period.contractEndFirstYearInPeriod)} potrai usufruire anticipatamente di tutti i giorni maturati fino alla fine di questo anno.`;
    let spanPostPartum;
    let tdPostPartum;
    let dataContentPostPartum = `Utilizzando ulteriori ${period.subDayToFixPostPartum} giorni di riduzione si perderà il diritto ad utilizzare i ${period.subAmountBeforeFixedPostPartum} giorni maturati in questo periodo.`

    period.contractEndFirstYearInPeriod ? (
              spanContractEnd = <>
              <span className="text-success">
              <FontAwesomeIcon icon={faCircleInfo} data-tooltip-id="dataContentContractEndTooltip" data-tooltip-content={dataContentContractEnd} />
              <Tooltip id="dataContentContractEndTooltip" />
               </span>
               </>)
               : spanContractEnd = ''

     period.subDayToFixPostPartum > 0 ? (
      spanPostPartum = <>
              <span className="text-warning">
              <FontAwesomeIcon icon={faExclamationTriangle} data-tooltip-id="dataContentPostPartumTooltip" data-tooltip-content={dataContentPostPartum} />
              <Tooltip id="dataContentPostPartumTooltip" />
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