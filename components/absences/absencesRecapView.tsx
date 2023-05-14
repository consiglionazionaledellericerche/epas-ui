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
            <Col sm={2} />
            <Col sm={6}>
                  <div className="page-header">
                      <h2>Assenze Annuali {year}</h2>
                      <br/>
                  </div>
                  <AbsencesTable absencesRecap={absencesRecap} year={year} />
            </Col>
            <Col sm={2} />
          </Row>
      </Container>
      </>
  );
}

export default AbsencesRecapView