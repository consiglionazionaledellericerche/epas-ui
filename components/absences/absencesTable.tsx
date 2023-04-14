import React from "react";
import { Table } from "react-bootstrap";
// import { AbsencesRecap } from "../../types/absencesRecap";
import DateUtility from "../../utils/dateUtility";

interface AbsencesTableProps {
    absencesRecap: string;
    year: integer;
    month: integer;
}

const AbsencesTable: React.FC<AbsencesTableProps> = ({
    absencesRecap,
    year,
    month
  }) => {

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    return (
        <Table id="assenzeannuali" bordered hover>
            <caption className="sr-only">Assenze Annuali</caption>
            <thead>
            <tr className="warning">
                <th >Mese</th>
                <th colspan="31">Giorni</th>
            </tr>
            <tr className="warning">
            <th></th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
            </tr>
            </thead>
            <tbody>
            </tbody>
        </Table>
    );
}

export default AbsencesTable