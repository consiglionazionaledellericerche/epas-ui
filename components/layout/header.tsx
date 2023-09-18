import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Head from 'next/head';
import { signIn, signOut, useSession, getToken } from "next-auth/react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import PersonalDataMenu from './menu/personalDataMenu';
import PersonalWorkflowsMenu from './menu/personalWorkflowsMenu';
import CalendarsMenu from './menu/calendarsMenu';
import SelectPeriod from './menu/selectPeriod'
import dotenv from 'dotenv/config';

const NEXTAUTH_URL = process.env.NEXTAUTH_URL;

function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    // effettua il logout di Keycloak
    const logoutUrl = `https://auth.iit.cnr.it/auth/realms/testing/protocol/openid-connect/logout`;
    const redirectUrl = `${NEXTAUTH_URL}`;
    const keycloakLogoutUrl = `${logoutUrl}?redirect_uri=${redirectUrl}`;
    window.location.replace(keycloakLogoutUrl);
  };

  let navbarElem;

  if(session) {
   navbarElem = <>
                  <PersonalDataMenu />
                  {/*
                  <PersonalWorkflowsMenu />
                  */}
                  <CalendarsMenu />
                  <SelectPeriod />
                  <Nav className="ms-auto text-white">
                    <Nav.Link className="text-white" onClick={handleSignOut}>Esci <FontAwesomeIcon icon={faRightFromBracket}/></Nav.Link>
                  </Nav>
               </>
  }

  return (<div>
  <Head>
  </Head>
    <header className="bg-primary bg-gradient">
    <Navbar expand="lg" className="fixed-top">
        <Navbar.Brand className="text-white" href="#home">ePAS</Navbar.Brand>
        {navbarElem}
    </Navbar>
    </header>
    </div>
  );
}

export default Header;