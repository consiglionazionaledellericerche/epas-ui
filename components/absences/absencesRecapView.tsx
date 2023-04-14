import { Col, Container, Row } from "react-bootstrap";
import AbsencesTable from "./absencesTable";
// import { AbsencesRecap } from "../../types/absencesRecap";

interface AbsencesRecapViewProps {
        absencesRecap: string;
        month: integer;
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
                  <AbsencesTable absencesRecap={absencesRecap} year={year} month={month} />
              </Col>
          </Row>
      </Container>
      </>
  );
}

export default AbsencesRecapView