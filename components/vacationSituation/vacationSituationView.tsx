import React, { useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import VacationRecapTable from "./vacationRecapTable";
import {VacationData} from "../../types/vacationData";
import PermissionGroupList from "./permissionGroupList";
import VacationPeriodTable from "./vacationPeriodTable";
import VacationModal from "./vacationModal";


interface VacationSituationView {
        year: int;
        month: int;
        data: VacationData;
}

const VacationSituationView: React.FC<VacationSituationProps> = ({
    year,
    month,
    data
  }) => {

  const [showModal, setShowModal] = useState(false);
  const [parameters, setParameters] = useState("");

  return (
      <>
      <VacationModal show={showModal} close={() => setShowModal(false)} parameters={parameters}/>
      <h4>Ferie e Permessi {year}</h4>

      <Container fluid>
        {data.vacationSituations?.map((vsr) => (
         let param = "personId="+vsr.personId+"&year="+vsr.year+"&month=1&contractId="+vsr.contract.id+"&type=VACATION";
         setParameters(param);

            <Row>
                <Col sm={6}>
                    <VacationRecapTable vacationSituation={vsr} tableName="tabellaFerie" setModal={setShowModal}/>
                </Col>
                <Col sm={6}>
                    <VacationRecapTable vacationSituation={vsr} tableName="tabellaPermessi" setModal={setShowModal}/>
                </Col>
            </Row>
            ))
          }
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