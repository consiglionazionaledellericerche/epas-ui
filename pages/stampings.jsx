import { useRouter } from 'next/router'

import React, { useContext, useState, useEffect } from 'react'

import { CurrentDateContext, CurrentDateProvider } from '../contexts/currentDateContext'
import { useRequest } from "../request/useRequest"
import { Spinner } from 'react-bootstrap'
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import MonthRecapView from '../components/monthRecap/monthRecapView'

function Stampings() {
  const router = useRouter()
  let personId = router.query["personId"]
  personId = personId ? personId : 12
   const currentDate = useContext(CurrentDateContext)

  const { data: session, status } = useSession()

  const year = currentDate.year
  const month = currentDate.month

  const parameters = `personId=${personId}&year=${year}&month=${month}`
  console.log("typeof window", typeof window, typeof window === 'undefined');

  if (typeof window === 'undefined') {
    return <React.Suspense fallback={<Spinner />} />
  } else {
    const {data, error} = useRequest('/monthrecaps', parameters);
    console.log("error", error);
    if (error) return (<div>Impossibile caricare la situazione mensile</div>);
    if (!data) return <React.Suspense fallback={<Spinner />} />

    return (
        <MonthRecapView monthRecap={data} month={month} year={year} />
    )
  }

}

export async function getServerSideProps({ req, res }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions),
    }
  }
}

export default Stampings