import { AbsenceShow } from "../../types/absenceShow";
import { PersonDayRecap } from "../../types/personDayRecap";
import { StampingTemplate } from "../../types/stampingTemplate";
import AbsencePopOver from "../absences/absencePopOver";
import { useState } from 'react';

interface AbsencesShowProps {
   absences: AbsenceShow[];
   year: number;
   month: number;
   day: string;
   setShowTooltip: Function;
   setTooltipContent: Function
}

const AbsencesShow: React.FC<AbsencesShowProps> = ({
    absences,
    year,
    month,
    day,
    setShowTooltip,
    setTooltipContent
  }) => {

  const intDay = parseInt(day, 10);
  let loop = absences.map((absence) => (
        <span key={`absence-popover-${month}-${day}-${absence.id}`}>
          <AbsencePopOver showGroup={true} item={absence} day={intDay} setTooltipContent={setTooltipContent} setShowTooltip={setShowTooltip}/>
        </span>
  ))

  return (<>
            {loop}
          </>
          );
}

export default AbsencesShow