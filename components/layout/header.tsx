import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { signIn, signOut, useSession } from "next-auth/react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import PersonalDataMenu from './menu/personalDataMenu';
import PersonalWorkflowsMenu from './menu/personalWorkflowsMenu';
import SelectPeriod from './menu/selectPeriod'

function handleSignOut() {
  signOut({ callbackUrl: 'http://localhost:3000' })
}

function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  let navbarElem;

  if(session) {
   navbarElem = <>
                  <PersonalDataMenu />
                  {/*
                  <PersonalWorkflowsMenu />
                  */}
                  <SelectPeriod />
                  <Nav className="ms-auto text-white">
                    <Nav.Link className="text-white" onClick={handleSignOut}>Esci <FontAwesomeIcon icon={faRightFromBracket}/></Nav.Link>
                  </Nav>
               </>
  }

  return (
    <header className="bg-primary bg-gradient">
    <Navbar expand="lg" className="fixed-top">
        <Navbar.Brand className="text-white" href="#home">ePAS</Navbar.Brand>
        {navbarElem}
    </Navbar>
    </header>
  );
}

export default Header;