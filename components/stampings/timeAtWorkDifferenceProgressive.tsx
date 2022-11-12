import { PersonDayRecap } from "../../types/personDayRecap";

interface TimeAtWorkDifferenceProgressiveProps {
    personDayRecap: PersonDayRecap
}

const TimeAtWorkDifferenceProgressive: React.FC<TimeAtWorkDifferenceProgressiveProps> = ({
    personDayRecap
  }) => {
    return (
        <>
        <td>
            {!personDayRecap.personDay.future && 
                personDayRecap.personDay.timeAtWork
            }
        </td>
        <td className={`differenza default-single${personDayRecap.personDay.difference < 0 ? ' valore-negativo' : ''}`}>
            {personDayRecap.personDay.future ? '' : personDayRecap.personDay.difference}
        </td>
        <td className={`progressivo default-single${personDayRecap.personDay.progressive < 0 ? ' valore-negativo' : ''}`}>
            {personDayRecap.personDay.future ? '' : personDayRecap.personDay.progressive}
        </td>
        </>
    )
}

export default TimeAtWorkDifferenceProgressive