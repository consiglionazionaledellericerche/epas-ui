import React from "react";
import { Table } from "react-bootstrap";
import { MonthRecap } from "../../types/monthRecap";
import AbsencesShow from "./absencesShow";
import StampingsTemplate from "./stampingsTemplate";
import TimeAtWorkDifferenceProgressive from "./timeAtWorkDifferenceProgressive";
import MealTicketShow from "./mealTicketShow";
import DateUtility from "../../utils/dateUtility";

interface StampingsTableProps {
    monthRecap: MonthRecap;
    year: integer;
    month: integer;
}

const StampingsTable: React.FC<StampingsTableProps> = ({
    monthRecap,
    year,
    month
  }) => {
    return (
        <Table id="tabellonetimbrature" bordered hover>
            <caption className="sr-only">Riepilogo mensile </caption>
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
            {monthRecap.daysRecap?.map((pdr) => (
                    <tr key={pdr.personDay.date} className={pdr.ignoreDay ? 'ignoreDay' : ''}>
                        <td className={pdr.personDay.holiday ? 'festivi' : 'capitalized'}>
                            {DateUtility.formatDateShort(pdr.personDay.date)}
                        </td>

                        <MealTicketShow id="MealTicketShow" personDayRecap={pdr} />

                        <th className="invisible"></th>

                        <td className="assenza default-single">
                            <AbsencesShow absences={pdr.personDay.absences} />
                        </td>
                        
                        <StampingsTemplate personDayRecap={pdr} />

                        <td className="invisible"></td>

                        <TimeAtWorkDifferenceProgressive personDayRecap={pdr} />

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