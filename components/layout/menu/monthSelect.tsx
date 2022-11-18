import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { CurrentDateContext } from "../../../contexts/currentDateContext";

function MonthSelect() {
    let context = useContext(CurrentDateContext);
    const [month, setMonth]: any = useState(context.getMonth() + 1);

    function setContextMonth(month : string) {
        context.setMonth(Number(month) - 1)
        setMonth(month)
    }

    let monthsMap = [
        [1, "Gennaio"], [2, "Febbraio"],
        [3 , "Marzo"], [4, "Aprile"],
        [5, "Maggio"], [6, "Giugno"],
        [7, "Luglio"], [8, "Agosto"],
        [9, "Settembre"], [10, "Ottobre"],
        [11, "Novembre"], [12, "Dicembre"]
    ]

    return (
        <Form.Group controlId="monthSelect">
            <Form.Select 
                value={month}
                onChange=
                {e => {
                    console.log("month = ", e.target.value);
                    setContextMonth(e.target.value);
                }}
                >
                {monthsMap.map((monthTuple, index) => (
                        <option key={index} value={monthTuple[0]}>{monthTuple[1]}</option>
                ))}
            </Form.Select>
        </Form.Group>
    )
}

export default MonthSelect