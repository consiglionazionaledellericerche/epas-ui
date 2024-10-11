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
          <div className="page-header">
              <h2>Riepilogo Ore {year}</h2>
              <br/>
          </div>
          <PersonMonthsHourTable personMonthsData={personMonthsData} year={year} />
      </Container>
      </>
  );
}

export default PersonMonthsView