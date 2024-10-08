import React from "react";
import Button from 'react-bootstrap/Button';
import DateUtility from "../../../utils/dateUtility";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle  } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import {AbsenceSubPeriod} from "../../../types/absenceSubPeriod";

interface CalcTotRowProps {
    subperiod: AbsenceSubPeriod;
}

const CalcTotRow: React.FC<CalcTotRowProps> = ({
    subperiod
  }) => {

    let spanPostPartum;
    let tdPostPartum;
    let dataContent=`Utilizzando ulteriori ${subperiod.subDayToFixPostPartum} giorni di riduzione si perderà il diritto ad utilizzare i ${subperiod.subAmountBeforeFixedPostPartum} giorni maturati in questo periodo.`

     subperiod.subDayToFixPostPartum && subperiod.subDayToFixPostPartum > 0 ?
      spanPostPartum = <>
              <span className="text-warning">
              <FontAwesomeIcon icon={faExclamationTriangle} data-tooltip-id="subdayTooltip" data-tooltip-content={dataContent} />
              <Tooltip id="subdayTooltip" />
              </span>
              </>
       : spanPostPartum = ''

      subperiod.subDayPostPartum && subperiod.subDayPostPartum > 0 ?
             tdPostPartum = <>
                  {subperiod.subDayPostPartum}
                  ({subperiod.subDayPostPartumProgression})
                  {spanPostPartum}
                  </>
             : tdPostPartum = ''
    let vacationcodeName = subperiod.vacationCode.name;
    let trID = vacationcodeName + "$" + DateUtility.formatDate(subperiod.from);

    return(
            <>
            <tr className={subperiod.subFixedPostPartum ? "bg-danger" : ""} key={trID}>
              <td>{vacationcodeName}</td>
              <td>{DateUtility.formatDate(subperiod.from)}</td>
              <td>
               {subperiod.subAmountBeforeFixedPostPartum}
              </td>
              <td><strong>{subperiod.subTotalAmount}</strong></td>
              <td>{subperiod.dayInInterval} ({subperiod.subDayProgression})</td>
              {tdPostPartum}
            </tr>
            </>
    );
}

export default CalcTotRow