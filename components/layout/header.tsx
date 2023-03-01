import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { signIn, signOut, useSession } from "next-auth/react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import PersonalDataMenu from './menu/personalDataMenu';
import PersonalWorkflowsMenu from './menu/personalWorkflowsMenu';
import SelectPeriod from './menu/selectPeriod'

function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <header className="bg-primary bg-gradient">

      <div className="">
        <p>
          {!session && (
            <>
              <span className="">
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className=""
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              <span className="">
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className=""
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>

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