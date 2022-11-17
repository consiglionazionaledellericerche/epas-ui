import React from "react";
import { Table } from "react-bootstrap";
import { ContractMonth } from "../../types/contractMonth";
import { MonthRecap } from "../../types/monthRecap";
import DateUtility from "../../utils/dateUtility";

interface HoursRecapTotalsProps {
    contractMonth: ContractMonth
}

const HoursRecapTotals: React.FC<HoursRecapTotalsProps> = ({
    contractMonth
  }) => {
        return (
        <>
        {/* <!-- Totale  --> */}
        <h4>Riepilogo generale ore di lavoro</h4>
        <Table bordered className="riepilogo-ore table-sm">
            <tbody>
            <tr>
                <td className="col-xs-10">Residuo da anno precedente</td>
                <td className="col-xs-2 warning"><strong>{DateUtility.toHourTimeWithPlus(contractMonth.remainingMinutesLastYear)}</strong></td>
            </tr>
            <tr>
                <td className="col-xs-10">Residuo di questo anno</td>
                <td className="col-xs-2 warning"><strong>{DateUtility.toHourTimeWithPlus(contractMonth.remainingMinutesCurrentYear)}</strong></td>
            </tr>
            <tr className="warning">
                <td className="col-xs-10">Residuo ore ad oggi</td>
                <td className="col-xs-2"><strong>{DateUtility.fromMinuteToHourMinute(contractMonth.remainingMinutesLastYear + contractMonth.remainingMinutesCurrentYear)}</strong></td>
            </tr>
            </tbody>
        </Table>
        </>
    )
}

export default HoursRecapTotals