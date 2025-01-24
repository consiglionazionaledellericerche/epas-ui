import { Col, Container, Row } from "react-bootstrap";
import MealTicketsTable from "./mealTicketsTable";
import { MealTicketRecapShow } from "../../types/mealTicketRecapShow";
import DateUtility from "../../utils/dateUtility";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface MealTicketsViewProps {
        mealTicketsData: MealTicketRecapShow
}

const MealTicketsView: React.FC<MealTicketsViewProps> = ({
    mealTicketsData
  }) => {

  let fullname = <span>{mealTicketsData.person?.surname} {mealTicketsData.person?.name}</span>;
  let recap = mealTicketsData.recap;
  let messageDateRunOut = recap?.dateRunOut ? (
  <>
  <div className="alert alert-danger">
  <p>Tutti i buoni pasto consegnati sono stati maturati in data {DateUtility.formatDateLocal(recap?.dateRunOut)}.</p>
  <p>Sono stati maturati <strong>{recap?.remaining}</strong> buoni pasto oltre quelli consegnati.</p>
  <p>Contattare l&apos;amministrazione per ricevere i nuovi blocchetti.</p></div>
  </>) :
  (<>
  <div className="alert alert-success">
    <p>Rimangono <strong>{recap?.remaining}</strong> buoni pasto consegnati ancora da maturare.</p>
    </div>
  </>);
  let messageInfo = <>
                      <div className="alert alert-info">
                        <p>Elenco dei blocchi consegnati a <strong>{fullname}</strong>.</p>
                        <p>I valori <strong>Maturati / Da Maturare</strong> sono puramente indicativi e sono ottenuti calcolando i buoni pasto maturati
                        partendo da quelli con scadenza più imminente e dal codice progressivo minore.</p>

                        <p><FontAwesomeIcon icon={faLightbulb} /> Cliccando sui titoli delle colonne è possibile ordinare
                        i blocchi consegnati per <em>Codice Blocco</em>, <em>Data Consegna</em>, <em>Data Scadenza</em> e <em>Maturati/Da Maturare</em>
                        </p>
                      </div>
                  </>
  return (
      <>
      <Container fluid>
        <Row>
          <Col sm={1} />
          <Col sm={9}>
          <div className="page-header">
              <h2>Riepilogo Buoni Pasto {fullname}</h2>
              <br/>
          </div>
          {messageDateRunOut}
          {messageInfo}
          {recap?.blockMealTicketReceivedDeliveryDesc && (
            <MealTicketsTable data={recap.blockMealTicketReceivedDeliveryDesc} />
          )}
          </Col>
          <Col sm={2} />
        </Row>
      </Container>
      </>
  );
}

export default MealTicketsView