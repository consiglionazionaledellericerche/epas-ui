import React from "react";
import { Table } from "react-bootstrap";
import { ContractMonth } from "../../types/contractMonth";
import { MonthRecap } from "../../types/monthRecap";
import DateUtility from "../../utils/dateUtility";

interface HoursRecapCurrentProps {
    monthRecap: MonthRecap, 
    contractMonth: ContractMonth
}

const HoursRecapCurrentYear: React.FC<HoursRecapCurrentProps> = ({
    monthRecap, contractMonth
  }) => {
    let residuo = <></>

    if (contractMonth.hasResidualInitInYearMonth) {
        residuo = 
	  <tr>
	    <td className="col-xs-10">
            {"Residuo da inizializzazione" + contractMonth.contract.sourceDateResidual}
        </td>
	    {contractMonth.initResiduoAnnoCorrenteNelMese >= 0 ?
	        <td className="col-xs-2 success">{DateUtility.toHourTimeWithPlus(contractMonth.initResiduoAnnoCorrenteNelMese)}</td>
            :
	        <td className="col-xs-2 danger">{DateUtility.toHourTimeWithMinus(contractMonth.initResiduoAnnoCorrenteNelMese)}</td>
        }
	  </tr>            
        
    } else {
        residuo = (
            <>
            	  <tr>
	    <td className="col-xs-10">Residuo dai mesi precedenti</td>
	    {contractMonth.previousRecapInYearPresent ? 
	        <td className="col-xs-2 success">{DateUtility.toHourTimeWithPlus(contractMonth.previousRecapInYearRemainingMinutesCurrentYear)}</td>
            :
	        <td className="col-xs-2 success">+00:00</td>
        }
	
	  </tr>
      </>
        )
    }
    return (
        <>
        <h4>Situazione residuo derivante dall &apos; anno corrente</h4>
        <Table bordered className="riepilogo-ore table-sm">
        <tbody>
            {residuo}
            <tr>
                <td className="col-xs-10">Residuo del mese positivo</td>
                <td className="col-xs-2 success">{DateUtility.toHourTimeWithPlus(contractMonth.positiveResidualInMonth)}</td>
            </tr>
            {contractMonth.straordinariMinutiS1Print != 0 &&
            <tr>
                <td className="col-xs-10">Straordinario diurno nei giorni lavorativi</td>
                <td className="col-xs-2 danger">{DateUtility.toHourTimeWithMinus(contractMonth.straordinariMinutiS1Print)}</td>
            </tr>
            }

            {contractMonth.straordinariMinutiS2Print != 0 &&
            <tr>
                <td className="col-xs-10">Straordinario diurno nei giorni festivi o notturno nei giorni lavorativi</td>
                <td className="col-xs-2 danger">{DateUtility.toHourTimeWithMinus(contractMonth.straordinariMinutiS2Print)}</td>
            </tr>
            }

            {contractMonth.straordinariMinutiS3Print != 0 &&
            <tr>
                <td className="col-xs-10">Straordinario notturno nei giorni festivi</td>
                <td className="col-xs-2 danger">{DateUtility.toHourTimeWithMinus(contractMonth.straordinariMinutiS3Print)}</td>
            </tr>
            }
  
            {contractMonth.progressivoFinaleNegativoMeseImputatoAnnoCorrente != 0 &&
            <tr>
                <td className="col-xs-10">Residuo da anno corrente utilizzato come recupero ore</td>
                <td className="col-xs-2 danger">{DateUtility.toHourTimeWithMinus(contractMonth.progressivoFinaleNegativoMeseImputatoAnnoCorrente)}</td>
            </tr>
            }
            {contractMonth.riposiCompensativiMinutiImputatoAnnoCorrente != 0 &&
            <tr>
                <td className="col-xs-10">Residuo da anno corrente utilizzato come riposo compensativi</td>
                <td className="col-xs-2 danger">{DateUtility.toHourTimeWithMinus(contractMonth.riposiCompensativiMinutiImputatoAnnoCorrente)}</td>
            </tr>
            }
            {contractMonth.year < 2021 && contractMonth.month < 3 &&
                contractMonth.riposiCompensativiChiusuraEnteMinutiImputatoAnnoCorrente != 0 &&
            <tr>
                <td className="col-xs-10">Residuo da anno corrente utilizzato come recupero riposo compensativi chiusura ente (91CE)</td>
                <td className="col-xs-2 danger">{DateUtility.toHourTimeWithMinus(contractMonth.riposiCompensativiChiusuraEnteMinutiImputatoAnnoCorrente)}</td>
            </tr>
            }
            {contractMonth.year < 2021 && contractMonth.month < 3 && 
                contractMonth.riposiCompensativiChiusuraEnteMinutiImputatoProgressivoFinalePositivoMese != 0 &&
            <tr>
                <td className="col-xs-10">Residuo da progressivo finale mese utilizzato come recupero riposo compensativi chiusura ente (91CE)</td>
                <td className="col-xs-2 danger">{DateUtility.toHourTimeWithMinus(contractMonth.riposiCompensativiChiusuraEnteMinutiImputatoProgressivoFinalePositivoMese)}</td>
            </tr>
            }
            <tr className="warning">
                <td className="col-xs-10">Residuo di questo anno a fine mese</td>
                <td className="col-xs-2"><strong>{DateUtility.fromMinuteToHourMinute(contractMonth.remainingMinutesCurrentYear)}</strong></td>
            </tr>
        </tbody>
        </Table>
        </>
    )
}

export default HoursRecapCurrentYear