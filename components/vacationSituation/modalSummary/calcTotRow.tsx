import React from "react";
import Button from 'react-bootstrap/Button';
import DateUtility from "../../../utils/dateUtility";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle  } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { useState, useEffect } from 'react';
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react"
import { useRequestPost } from "../../../request/useRequest"
import { Spinner } from 'react-bootstrap'

interface CalcTotRowProps {
    data;
    period;
}

const CalcTotRow: React.FC<CalcTotRowProps> = ({
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

    let spanPostPartum;
    let tdPostPartum;
    let dataContent=`Utilizzando ulteriori ${result.subDayToFixPostPartum} giorni di riduzione si perderà il diritto ad utilizzare i ${period.subAmountBeforeFixedPostPartum} giorni maturati in questo periodo.`

     result.subDayToFixPostPartum > 0 ?
      spanPostPartum = <>
              <span className="text-warning">
              <FontAwesomeIcon icon={faExclamationTriangle} data-tooltip-id="subdayTooltip" data-tooltip-content={dataContent} />
              <Tooltip id="subdayTooltip" />
              </span>
              </>
       : spanPostPartum = ''

      result.subDayPostPartum > 0 ?
             tdPostPartum = <>
                  {result.subDayPostPartum}
                  ({result.subDayPostPartumProgression})
                  {spanPostPartum}
                  </>
             : tdPostPartum = ''

    return(
            <>
            <tr className={result.subFixedPostPartum ? "bg-danger" : ""}>
              <td>{period.vacationCode}</td>
              <td>{DateUtility.formatDate(period.from)}</td>
              <td>{period.subAmount}</td>
              <td>
               {result.subAmountBeforeFixedPostPartum}
              </td>
              <td><strong>{result.subTotalAmount}</strong></td>
              <td>{result.dayInInterval} ({result.subDayProgression})</td>
              {tdPostPartum}
            </tr>
            </>
    );
}

export default CalcTotRow