import { faCalendarDays, faMoneyBill, faUserXmark, faPlane, faCalendar, faClock,faGraduationCap, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavDropdown } from "react-bootstrap"
import { useSession} from "next-auth/react"
import { PersonShowExtended } from "../../../types/personShowExtended";

interface PersonalDataMenuProps {
  personInfo: PersonShowExtended;
}

const PersonalDataMenu: React.FC<PersonalDataMenuProps> = ({ personInfo }) => {

  let userLogon;
  const { data: session, status } = useSession()
    if(session && session.user) {
      userLogon = session.user.name;
    }

    return (
        <NavDropdown title={userLogon} id="personal-data">
            <NavDropdown.Item href="/stampings"><FontAwesomeIcon icon={faCalendarDays} /> Situazione mensile</NavDropdown.Item>
            <NavDropdown.Item href="/absencesMonthly"><FontAwesomeIcon icon={faUserXmark} /> Assenze Mensili</NavDropdown.Item>
            <NavDropdown.Item href="/absencesYearly"><FontAwesomeIcon icon={faCalendar} /> Assenze Annuali</NavDropdown.Item>
            <NavDropdown.Item href="/vacations"><FontAwesomeIcon icon={faPlane} /> Ferie</NavDropdown.Item>
            <NavDropdown.Item href="/competences"><FontAwesomeIcon icon={faMoneyBill} /> Competenze</NavDropdown.Item>
            { (personInfo?.personShifts ?? []).length>0 ?
              <NavDropdown.Item href="/reperibility">
              <FontAwesomeIcon icon={faCalendarDays} />&nbsp;
               Calendario turni
               </NavDropdown.Item> : ''
            }
            { personInfo && personInfo.available ?
              <NavDropdown.Item href="/reperibility">
              <FontAwesomeIcon icon={faCalendarDays} />&nbsp;
              Calendario reperibilit&agrave;
              </NavDropdown.Item> : ''
            }
            <NavDropdown.Item href="/trainingRecap"><FontAwesomeIcon icon={faGraduationCap} /> Ore di formazione</NavDropdown.Item>
            <NavDropdown.Item href="/personMonthsHoursRecap"><FontAwesomeIcon icon={faClock} /> Riepilogo orario</NavDropdown.Item>
            <NavDropdown.Item href="/mealTicketsRecap"><FontAwesomeIcon icon={faUtensils} /> Riepilogo buoni pasto</NavDropdown.Item>
            {/*
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