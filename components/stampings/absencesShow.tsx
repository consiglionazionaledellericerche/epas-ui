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
}

const AbsencesShow: React.FC<AbsencesShowProps> = ({
    absences,
    year,
    month,
    day
  }) => {

  const intDay = parseInt(day, 10);
  let loop = absences.map((absence) => (
        <span key={`absence-popover-${month}-${day}-${absence.id}`}>
          <AbsencePopOver
          showGroup={true}
          absElem={absence}
          day={intDay}/>
        </span>
  ))

  return (<>
            {loop}
          </>
          );
}

export default AbsencesShow