import { useContext, useState, useCallback } from "react";
import { Form } from "react-bootstrap";
import React from 'react'

function MonthSelect({month, year, setContextMonth}: { month: number, year: number, setContextMonth: Function }) {

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
                className="badge-select"
                    value={month}
                    onChange={e => {
                                    setContextMonth(parseInt(e.target.value), year);
                              }}
                    >
                    {monthsMap.map((monthTuple, index) => (
                            <option key={index} value={monthTuple[0]}>{monthTuple[1]}</option>
                    ))}
                </Form.Select>
            </Form.Group>
          )
}

export default React.memo(MonthSelect)