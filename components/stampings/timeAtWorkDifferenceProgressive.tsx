import { PersonDayRecap } from "../../types/personDayRecap";
import DateUtility from "../../utils/dateUtility";

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
                DateUtility.fromMinuteToHourMinute(personDayRecap.personDay.timeAtWork)
            }
        </td>
        <td className={`differenza default-single${personDayRecap.personDay.difference < 0 ? ' valore-negativo' : ''}`}>
            {personDayRecap.personDay.future ? '' : DateUtility.fromMinuteToHourMinute(personDayRecap.personDay.difference)}
        </td>
        <td className={`progressivo default-single${personDayRecap.personDay.progressive < 0 ? ' valore-negativo' : ''}`}>
            {personDayRecap.personDay.future ? '' : DateUtility.fromMinuteToHourMinute(personDayRecap.personDay.progressive)}
        </td>
        </>
    )
}

export default TimeAtWorkDifferenceProgressive