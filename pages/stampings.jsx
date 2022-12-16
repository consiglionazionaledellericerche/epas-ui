import { useRouter } from 'next/router'

import React, { useContext, useState, useEffect } from 'react'

import { CurrentDateContext, CurrentDateProvider } from '../contexts/currentDateContext'
import { useRequest } from "../request/useRequest"
import { Spinner } from 'react-bootstrap'

import MonthRecapView from '../components/monthRecap/monthRecapView'

function Stampings() {
  const router = useRouter()
  let personId = router.query["personId"]
  personId = personId ? personId : 12
  const currentDate = useContext(CurrentDateContext)

  const year = currentDate.year
  const month = currentDate.month

  const parameters = `personId=${personId}&year=${year}&month=${month}`
  const {data, error} = useRequest('/monthrecaps', parameters);
  if (error) return <div>Impossibile caricare la situazione mensile</div>
  if (!data) return <React.Suspense fallback={<Spinner />} />

  return (
      <MonthRecapView monthRecap={data} month={month} year={year} />
  )

}

export default Stampings