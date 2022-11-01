import { Table } from "react-bootstrap";
import { PersonDay } from "../types/personDay";

interface StampingsTableProps {
    personDays: PersonDay[]
}

const StampingsTable: React.FC<StampingsTableProps> = ({
    personDays
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
            {personDays.map((personDay) => (
                    <tr key={personDay.id}>
                        <td>{personDay.date}</td>
                        <td>{personDay.ticketAvailable ? "Si" : "No"}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{personDay.timeAtWork}</td>
                        <td>{personDay.difference}</td>
                        <td>{personDay.progressive}</td>
                        <td></td>
                    </tr>
                )
            )
        }
        </Table>
    );
}

export default StampingsTable