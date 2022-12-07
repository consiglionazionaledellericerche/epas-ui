import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import PersonalDataMenu from './menu/personalDataMenu';
import PersonalWorkflowsMenu from './menu/personalWorkflowsMenu';
import SelectPeriod from './menu/selectPeriod'

function Header() {
  return (
    <header className="bg-primary bg-gradient">
    <Navbar expand="lg" className="fixed-top">
        <Navbar.Brand className="text-white" href="#home">ePAS</Navbar.Brand>
        <PersonalDataMenu />
        <PersonalWorkflowsMenu />
        <SelectPeriod />
        <Nav className="ms-auto text-white">
          <Nav.Link className="text-white" href="#exit">Esci <FontAwesomeIcon icon={faRightFromBracket}/></Nav.Link>
        </Nav>
    </Navbar>
    </header>
  );
}

export default Header;