import React from "react";
import Button from 'react-bootstrap/Button';
import DateUtility from "../../../utils/dateUtility";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle  } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

interface CalcTotRowProps {
    data;
    period;
}

const CalcTotRow: React.FC<CalcTotRowProps> = ({
    data,
    period
  }) => {
    let spanPostPartum;
    let tdPostPartum;
    let dataContent=`Utilizzando ulteriori ${period.subDayToFixPostPartum} giorni di riduzione si perderà il diritto ad utilizzare i ${period.subAmountBeforeFixedPostPartum} giorni maturati in questo periodo.`

     period.subDayToFixPostPartum > 0 ?
      spanPostPartum = <>
              <span className="text-warning">
              <FontAwesomeIcon icon={faExclamationTriangle} data-tooltip-id="subdayTooltip" data-tooltip-content={dataContent} />
              <Tooltip id="subdayTooltip" />
              </span>
              </>
       : spanPostPartum = ''

      period.subDayPostPartum > 0 ?
             tdPostPartum = <>
                  {period.subDayPostPartum}
                  ({period.subDayPostPartumProgression})
                  {spanPostPartum}
                  </>
             : tdPostPartum = ''

    return(
            <>
            <tr className={period.subFixedPostPartum ? "bg-danger" : ""}>
              <td>{period.vacationCode.name}</td>
              <td>{DateUtility.formatDate(period.from)}</td>
              <td>{period.subAmount}</td>
              <td>
               {period.subAmountBeforeFixedPostPartum}
              </td>
              <td><strong>{period.subTotalAmount}</strong></td>
              <td>{period.dayInInterval} ({period.subDayProgression})</td>
              {tdPostPartum}
            </tr>
            </>
    );
}

export default CalcTotRow