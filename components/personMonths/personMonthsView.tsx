import { Col, Container, Row } from "react-bootstrap";
import PersonMonthsHourTable from "./personMonthsHourTable";
import { PersonMonth } from "../../types/personMonth";

interface PersonMonthsViewProps {
        personMonthsData: PersonMonth[];
        year: number
}

const PersonMonthsView: React.FC<PersonMonthsViewProps> = ({
    personMonthsData,
    year
  }) => {
  return (
      <>
      <Container fluid>
        <Row>
          <Col sm={1} />
          <Col sm={9}>
          <div className="page-header">
              <h2>Riepilogo Ore {year}</h2>
              <br/>
          </div>
          <PersonMonthsHourTable personMonthsData={personMonthsData} year={year} />
         </Col>
          <Col sm={2} />
        </Row>
      </Container>
      </>
  );
}

export default PersonMonthsView