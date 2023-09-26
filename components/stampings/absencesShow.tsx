import { Absence } from "../../types/absence";
import { PersonDayRecap } from "../../types/personDayRecap";
import { StampingTemplate } from "../../types/stampingTemplate";
import AbsencePopOver from "../absences/absencePopOver";
import { useState } from 'react';

interface AbsencesShowProps {
    absences: Absence[];
    year: integer;
    month: string;
    day: string;
   setShowTooltip;
   setTooltipContent
}

const AbsencesShow: React.FC<AbsencesShowProps> = ({
    absences,
    year,
    month,
    day,
    setShowTooltip,
    setTooltipContent
  }) => {

  let loop = absences.map((absence) => (
        <span key={`absence-popover-${month}-${day}-${absence.id}`}>
          <AbsencePopOver showGroup={true} absencesRecap={absence} year={year} month={month} day={day}  setTooltipContent={setTooltipContent} setShowTooltip={setShowTooltip}/>
        </span>
  ))

  return (<>
            {loop}
          </>
          );
}

export default AbsencesShow