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
import { useRequestPost } from "../../../request/useRequest"
import { Spinner } from 'react-bootstrap'
import { CalcAccRowElem} from './calcAccRowElem'

interface CalcAccRowProps {
    data;
    period;
}

const CalcAccRow: React.FC<CalcAccRowProps> = ({
    data,
    period
  }) => {
    console.log('period.vacationCode.name', period.vacationCode);
    console.log('period.from', period.from);

const { data: session, status } = useSession()
const accessToken = session?.accessToken;

const [isLoading, setIsLoading] = useState(true);
const { result, error } = useRequestPost('/vacations/summary/subperiod?' + period.from, JSON.stringify({ "summary": data, "period": period }), accessToken);

useEffect(() => {
  if (result !== undefined) {
    setIsLoading(false);
  }
}, [result]);


  console.log('error', error);
  console.log('isLoading', isLoading);

    console.log('result', result);

if (error) return <div>Impossibile caricare la situazione annuale</div>
if (isLoading) return <React.Suspense fallback={<Spinner />} />
    console.log('result > CalcAccRowElem', result);
    console.log('period', period);
    let spanContractEnd;

    let dataContentContractEnd = `Dal ${DateUtility.formatDate(period.contractEndFirstYearInPeriod)} potrai usufruire anticipatamente di tutti i giorni maturati fino alla fine di questo anno.`;
    let spanPostPartum;
    let tdPostPartum;
    let dataContentPostPartum = `Utilizzando ulteriori ${period.subDayToFixPostPartum} giorni di riduzione si perderà il diritto ad utilizzare i ${period.subAmountBeforeFixedPostPartum} giorni maturati in questo periodo.`

console.log('result pippo',result);
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
                  {result.subDayPostPartum}
                  ({result.subDayPostPartumProgression})
                  {spanPostPartum}
                  </>)
             : tdPostPartum = ''

    let className = result.subFixedPostPartum ? "bg-danger" :  result.subAccrued ? "bg-warning" : ""
    return(
            <>
            <tr className={className}>
              <td>{period.vacationCode}</td>
              <td>{DateUtility.formatDate(period.from)}</td>
              <td>
               {result.subAmountBeforeFixedPostPartum}
               {spanContractEnd}
              </td>
              <td><strong>{result.subTotalAmount}</strong></td>
              <td>{result.dayInInterval} ({result.subDayProgression})</td>
              {tdPostPartum}
            </tr>
            </>
    );

}

export default CalcAccRow