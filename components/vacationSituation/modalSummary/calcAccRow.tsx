import React from "react";
import Button from 'react-bootstrap/Button';
import DateUtility from "../../../utils/dateUtility";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { useState, useEffect } from 'react';
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react"
import { useRequest } from "../../../request/useRequest"
import { Spinner } from 'react-bootstrap'
import { CalcAccRowElem} from './calcAccRowElem'

interface CalcAccRowProps {
    subperiod;
}

const CalcAccRow: React.FC<CalcAccRowProps> = ({
    subperiod
  }) => {

    let spanContractEnd;

    let dataContentContractEnd = `Dal ${DateUtility.formatDate(subperiod.contractEndFirstYearInPeriod)} potrai usufruire anticipatamente di tutti i giorni maturati fino alla fine di questo anno.`;
    let spanPostPartum;
    let tdPostPartum;
    let dataContentPostPartum = `Utilizzando ulteriori ${subperiod.subDayToFixPostPartum} giorni di riduzione si perderà il diritto ad utilizzare i ${subperiod.subAmountBeforeFixedPostPartum} giorni maturati in questo periodo.`

    subperiod.contractEndFirstYearInPeriod ? (
              spanContractEnd = <>
              <span className="text-success">
              <FontAwesomeIcon icon={faCircleInfo} data-tooltip-id="dataContentContractEndTooltip" data-tooltip-content={dataContentContractEnd} />
              <Tooltip id="dataContentContractEndTooltip" />
               </span>
               </>)
               : spanContractEnd = ''

     subperiod.subDayToFixPostPartum > 0 ? (
      spanPostPartum = <>
              <span className="text-warning">
              <FontAwesomeIcon icon={faExclamationTriangle} data-tooltip-id="dataContentPostPartumTooltip" data-tooltip-content={dataContentPostPartum} />
              <Tooltip id="dataContentPostPartumTooltip" />
              </span>
              </>)
       : spanPostPartum = ''

      subperiod.subDayPostPartum > 0 ? (
             tdPostPartum = <>
                  {subperiod.subDayPostPartum}
                  ({subperiod.subDayPostPartumProgression})
                  {spanPostPartum}
                  </>)
             : tdPostPartum = ''

    let vacationcodeName = subperiod.vacationCode.name;
    let className = subperiod.subFixedPostPartum ? "bg-danger" :  subperiod.subAccrued ? "" : "bg-warning";

    let trID = vacationcodeName + "$" + DateUtility.formatDate(subperiod.from);
    return(
            <>
            <tr className={className} key={trID}>
              <td>{vacationcodeName}</td>
              <td>{DateUtility.formatDate(subperiod.from)}</td>
              <td>
               {subperiod.subAmountBeforeFixedPostPartum}
               {spanContractEnd}
              </td>
              <td><strong>{subperiod.subTotalAmount}</strong></td>
              <td>{subperiod.dayInInterval} ({subperiod.subDayProgression})</td>
              {tdPostPartum}
            </tr>
            </>
    );

}

export default CalcAccRow