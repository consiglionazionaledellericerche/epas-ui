import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import React from 'react'

function YearSelect({year, setContextYear}) {

    let yearsMap = []

    yearsMap = [[2021, "2021"], [2022, "2022"], [2023, "2023"]]

    return (
       <Form.Group controlId="yearSelect">
            <Form.Select
            className="badge-select"
                value={year}
                onChange=
                {e => {
                    setContextYear(parseInt(e.target.value));
                }}
                >
                {yearsMap.map((yearTuple, index) => (
                        <option key={index} value={yearTuple[0]}>{yearTuple[1]}</option>
                ))}
            </Form.Select>
        </Form.Group>
    )
}

export default React.memo(YearSelect)