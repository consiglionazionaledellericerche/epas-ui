import React from "react";
import { VacationSummary } from "../../types/vacationSummary";
import Button from 'react-bootstrap/Button';

interface VacationSummaryRowProps {
    vacationSummary: VacationSummary;
    setModal;
}

const VacationSummaryRow: React.FC<VacationSummaryRowProps> = ({
    vacationSummary,
    setModal
  }) => {

    return(
          <tr>
            <td>{vacationSummary.year}</td>
            <td>{vacationSummary.total} ({vacationSummary.accrued})</td>
            <td>
               <a id="last-year-used" data-async-modal="#defaultModal" href="javascript:void(0)" onClick={() => setModal(true)}>
                  {vacationSummary.used}
               </a>
            </td>
            <td>{vacationSummary.usableTotal}
               ({vacationSummary.usable})
            </td>
          </tr>
    );
}

export default VacationSummaryRow