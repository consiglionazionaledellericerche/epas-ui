import { useRouter } from 'next/router'

import React, { useContext, useState, useEffect } from 'react'

import { CurrentDateContext, CurrentDateProvider } from '../contexts/currentDateContext'
import { useRequest } from "../request/useRequest"
import { Spinner } from 'react-bootstrap'
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import AbsencesMonthlyRecapView from '../components/absences/absencesMonthlyRecapView'
import DateUtility from "../utils/dateUtility";

function Absences() {
  const router = useRouter()
  let personId = router.query["personId"]
  const currentDate = useContext(CurrentDateContext)

  const { data: session, status } = useSession()

  const year = currentDate.year
  const month = currentDate.month

  const parameters = personId ? `id=${personId}&year=${year}&month=${month}` : `year=${year}&month=${month}`

  const {data, error} = useRequest('?endpoint=absences%2FabsenceTypeInMonth', parameters);
  if (error) return (<div>Impossibile caricare la situazione annuale</div>);
  if (!data) return <React.Suspense fallback={<Spinner />} />

  return (
  <AbsencesMonthlyRecapView absencesRecap={data} year={year} month={month} />
  )

}

export async function getServerSideProps({ req, res }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions)
    }
  }
}
export default Absences