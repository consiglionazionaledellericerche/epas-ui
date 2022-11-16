import React from "react";
import { Accordion, Table } from "react-bootstrap";
import { ContractMonth } from "../../types/contractMonth";
import { MonthRecap } from "../../types/monthRecap";
import DateUtility from "../../utils/dateUtility";
import HoursRecapCurrentYear from "./hoursRecapCurrentYear";
import HoursRecapGenericInfo from "./hoursRecapGenericInfo";
import HoursRecapPreviousYear from "./hoursRecapPreviousYear";

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
                    <HoursRecapGenericInfo monthRecap={monthRecap} contractMonth={contractMonth} />
                    <HoursRecapPreviousYear monthRecap={monthRecap} contractMonth={contractMonth} />
                    <HoursRecapCurrentYear monthRecap={monthRecap} contractMonth={contractMonth} />
                </Accordion.Body>
            </Accordion.Item>

        ))}
        </>
    )
}

export default HoursRecap