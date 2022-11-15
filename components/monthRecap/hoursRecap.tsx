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
            <HoursRecapGenericInfo monthRecap={monthRecap} contractMonth={contractMonth} key={index} />
        ))}
        </>
    )
}

export default HoursRecap