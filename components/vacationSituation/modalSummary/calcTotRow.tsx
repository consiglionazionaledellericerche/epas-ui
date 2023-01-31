import React from "react";
import Button from 'react-bootstrap/Button';
import DateUtility from "../../../utils/dateUtility";

interface CalcTotRowProps {
    data;
    period;
}

const CalcTotRow: React.FC<CalcTotRowProps> = ({
    data,
    period
  }) => {
    console.log('period.vacationCode.name', period.vacationCode.name);
    console.log('period.from', period.from);


    let spanPostPartum;
    let tdPostPartum;
    let dataContent="Utilizzando ulteriori {period.subDayToFixPostPartum} giorni di riduzione si perderà il diritto ad utilizzare i {period.subAmountBeforeFixedPostPartum} giorni maturati in questo periodo."

     period.subDayToFixPostPartum > 0 ?
      spanPostPartum = <>
              <span className="text-warning">
              <i className="fa fa-exclamation-triangle" popover-hover data-content={dataContent}></i>
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
               {data.subAmountBeforeFixedPostPartum}
              </td>
              <td><strong>{period.subTotalAmount}</strong></td>
              <td>{period.dayInInterval} ({period.subDayProgression})</td>
              {tdPostPartum}
            </tr>
            </>
    );
}

export default CalcTotRow