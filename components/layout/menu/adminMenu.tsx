import { faCalendarDays, faUserXmark, faPlane, faCalendar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavDropdown } from "react-bootstrap"

function AdminMenu() {
    return (        
        <NavDropdown title="Amministrazione" id="admin">
          <NavDropdown.Item href="/peopleList"><FontAwesomeIcon icon={faCalendarDays} /> Lista Persone</NavDropdown.Item>
        </NavDropdown>
    )
}

export default AdminMenu