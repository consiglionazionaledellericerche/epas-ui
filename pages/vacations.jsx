import { useRouter } from 'next/router'

import React, { useContext, useState, useEffect } from 'react'

import { CurrentDateContext, CurrentDateProvider } from '../contexts/currentDateContext'
import { useRequest } from "../request/useRequest"
import { Spinner } from 'react-bootstrap'
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import VacationSituationView from '../components/vacationSituation/vacationSituationView'
import { authOptions } from './api/auth/[...nextauth]'

function Vacations() {
  const router = useRouter()
  let personId = router.query["personId"]
  personId = personId ? personId : 12
  const currentDate = useContext(CurrentDateContext)

  const { data: session, status } = useSession()

  const year = currentDate.year
  const month = currentDate.month

  const parameters = `personId=${personId}&year=${year}&month=${month}`
  // TODO: rivedere parametri da passare a api vacations
  const {data, error} = useRequest('/vacations', parameters);
  if (error) return <div>Impossibile caricare la situazione annuale</div>
  if (!data) return <React.Suspense fallback={<Spinner />} />

  return (
      <VacationSituationView data={data} year={year} month={month}/>
  )

}

export async function getServerSideProps({ req, res }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions)
    }
  }
}

export default Vacations