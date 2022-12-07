import { Col, Container, Row } from "react-bootstrap";
import StampingsTable from "../stampings/stampingsTable";
import { MonthRecap } from "../../types/monthRecap";
import HoursRecap from "./hoursRecap";
import MealTicketsRecap from "./mealTicketsRecap";

interface MonthRecapProps {
        monthRecap: MonthRecap;
        month: integer;
        year: integer
}

const MonthRecapView: React.FC<MonthRecapProps> = ({
    monthRecap,
    month,
    year
  }) => {

  return (
      <>
      <Container fluid>
          <Row>
              <Col sm={8}>
                  <StampingsTable monthRecap={monthRecap} year={year} month={month} />
              </Col>
              <Col sm={4}>
                  <HoursRecap monthRecap={monthRecap} />
                  <MealTicketsRecap monthRecap={monthRecap} />
              </Col>
          </Row>
      </Container>
      </>
  );
}

export default MonthRecapView