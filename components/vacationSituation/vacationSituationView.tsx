import React, { useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import VacationRecapTable from "./vacationRecapTable";
import {VacationData} from "../../types/vacationData";
import PermissionGroupList from "./permissionGroupList";
import VacationPeriodTable from "./vacationPeriodTable";
import VacationModal from "./vacationModal";


interface VacationSituationProps {
        year: number;
        month: number;
        data: VacationData
}

const VacationSituationView: React.FC<VacationSituationProps> = ({
    year,
    month,
    data
  }) => {
  const [titleModal, setTitleModal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [parameters, setParameters] = useState("");

  return (
      <>
       <VacationModal title={titleModal} tmpshow={showModal} close={() => setShowModal(false)} parameters={parameters} />
       <div className="container">
        <div className="page-header">
            <h2>Ferie e Permessi {year}</h2>
            <br/>
        </div>
        { data.vacationSituations?.map((vsr) => {
         let param = "personId="+vsr.personId+"&month=1&contractId="+vsr.contract.id;
         return (
          <Row key="VacationRecapTable">
                <Col sm={6}>
                    <VacationRecapTable vacationSituation={vsr} tableName="tabellaFerie" setTitleModal={setTitleModal} setModal={setShowModal} setParameters={setParameters} param={param} />
                </Col>
                <Col sm={6}>
                    <VacationRecapTable vacationSituation={vsr} tableName="tabellaPermessi" setTitleModal={setTitleModal} setModal={setShowModal} setParameters={setParameters} param={param} />
                </Col>
          </Row> );
        }

         )}
          <br/>
          <Row key="PermissionGroupList">
              <Col sm={12}>
                  <PermissionGroupList periodChain={data.periodChain} />
              </Col>
          </Row>
          <Row key="VacationPeriodTable">
              <Col sm={12}>
                  <VacationPeriodTable contracts={data.contracts} />
              </Col>
          </Row>
      </div>
      </>
  );
}

export default VacationSituationView