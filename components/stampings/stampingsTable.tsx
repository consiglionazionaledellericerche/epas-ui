import React from "react";
import { Table } from "react-bootstrap";
import { MonthRecap } from "../../types/monthRecap";
import { PersonDay } from "../../types/personDay";
import AbsencesShow from "./absencesShow";
import StampingTemplates from "./stampingTemplates";

interface StampingsTableProps {
    monthRecap: MonthRecap
}

const StampingsTable: React.FC<StampingsTableProps> = ({
    monthRecap
  }) => {
    return (
        <Table striped bordered hover>
            <caption className="sr-only">Riepilogo mensile Ottobre 2022</caption>
            <thead>
            <tr>
                <th className="group-single">Giorno</th>
                <th className="group-single">Buono <br/>Pasto</th>
                <th className="invisible"></th>

                <th className="group-single">Codice <br/>assenza</th>

                {
                [...Array(monthRecap.numberOfInOut),].map((value: undefined, index: number) => (
                    <React.Fragment key={index+1}>
                    <th className="group-left">{index+1}<sup>a</sup> <br/>entrata</th>
                    <th className="group-right">{index+1}<sup>a</sup> <br/>uscita</th>
                    </React.Fragment>
                    ))
                }

                <th className="invisible"></th>

                <th className="group-single">Tempo<br />lavoro</th>
                <th className="group-single">Diffe-<br />renza</th>
                <th className="group-single">Progres-<br />sivo</th>
                <th className="group-single">Tipo<br />Orario</th>
            </tr>
            </thead>
            <tbody>
            {monthRecap.daysRecap.map((pdr) => (
                    <tr key={pdr.personDay.id}>
                        <td>{pdr.personDay.date.toString()}</td>
                        <td>{pdr.mealTicket}</td>

                        <th className="invisible"></th>

                        <td>
                            <AbsencesShow absences={pdr.personDay.absences} />
                        </td>
                        
                        <StampingTemplates personDayRecap={pdr} />

                        <td className="invisible"></td>

                        <td>{pdr.personDay.timeAtWork}</td>
                        <td>{pdr.personDay.difference}</td>
                        <td>{pdr.personDay.progressive}</td>
                        <td>{pdr.wttd.workingTimeType?.description}</td>
                    </tr>
                    )
                )
            }
            </tbody>
        </Table>
    );
}

export default StampingsTable