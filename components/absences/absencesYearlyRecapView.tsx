import { Col, Container, Row } from "react-bootstrap";
import AbsencesYearlyTable from "./absencesYearlyTable";
import { AbsenceShow } from "../../types/absenceShow";

interface AbsencesYearlyRecapViewProps {
        absencesRecap: AbsenceShow[];
        year: number
}

const AbsencesYearlyRecapView: React.FC<AbsencesYearlyRecapViewProps> = ({
    absencesRecap,
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
                  <AbsencesYearlyTable absencesRecap={absencesRecap} year={year} />
            </Col>
            <Col sm={2} />
          </Row>
      </Container>
      </>
  );
}

export default AbsencesYearlyRecapView