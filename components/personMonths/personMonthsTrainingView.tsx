import { Col, Container, Row } from "react-bootstrap";
import PersonMonthsTrainingTable from "./personMonthsTrainingTable";
import { TrainingHours } from "../../types/trainingHours";

interface PersonMonthsTrainingViewProps {
        trainingData: TrainingHours;
        year: number
}

const PersonMonthsTrainingView: React.FC<PersonMonthsTrainingViewProps> = ({
    trainingData,
    year
  }) => {

  let person = trainingData.person;
  let utente = `${person?.name} ${person?.surname}`;
  return (
      <>
      <Container fluid>
          <div className="page-header">
              <h2>Ore di formazione {year} {utente}</h2>
              <br/>
          </div>
          <PersonMonthsTrainingTable trainingData={trainingData} year={year} />
      </Container>
      </>
  );
}

export default PersonMonthsTrainingView