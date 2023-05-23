import { Absence } from "../../types/absence";
import { PersonDayRecap } from "../../types/personDayRecap";
import { StampingTemplate } from "../../types/stampingTemplate";
import AbsenceYearlyRecapRow from "../absences/absenceYearlyRecapRow";

interface AbsencesShowProps {
    absences: Absence[];
    year: integer;
    month: string;
    day: string;
}

const AbsencesShow: React.FC<AbsencesShowProps> = ({
    absences,
    year,
    month,
    day
  }) => {

  let loop = absences.map((absence) => (
        <>
        <span>
         <AbsenceYearlyRecapRow key={`${month}-${day}`} absencesRecap={absence} year={year} month={month} day={day}/>
         </span>
        </>
                         ))

  return (<>
  {loop}
  </>
          );
}

export default AbsencesShow