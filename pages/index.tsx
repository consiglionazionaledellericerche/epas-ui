import React from 'react';
import dotenv from 'dotenv/config';
import { useSession } from 'next-auth/react';
import LoginTabbed from '../components/login/loginTabbed';
import LoginOauth from '../components/login/loginOauth';
import LoginLdap from '../components/login/loginLdap';
import { Col, Container, Row } from 'react-bootstrap';


const OAUTH_LOGIN = process.env.OAUTH_LOGIN;
const LDAP_LOGIN = process.env.LDAP_LOGIN;

const App: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    // Return a loading indicator if session status is still loading
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <>
      <h1 className="header">Benvenuto nella nuova UI di ePAS</h1>
      </>
    );
  }

  let loginElem;

  if (OAUTH_LOGIN === "true" && LDAP_LOGIN === "true") {
      console.log("LoginTabbed", OAUTH_LOGIN, LDAP_LOGIN);
      loginElem = <LoginTabbed />;
    } else {
    if (OAUTH_LOGIN === "true") {
      console.log("OAUTH_LOGIN", OAUTH_LOGIN);
      loginElem = <LoginOauth />;
    } else {
      console.log("LDAP_LOGIN", LDAP_LOGIN);
      loginElem = <LoginLdap />;
    }
  }

  return (
            <>
            <Container fluid>
              <Row>
                <Col sm={12} className="mx-auto text-center">
                  {' '}
                  <h2>Benvenuto in ePAS</h2>
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col sm={6} className="mx-auto text-center">
                  {loginElem}
                </Col>
              </Row>
            </Container>
            </>
            );
};

export default App;