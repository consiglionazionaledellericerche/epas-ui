import { useRouter } from 'next/router'

import React, { useContext, useState, useEffect } from 'react'

import { CurrentDateContext, CurrentDateProvider } from '../contexts/currentDateContext'
import { useRequest } from "../request/useRequest"
import { Spinner } from 'react-bootstrap'
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import PersonMonthsTrainingView from '../components/personMonths/personMonthsTrainingView'

function TrainingRecap() {
  const router = useRouter()
  let personId = router.query["personId"]
  const currentDate = useContext(CurrentDateContext)

  const { data: session, status } = useSession()

  const year = currentDate.year
  const parameters = `year=${year}`

  const {data, error} = useRequest('?endpoint=personmonths%2FtrainingHours', parameters);
  if (error) return (<div>Impossibile caricare la situazione annuale</div>);
  if (!data) return <React.Suspense fallback={<Spinner />} />

  return (
  <PersonMonthsTrainingView trainingData={data} year={year} />
  )

}

export async function getServerSideProps({ req, res }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions)
    }
  }
}
export default TrainingRecap