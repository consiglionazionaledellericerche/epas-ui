import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import React from 'react'
import { useSession } from "next-auth/react"
import { useRequest } from "../../../request/useRequest"
import { Spinner } from 'react-bootstrap'


function YearSelect({year, month, setContextYear}) {

    const { data: session, status } = useSession()
    const parameters = "";

    if (typeof window === 'undefined') {
      return <React.Suspense fallback={<Spinner />} />
    } else {
      const {data, error} = useRequest('/init/yearsdropdown', parameters);
      if (error) return (<div>Impossibile caricare la situazione mensile</div>);
      if (!data) return <React.Suspense fallback={<Spinner />} />

      return (
         <Form.Group controlId="yearSelect">
              <Form.Select
              className="badge-select"
                  value={year}
                  onChange=
                  {e => {
                      setContextYear(month, parseInt(e.target.value));
                  }}
                  >
                  {data.years.map((year, index) => (
                          <option key={index} value={year}>{year}</option>
                  ))}
              </Form.Select>
          </Form.Group>
      )
    }
}

export default React.memo(YearSelect)