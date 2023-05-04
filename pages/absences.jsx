import { useRouter } from 'next/router'

import React, { useContext, useState, useEffect } from 'react'

import { CurrentDateContext, CurrentDateProvider } from '../contexts/currentDateContext'
import { useRequest } from "../request/useRequest"
import { Spinner } from 'react-bootstrap'
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import AbsencesRecapView from '../components/absences/absencesRecapView'

function Absences() {
  const router = useRouter()
  let personId = router.query["personId"]
  const currentDate = useContext(CurrentDateContext)

  const { data: session, status } = useSession()

  const year = 2018 //currentDate.year
  const beginDate = year + "-01-01"
  const endDate = year + "-12-31"

  const parameters = personId ? `id=${personId}&beginDate=${beginDate}&endDate=${endDate}` : `beginDate=${beginDate}&endDate=${endDate}`

  console.log('parameters', parameters);

  if (typeof window === 'undefined') {
    return <React.Suspense fallback={<Spinner />} />
  } else {
    const {data, error} = useRequest('/absences/absencesInPeriod', parameters);
    if (error) return (<div>Impossibile caricare la situazione annuale</div>);
    if (!data) return <React.Suspense fallback={<Spinner />} />

    return (
    <AbsencesRecapView absencesRecap={data} year={year} />
    )
  }

}

export async function getServerSideProps({ req, res }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions)
    }
  }
}
export default Absences