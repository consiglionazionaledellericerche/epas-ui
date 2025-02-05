import React from "react";
import { Table } from "react-bootstrap";
import DateUtility from "../../utils/dateUtility";
import { AbsenceType } from "../../types/absenceType";

interface AbsencesMonthlyTableProps {
    absencesRecap: AbsenceType[];
    year: number;
    month: number;
    setModal: Function;
    setParameters: Function;
}

const AbsencesMonthlyTable: React.FC<AbsencesMonthlyTableProps> = ({
    absencesRecap,
    year,
    month,
    setModal,
    setParameters
  }) => {

    function setModalParam(code: string | undefined, month:number, year:number){
      setModal(true);
      let param = "code="+code+"&year="+year+"&month="+month;
      setParameters(param);
    }
    return (
          <Table id="assenzemensili" className="table table-bordered table-hover table-condensed">
            <caption className="sr-only">Assenze Mensili</caption>
            <thead>
            <tr className="warning">
               <th>Descrizione</th>
               <th>Codice</th>
               <th>Numero giorni</th>
            </tr>
            </thead>
            <tbody>
            {absencesRecap.map((absence) => (
            <tr key={`tr-${absence.code}`}>
            <td key={absence.description}>{absence.description}</td>
            <td key={absence.code}>{absence.code}</td>
            <td key={absence.numberOfDays}>
               <a id="absenceMonth" data-async-modal="#defaultModal" href="#" onClick={() => setModalParam(absence.code, month, year)}>
                  {absence.numberOfDays}
               </a>
             </td>
            </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default AbsencesMonthlyTable