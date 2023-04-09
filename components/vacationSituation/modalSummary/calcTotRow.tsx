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

const { data: session, status } = useSession()
const accessToken = session?.accessToken;

const [isLoading, setIsLoading] = useState(true);
const { result, error } = useRequestPost('/vacations/summary/subperiod?' + period.from, JSON.stringify({ "summary": data, "period": period }), accessToken);

useEffect(() => {
  if (result !== undefined) {
    setIsLoading(false);
  }
}, [result]);


if (error) return <div>Impossibile caricare la situazione annuale</div>
if (isLoading) return <React.Suspense fallback={<Spinner />} />
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
    let vacationcodeName = period.vacationCode.name;
    let trID = vacationcodeName + "$" + DateUtility.formatDate(period.from);

    return(
            <>
            <tr className={result.subFixedPostPartum ? "bg-danger" : ""} key={trID}>
              <td>{vacationcodeName}</td>
              <td>{DateUtility.formatDate(period.from)}</td>
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