import { Col, Container, Row } from "react-bootstrap";
import VacationRecapTable from "./vacationRecapTable";
import {VacationData} from "../../types/vacationData";
import PermissionGroupList from "./permissionGroupList";
import VacationPeriodTable from "./vacationPeriodTable";

interface VacationSituationView {
        year: int;
        data: VacationData;
}

const VacationSituationView: React.FC<VacationSituationProps> = ({
    year,
    data
  }) => {
console.log("DATA>>>", data)
  return (
      <>
      <h4>Ferie e Permessi {year}</h4>
      <Container fluid>
          <Row>
              <Col sm={6}>
                  <VacationRecapTable vacationSituations={data.vacationSituations} tableName="tabellaFerie"/>
              </Col>
              <Col sm={6}>
                  <VacationRecapTable vacationSituations={data.vacationSituations} tableName="tabellaPermessi"/>
              </Col>
          </Row>
          <br/>
          <Row>
              <Col sm={12}>
                  <PermissionGroupList periodChain={data.periodChain} />
              </Col>
          </Row>
          <Row>
              <Col sm={12}>
                  <VacationPeriodTable contracts={data.contracts} />
              </Col>
          </Row>
      </Container>
      </>
  );
}

export default VacationSituationView