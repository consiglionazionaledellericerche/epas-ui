import React from "react";
import { Accordion, Table } from "react-bootstrap";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import { ContractMonth } from "../../types/contractMonth";
import { MonthRecap } from "../../types/monthRecap";
import DateUtility from "../../utils/dateUtility";

interface HoursRecapGenericInfoProps {
    monthRecap: MonthRecap, 
    contractMonth: ContractMonth
    idx: number
}

const HoursRecapGenericInfo: React.FC<HoursRecapGenericInfoProps> = ({
    monthRecap, contractMonth, idx
  }) => {
    return (
        <>
        empty
        </>
    )
}

export default HoursRecapGenericInfo