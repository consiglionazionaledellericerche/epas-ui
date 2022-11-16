import React from "react";
import { Table } from "react-bootstrap";
import { ContractMonth } from "../../types/contractMonth";
import { MonthRecap } from "../../types/monthRecap";
import ComponentUtility from "../../utils/componentUtility";
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
	    {contractMonth.isPreviousRecapInYearPresent ? 
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
        <h4>Situazione residuo derivante dall'anno corrente</h4>
        <Table bordered className="riepilogo-ore table-sm">
        <tbody>
            {residuo}
            <tr>
            <td className="col-xs-10">Residuo del mese positivo</td>
            <td className="col-xs-2 success">{DateUtility.toHourTimeWithPlus(contractMonth.positiveResidualInMonth)}</td>
        </tr>
        </tbody>
        </Table>
        </>
    )
}

export default HoursRecapCurrentYear