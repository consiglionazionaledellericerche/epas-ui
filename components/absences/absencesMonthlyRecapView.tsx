import { Col, Container, Row } from "react-bootstrap";
import { Table } from "react-bootstrap";
import DateUtility from "../../utils/dateUtility";
import AbsencesMonthlyTable from "./absencesMonthlyTable";
import AbsencesMonthlyModal from "./absencesMonthlyModal";
import { useState } from 'react';
import { AbsenceType } from "../../types/absenceType";

interface AbsencesMonthlyRecapViewProps {
        absencesRecap: AbsenceType[];
        month: string
        year: number;
}

const AbsencesMonthlyRecapView: React.FC<AbsencesMonthlyRecapViewProps> = ({
    absencesRecap,
    month,
    year
  }) => {
  const monthNumber = parseInt(month, 10);
  const monthName = DateUtility.getMonthName(monthNumber);
  const [showModal, setShowModal] = useState(false);
  const [parameters, setParameters] = useState("");

   let content;
   if (absencesRecap.length <= 0){
      content = <div><p>Nessuna assenza da visualizzare per il mese selezionato.</p></div>
   }

  return (
      <>
      <Container fluid>
          <Row>
            <Col sm={2} />
            <Col sm={6}>
                  <div className="page-header">
                      <h2>Assenze Mensili {monthName} {year}</h2>
                      <AbsencesMonthlyModal tmpshow={showModal} close={() => setShowModal(false)} parameters={parameters} />
                      <br/>
                      <AbsencesMonthlyTable absencesRecap={absencesRecap} setModal={setShowModal} setParameters={setParameters} year={year} month={monthNumber} />
                  </div>
            </Col>
            <Col sm={2} />
          </Row>
      </Container>
      </>
  );
}

export default AbsencesMonthlyRecapView