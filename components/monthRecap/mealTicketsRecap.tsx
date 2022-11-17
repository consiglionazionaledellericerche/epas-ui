import React from "react";
import { Accordion, Table } from "react-bootstrap";
import { ContractMonth } from "../../types/contractMonth";
import { MonthRecap } from "../../types/monthRecap";

interface MealTicketsRecapProps {
    monthRecap: MonthRecap
}

const MealTicketsRecap: React.FC<MealTicketsRecapProps> = ({
    monthRecap
  }) => {
    return (
        <Accordion defaultActiveKey="0">
        {monthRecap.contractMonths.map((contractMonth: ContractMonth, index: number) => (   
            <Accordion.Item eventKey={index.toString()} key={index}>            
                <Accordion.Header>Situazione buoni pasto {contractMonth.contractDescription}</Accordion.Header>
                <Accordion.Body>
                {monthRecap.currentMonth &&
	   	            <p><em>Il giorno attuale non è considerato nel conteggio dei buoni pasto utilizzati.</em></p>
   	            }
   	            <Table className="table-sm riepilogo-ore">
                <tbody>
   	            {(contractMonth.buoniPastoDaInizializzazione > 0 || contractMonth.buoniPastoDaInizializzazione < 0) ?
   	            <tr>
		            <td className="col-xs-10">
                        {`Buoni pasto da inizializzazione <em>(al ${contractMonth.sourceDateMealTicket}</em>)`}
                    </td>
		            <td className="col-xs-2 success">{contractMonth.buoniPastoDaInizializzazione}</td>
		        </tr>
                :
       	        <tr>
	        	    <td className="col-xs-10">Buoni pasto rimanenti dai mesi precedenti</td>
		            <td className="col-xs-2 success">{contractMonth.buoniPastoDalMesePrecedente}</td>
		        </tr>
   	            }
   	     
		        <tr>
		            <td className="col-xs-10">Buoni pasto consegnati nel mese</td>
		            <td className="col-xs-2 success">{contractMonth.buoniPastoConsegnatiNelMese}</td>
		        </tr>
		        <tr>
				    <td className="col-xs-10"> Buoni pasto maturati nel mese</td>
				    <td className="col-xs-2 danger">{contractMonth.buoniPastoUsatiNelMese}</td>
		        </tr>
		        <tr className="warning">
				    <td className="col-xs-10">Buoni pasto rimanenti alla data di oggi</td>
				    <td className="col-xs-2"><strong>{contractMonth.remainingMealTickets}</strong></td>
		        </tr>
                </tbody>
	            </Table>
                </Accordion.Body>
            </Accordion.Item>

        ))}
        </Accordion>
    )
}

export default MealTicketsRecap