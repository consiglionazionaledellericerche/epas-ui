import { faCalendarDays, faUserXmark, faPlane, faCalendar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavDropdown } from "react-bootstrap"
import { useSession} from "next-auth/react"

function PersonalDataMenu() {

  let userLogon;
  const { data: session, status } = useSession()
    if(session) {
      userLogon = session.user.name;
    }

    return (
        <NavDropdown title={userLogon} id="personal-data">
            <NavDropdown.Item href="/stampings"><FontAwesomeIcon icon={faCalendarDays} /> Situazione mensile</NavDropdown.Item>
            {/*
            <NavDropdown.Item href="#action/3.2"><FontAwesomeIcon icon={faUserXmark} /> Assenze Mensili</NavDropdown.Item>
            */}
            <NavDropdown.Item href="/absences"><FontAwesomeIcon icon={faCalendar} /> Assenze Annuali</NavDropdown.Item>
            <NavDropdown.Item href="/vacations"><FontAwesomeIcon icon={faPlane} /> Ferie</NavDropdown.Item>
            {/*
            <NavDropdown.Item href="#action/3.5">Competenze</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.6">Ore di formazione</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.7">Riepilogo orario</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.8">Ruoli in ePAS all`interno della sede</NavDropdown.Item>

            <NavDropdown.Divider />

            <NavDropdown.Item href="#action/3.9">Esportazione periodica in Excel</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.10">Stampa cartellino presenze</NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.10">Cambio password</NavDropdown.Item>
            */}
      </NavDropdown>
    )
}

export default PersonalDataMenu