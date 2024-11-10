import { Col, Container, Row } from "react-bootstrap";
import CompetencesTable from "./competencesTable";
import { Competences } from "../../types/competences";
import DateUtility from "../../utils/dateUtility";

interface CompetencesViewProps {
        data: Competences;
        year: number;
        month: number;
}

const CompetencesView: React.FC<CompetencesViewProps> = ({
    data,
    year,
    month
  }) => {

  let content = null;

  if (!data.personMonthCompetenceRecap || Object.keys(data.personMonthCompetenceRecap).length === 0) {
      content = <>
          <div className="alert alert-danger">
             <p>Risultano non correttamente inizializzati i dati sulle competenze effettuate nell'anno selezionato.</p>
             <p>Impossibile costruire la situazione richiesta.</p>
          </div>
      </>
  } else if (!data.competencesCode || data.competencesCode.length === 0) {
      content = <>
          <div className="alert alert-info">
             <p>
                Per questo mese non sono state assegnate competenze o non sono state abilitate.
              </p>
          </div>
      </>
  } else {
      content = <CompetencesTable
      competencesCode={data.competencesCode}
      year={year}
      month={month}/>
  }
  return (
      <>
      <Container fluid>
          <Row>
            <Col sm={1} />
            <Col sm={9}>
          <div className="page-header">
              <h2>Riepilogo competenze {DateUtility.getMonthName(month)} {year}</h2>
              <br/>
          </div>
          {content}
            </Col>
            <Col sm={2} />
          </Row>
      </Container>
      </>
  );
}

export default CompetencesView