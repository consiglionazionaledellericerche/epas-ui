import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import PeopleTab from "./peopleTab";
import DateUtility from "../../utils/dateUtility";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface PeopleViewProps {
  data: any
}

const PeopleView: React.FC<PeopleViewProps> = ({
    data
  }) => {
    const [withContract, setWithContract] = useState([]);
    const [withoutContract, setWithoutContract] = useState([]);

    useEffect(() => {
        if (data?.personList) {
          setWithContract(data.personList.filter(person => person.currentContracts !== null));
          setWithoutContract(data.personList.filter(person => person.currentContracts === null));
        }
      }, [data]);

  return (
      <>
      <Container fluid>
        <Row>
          <Col sm={1} />
          <Col sm={9}>
          <div className="page-header">
              <h2>Lista del personale di {data.office.name}</h2>
              <br/>
          </div>
          {data?.personList && (
            <PeopleTab withContract={withContract} withoutContract={withoutContract} tabName="WITHCONTRACT"/>
          )}
          </Col>
          <Col sm={2} />
        </Row>
      </Container>
      </>
  );
}

export default PeopleView