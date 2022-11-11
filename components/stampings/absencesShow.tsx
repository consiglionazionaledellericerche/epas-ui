import { Absence } from "../../types/absence";
import { PersonDayRecap } from "../../types/personDayRecap";
import { StampingTemplate } from "../../types/stampingTemplate";

interface AbsencesShowProps {
    absences: Absence[]
}

const AbsencesShow: React.FC<AbsencesShowProps> = ({
    absences
  }) => {
    return (
        <>
        {absences.map((absence) => (
            <span key={absence.id}>{absence.code}</span>
        ))}
        </>
    )
}

export default AbsencesShow