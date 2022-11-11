import { NavbarBrand, NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faCalendarDays, faUserXmark } from '@fortawesome/free-solid-svg-icons'

function Header() {
  return (
    <header className="bg-primary bg-gradient">
    <Navbar expand="lg" className="fixed-top">
        <Navbar.Brand className="text-white" href="#home">ePAS</Navbar.Brand>
        <NavDropdown title="cristian.lucchesi" id="personal-data">
          <NavDropdown.Item href="/stampings"><FontAwesomeIcon icon={faCalendarDays} /> Situazione mensile</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2"><FontAwesomeIcon icon={faUserXmark} /> Assenze Mensili</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Assenze Annuali</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.4">Ferie</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.5">Competenze</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.6">Ore di formazione</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.7">Riepilogo orario</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.8">Ruoli in ePAS all`interno della sede</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.9">Esportazione periodica in Excel</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.10">Stampa cartellino presenze</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.10">Cambio password</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Flussi di lavoro" id="personal-workflows">
          <NavDropdown.Item href="#action/3.1">Mie richieste di cambio reperibilità</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.9">Mie richieste di ferie</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.9">Mie riposi compensativi</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.9">Mie permessi personali</NavDropdown.Item>
        </NavDropdown>
        <Nav className="ms-auto text-white">
          <Nav.Link className="text-white" href="#exit">Esci <FontAwesomeIcon icon={faRightFromBracket}/></Nav.Link>
        </Nav>
    </Navbar>
    </header>
  );
}

export default Header;