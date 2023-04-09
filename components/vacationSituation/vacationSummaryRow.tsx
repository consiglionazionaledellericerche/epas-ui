import React from "react";
import { VacationSummary } from "../../types/vacationSummary";
import Button from 'react-bootstrap/Button';

interface VacationSummaryRowProps {
    vacationSummary: VacationSummary;
    param: string;
    setModal;
    setParameters;
}

const VacationSummaryRow: React.FC<VacationSummaryRowProps> = ({
    vacationSummary,
    param,
    setModal,
    setParameters,
    setTitleModal
  }) => {

    function setModalParam(){
      setModal(true);
      setParameters(param);
      setTitleModal(vacationSummary.title);
    }

    let idRow = vacationSummary.year;

    return(<>
          <tr key={idRow}>
            <td>{vacationSummary.year}</td>
            <td>{vacationSummary.total} ({vacationSummary.accrued})</td>
            <td>
               <a id="last-year-used" data-async-modal="#defaultModal" href="javascript:void(0)" onClick={() => setModalParam()}>
                  {vacationSummary.used}
               </a>
            </td>
            <td>{vacationSummary.usableTotal}
               ({vacationSummary.usable})
            </td>
          </tr>
          </>
    );
}

export default VacationSummaryRow