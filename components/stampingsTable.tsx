import { Table } from "react-bootstrap";
import { MonthRecap } from "../types/monthRecap";
import { PersonDay } from "../types/personDay";

interface StampingsTableProps {
    monthRecap: MonthRecap
}

const StampingsTable: React.FC<StampingsTableProps> = ({
    monthRecap
  }) => {
    return (
        <Table striped bordered hover>
            <caption className="sr-only">Riepilogo mensile Ottobre 2022</caption>
            <tr>
                <th className="group-single">Giorno</th>
                <th className="group-single">Buono <br/>Pasto</th>
                <th className="invisible"></th>
                <th className="group-left">1<sup>a</sup> <br/>entrata</th>
                <th className="group-right">1<sup>a</sup> <br />uscita</th>
                <th className="group-right">1<sup>a</sup> <br />uscita</th>
                <th className="group-right">2<sup>a</sup> <br />uscita</th>
                <th className="invisible"></th>
                <th className="group-single">Tempo<br />lavoro</th>
                <th className="group-single">Diffe-<br />renza</th>
                <th className="group-single">Progres-<br />sivo</th>
                <th className="group-single">Tipo<br />Orario</th>
            </tr>
            {monthRecap.daysRecap.map((personDayRecap) => (
                    <tr key={personDayRecap.personDay.id}>
                        <td>{personDayRecap.personDay.date.toString()}</td>
                        <td>{personDayRecap.mealTicket}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{personDayRecap.personDay.timeAtWork}</td>
                        <td>{personDayRecap.personDay.difference}</td>
                        <td>{personDayRecap.personDay.progressive}</td>
                        <td>{personDayRecap.personDay.workingTime}</td>
                    </tr>
                )
            )
        }
        </Table>
    );
}

export default StampingsTable