import { Col, Container, Row } from "react-bootstrap";
import AbsencesTable from "./absencesTable";

interface AbsencesRecapViewProps {
        absencesRecap: Absence[];
        year: integer
}

const AbsencesRecapView: React.FC<AbsencesRecapProps> = ({
    absencesRecap,
    month,
    year
  }) => {

  return (
      <>
      <Container fluid>
          <Row>
              <Col sm={12}>
                  <AbsencesTable absencesRecap={absencesRecap} year={year} />
              </Col>
          </Row>
      </Container>
      </>
  );
}

export default AbsencesRecapView