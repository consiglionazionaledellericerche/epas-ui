import { PersonDayRecap } from "../../types/personDayRecap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCutlery } from '@fortawesome/free-solid-svg-icons'

interface MealTicketShowProps {
    personDayRecap: PersonDayRecap
}

const MealTicketShow: React.FC<MealTicketShowProps> = ({
    personDayRecap
  }) => {
    let dataContent;
    let image;
    if (personDayRecap.personDay.ticketForcedByAdmin) {
        if (personDayRecap.mealTicket == 'NO') {
            dataContent = "&{'mealTicket.forcedNotAquired'}"
            image = 
            <>
                <FontAwesomeIcon icon={faBan} className="forced"/>
                <span className="sr-only sr-only-focusable">forzato a no</span>
            </>
        } else {
            dataContent = "&{'mealTicket.forcedAquired'}"
            image = 
            <>
                <FontAwesomeIcon icon={faCutlery} className="forced"/>
                <span className="sr-only sr-only-focusable">forzato a si</span>
            </>
        }
    } else {
        if (personDayRecap.mealTicket == 'NO') {
            dataContent = "&{'mealTicket.notAquired'}"
            image = 
            <>
                <FontAwesomeIcon icon={faBan}/>
                <span className="sr-only sr-only-focusable">no</span>
            </>
        }
        if (personDayRecap.mealTicket == 'NOT_YET') {
            dataContent = "&{'mealTicket.notYetAquired'}"
            image =
            <>
                <FontAwesomeIcon icon={faCutlery} className="notyet"/>
                <span className="sr-only sr-only-focusable">da maturare</span>
            </>
        }
        if (personDayRecap.mealTicket == 'YES') {
            dataContent = "&{'mealTicket.aquired'}"
            image =
            <>
                <FontAwesomeIcon icon={faCutlery}/>
                <span className="sr-only sr-only-focusable">si</span>
            </>
        }
        if (personDayRecap.mealTicket == 'YES_IF_EXIT_NOW') {
            dataContent = "&{'mealTicket.aquiredExitingNow'}"
            image =
            <>
                <FontAwesomeIcon icon={faCutlery} className="exitingnow"/>
                <span className="sr-only sr-only-focusable">si uscendo adesso</span>
            </>
        }
    }
    return (
        <td className="default-single" data-content={dataContent}>
            {image}
        </td>
    )
}

export default MealTicketShow