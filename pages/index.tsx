import React from 'react';
import { useSession} from "next-auth/react"
import LoginTabbed from '../components/login/loginTabbed';
import { Col, Container, Row } from "react-bootstrap";

const App: React.FC = () => {

  const { data: session, status } = useSession()
    if(session) {
      return <>
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