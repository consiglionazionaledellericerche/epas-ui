import React from "react";
import { Accordion, Table } from "react-bootstrap";
import { ContractMonth } from "../../types/contractMonth";
import { MonthRecap } from "../../types/monthRecap";
import DateUtility from "../../utils/dateUtility";

interface HoursRecapGenericInfoProps {
    monthRecap: MonthRecap, 
    contractMonth: ContractMonth
}

const HoursRecapGenericInfo: React.FC<HoursRecapGenericInfoProps> = ({
    monthRecap, contractMonth
  }) => {
    function progressivoStyleClass(progressivo : number) {
        let progressivoStyle : string = "col-xs-2 success"
        if (progressivo === 0) {
            progressivoStyle = "col-xs-2 warning"
        }
        if (progressivo < 0) {
            progressivoStyle = "col-xs-2 danger"
        }
        return progressivoStyle
    }
    return (
        <>
            <h4>Info generiche</h4>
            <Table bordered className="riepilogo-ore table-sm">
            <tbody>
                <tr>
                    <td className="col-xs-10">Il numero di giorni lavorativi in sede è di: </td>
                    <td className="col-xs-2 success">{monthRecap.basedWorkingDays}</td>
                </tr>
                <tr>
  	                {!monthRecap.topQualification &&
                    <>
                        <td className="col-xs-10">Tempo disponibile per straordinari: </td>
                        <td className={progressivoStyleClass(contractMonth.progressivoFinaleMese)}>
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
            </tbody>
            </Table>
        </>
    )
}

export default HoursRecapGenericInfo