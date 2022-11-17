import React from "react";
import { Table } from "react-bootstrap";
import { ContractMonth } from "../../types/contractMonth";
import { MonthRecap } from "../../types/monthRecap";
import DateUtility from "../../utils/dateUtility";

interface HoursRecapPreviousProps {
    monthRecap: MonthRecap, 
    contractMonth: ContractMonth
}

const HoursRecapPreviousYear: React.FC<HoursRecapPreviousProps> = ({
    monthRecap, contractMonth
  }) => {
    if (contractMonth.hasResidualLastYear) {
        return (
            <>
            {/* #{if mese.hasResidualLastYear() } */}
            {/* <!--  Anno passato --></> */}
            <h4>Situazione residuo derivante dall&apos;anno precedente</h4>
            <Table className="table-sm riepilogo-ore">
            <tbody>
            <tr>
                <td className="col-xs-10">Residuo da anno precedente disponibile all&apos;inizio del mese</td>
                <td className="col-xs-2 success">
                    {DateUtility.toHourTimeWithPlus(contractMonth.residualLastYearInit)}
                </td>
            </tr>
            <tr>
                <td className="col-xs-10">Residuo da anno precedente utilizzato questo mese come recupero ore</td>
                <td className="col-xs-2 danger">{DateUtility.toHourTimeWithMinus(contractMonth.progressivoFinaleNegativoMeseImputatoAnnoPassato)}</td>
            </tr>
            <tr>
                <td className="col-xs-10">Residuo da anno precedente utilizzato questo mese come riposo compensativo</td>
                <td className="col-xs-2 danger">{DateUtility.toHourTimeWithMinus(contractMonth.riposiCompensativiMinutiImputatoAnnoPassato)}</td>
            </tr>
            {monthRecap.year < 2021 && monthRecap.month < 3 &&
            <tr>
                <td className="col-xs-10">Residuo da anno precedente utilizzato questo mese come recupero riposo compensativo chiusura ente (91CE)</td>
                <td className="col-xs-2 danger">{DateUtility.toHourTimeWithMinus(contractMonth.riposiCompensativiChiusuraEnteMinutiImputatoAnnoPassato)}</td>
            </tr>
            }
            <tr className="warning">
                <td className="col-xs-10">Residuo da anno precedente disponibile alla fine del mese</td>
                <td className="col-xs-2"><strong>{DateUtility.fromMinuteToHourMinute(contractMonth.remainingMinutesLastYear)}</strong></td>
            </tr>
            </tbody>
            </Table>
            </>
        )    
    } else {
        return <></>
    }
}

export default HoursRecapPreviousYear