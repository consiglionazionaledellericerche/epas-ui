import React from "react";
import { Accordion, Table } from "react-bootstrap";
import { ContractMonth } from "../../types/contractMonth";
import { MonthRecap } from "../../types/monthRecap";
import DateUtility from "../../utils/dateUtility";
import HoursRecapGenericInfo from "./hoursRecapGenericInfo";

interface HoursRecapProps {
    monthRecap: MonthRecap
}

const HoursRecap: React.FC<HoursRecapProps> = ({
    monthRecap
  }) => {
    return (
        <>
        {monthRecap.contractMonths.map((contractMonth: ContractMonth, index: number) => (            
            <Accordion.Item eventKey="0" key={index}>
            {/* Verificare che sia l'ultimo contratto nel mese */}
            {/*
                #{if mese.contract.isLastInMonth((int)psDto.month, (int)psDto.year)}
                  ... implementazione attuale
                #{/if}
                #{else}
                    <p class="text-error" style="margin-top: 5px;"><em>Il contratto e' terminato nel corso di questo mese.</em></p>
                #{/else}
             */}
            <Accordion.Header>Riepilogo ore</Accordion.Header>
            <Accordion.Body>
                <h4>Info generiche</h4>
                <Table bordered>
                    <tr>
                        <td className="col-xs-10">Il numero di giorni lavorativi in sede è di: </td>
                        <td className="col-xs-2 success">{monthRecap.basedWorkingDays}</td>
                    </tr>
                    <tr>
  	                    {!monthRecap.topQualification &&
                        <>
                            <td className="col-xs-10">Tempo disponibile per straordinari: </td>
                            <td className="col-xs-2 {contractMonth.progressivoFinalePositivoMese=== 0 ? 
                                'warning' : contractMonth.progressivoFinalePositivoMese > 0 ? : 'success' : 'danger'}">
                                {DateUtility.fromMinuteToHourMinute(contractMonth.progressivoFinalePositivoMese)} ore
                            </td>    
                        </>
                        }    
                    </tr>
                    <tr>
                        <td className="col-xs-10">Il numero di riposi compensativi usati nell&apos;anno è </td>
                        <td className="col-xs-2 success">{monthRecap.numberOfCompensatoryRestUntilToday}</td>
                    </tr>
                    <tr>
                        <td className="col-xs-10">
                            È possibile utilizzare il residuo dell&apos;anno precedente? </td>
                            {contractMonth.possibileUtilizzareResiduoAnnoPrecedente ?
    	                        <td className="col-xs-2 success">Sì</td> :
                                <td className="col-xs-2 danger">No</td>
                            }
                    </tr>
                </Table>              
            </Accordion.Body>
        </Accordion.Item>
        ))}
        </>
    )
}

export default HoursRecap