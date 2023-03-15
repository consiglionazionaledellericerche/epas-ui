import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import LoginTabbed from '../components/login/loginTabbed';
import { Col, Container, Row } from "react-bootstrap";

const App: React.FC = () => {

  const { data: session, status } = useSession()
    if(session) {
      const accessToken = session.accessToken
      return <>
        Signed in as {session.user.name} <br/>
        <button onClick={() => signOut()}>Sign out</button>
          <h1 className="header">
            Benvenuto nella nuova UI di ePAS
          </h1>
        </>
    }
    return <>
    <Container fluid>
      <Row>
          <Col sm={12} className="mx-auto text-center"> <h2>Benvenuto in ePAS</h2></Col>
      </Row>
      <Row>
      <Col sm={3} className="mx-auto text-center">
      <LoginTabbed />
      </Col>
      </Row>
    </Container>

    </>
};

export default App;