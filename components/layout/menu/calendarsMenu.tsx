import { faCalendarDays, faUserXmark, faPlane, faCalendar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavDropdown } from "react-bootstrap"

function CalendarsMenu() {
    return (        
        <NavDropdown title="Calendari" id="calendars">
          <NavDropdown.Item href="/stampings"><FontAwesomeIcon icon={faCalendarDays} /> Calendario turni</NavDropdown.Item>
          <NavDropdown.Item href="/reperibility"><FontAwesomeIcon icon={faCalendarDays} /> Calendario reperibilit&agrave;</NavDropdown.Item>
        </NavDropdown>
    )
}

export default CalendarsMenu