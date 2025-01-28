import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Head from 'next/head';
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import PersonalDataMenu from './menu/personalDataMenu';
import PersonalWorkflowsMenu from './menu/personalWorkflowsMenu';
import CalendarsMenu from './menu/calendarsMenu';
import SelectPeriod from './menu/selectPeriod'
import dotenv from 'dotenv';
dotenv.config();

const NEXTAUTH_URL = process.env.NEXTAUTH_URL;

interface HeaderProps {
    title?: string
}

const  Header: React.FC<HeaderProps> = ({ title }) => {
  const { data: session, status } = useSession()

  const [personInfo, setPersonInfo] = useState<any>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [rolesOffice, setRolesOffice] = useState<string[]>([]);
  const loadingSession = status === "loading";

  useEffect(() => {
    const fetchUserType = async () => {
      if (session) {
        try {
          const res = await fetch('/api/rest/v4?endpoint=userinfo',
          { method: 'GET' });

          if (res.ok) {
            const data = await res.json();
            console.log("DATA USERINFO>>>> ", data);
            setRolesOffice(data.rolesOffice);
            setRoles(data.roles);
          } else {
            console.error("Errore nella chiamata API");
          }
        } catch (error) {
          console.error("Errore di rete", error);
        }
      }
    };
    const fetchPersonInfo = async () => {
      if (session) {
        try {
          const res = await fetch('/api/rest/v4?endpoint=personinfo%2Fextend',
          { method: 'GET' });

          if (res.ok) {
            const data = await res.json();
            console.log("DATA PERSONINFO>>>> ", data);
            setPersonInfo(data);
          } else {
            console.error("Errore nella chiamata API");
          }
        } catch (error) {
          console.error("Errore di rete", error);
        }
      }
    };
    fetchUserType();
    fetchPersonInfo();
  }, [session]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    // effettua il logout di Keycloak
    const logoutUrl = `https://auth.iit.cnr.it/auth/realms/testing/protocol/openid-connect/logout`;
    const redirectUrl = `${NEXTAUTH_URL}`;
    const keycloakLogoutUrl = `${logoutUrl}?redirect_uri=${redirectUrl}`;
    window.location.replace(keycloakLogoutUrl);
  };
  const isAdminOrDeveloper = ['ADMIN', 'DEVELOPER'].every(role => roles.includes(role));

  const isAdminRolesOffice = ["Amministratore Personale Sola lettura",
  "Amministratore Personale","Responsabile Sede","Gestore buoni pasto","Gestore anagrafica"].every(role => rolesOffice.includes(role));

  const isEmployee = rolesOffice.includes('Dipendente');

  const isGroupManager = ['Responsabile gruppo'].every(role => rolesOffice.includes(role));

  const isSeatManager = ["Amministratore Personale","Amministratore Personale Sola lettura",
  "Amministratore Tecnico","Responsabile Sede"].every(role => rolesOffice.includes(role));

  const hasShiftOrReperibility = personInfo && (personInfo.shiftCategories.length > 0
                                || personInfo.reperibilityTypes.length > 0
                                || personInfo.categories.length > 0
                                ||personInfo.reperibilities.length > 0);

  let navbarElem;
  if (loadingSession) {
    navbarElem = <><div>Caricamento...</div></>;
  } else if (session) {
    navbarElem = <>
      {isEmployee ? <PersonalDataMenu personInfo={personInfo}/> : ''}

      {/* <PersonalWorkflowsMenu /> */}

      {/*(isAdminOrDeveloper || isAdminRolesOffice) ? (
         <AdminMenu />
      )*/}

      {isAdminOrDeveloper || isAdminRolesOffice || hasShiftOrReperibility ?
        <CalendarsMenu/> : ''
      }

      {/*(isAdminOrDeveloper || isGroupManager) ? (
         <GroupMenu />
      )*/}

      {/*(isAdminOrDeveloper || isSeatManager) ? (
         <ConfigMenu />
      )*/}

      {/*(isAdminOrDeveloper ) ? (
         <ToolsMenu />
      )*/}

      <SelectPeriod/>
      <Nav className="ms-auto text-white">
        <Nav.Link className="text-white" onClick={handleSignOut}>
          Esci <FontAwesomeIcon icon={faRightFromBracket} />
        </Nav.Link>
      </Nav>
    </>;
  }

  return (<div>
  <Head >
  <title>{title}</title>
    </Head >
    <header className="bg-primary bg-gradient">
    <Navbar expand="lg" className="fixed-top">
        <Navbar.Brand className="text-white" href="#home">ePAS</Navbar.Brand>
        {navbarElem}
    </Navbar>
    </header>
    </div>
  );
}

export default Header