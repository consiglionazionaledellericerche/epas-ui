import React from "react";
import { Accordion, Table } from "react-bootstrap";
import { ContractMonth } from "../../types/contractMonth";
import { MonthRecap } from "../../types/monthRecap";
import DateUtility from "../../utils/dateUtility";
import HoursRecapCurrentYear from "./hoursRecapCurrentYear";
import HoursRecapGenericInfo from "./hoursRecapGenericInfo";
import HoursRecapPreviousYear from "./hoursRecapPreviousYear";
import HoursRecapTotals from "./hoursRecapTotals";

interface HoursRecapProps {
    monthRecap: MonthRecap
}

const HoursRecap: React.FC<HoursRecapProps> = ({
    monthRecap
  }) => {
    return (
        <Accordion defaultActiveKey="0">
        {monthRecap.contractMonths?.map((contractMonth: ContractMonth, index: number) => (
            <Accordion.Item eventKey={index.toString()} key={index}>            
                {/* Verificare che sia l'ultimo contratto nel mese */}
                {/*
                #{if mese.contract.isLastInMonth((int)psDto.month, (int)psDto.year)}
                    ... implementazione attuale
                #{/if}
                #{else}
                    <p class="text-error" style="margin-top: 5px;"><em>Il contratto e' terminato nel corso di questo mese.</em></p>
                #{/else}
                */}
                <Accordion.Header>Riepilogo ore {contractMonth.contractDescription}</Accordion.Header>
                <Accordion.Body>
                    <HoursRecapGenericInfo monthRecap={monthRecap} contractMonth={contractMonth} />
                    <HoursRecapPreviousYear monthRecap={monthRecap} contractMonth={contractMonth} />
                    <HoursRecapCurrentYear monthRecap={monthRecap} contractMonth={contractMonth} />
                    <HoursRecapTotals contractMonth={contractMonth} />
                </Accordion.Body>
            </Accordion.Item>

        ))}
        </Accordion>
    )
}

export default HoursRecap