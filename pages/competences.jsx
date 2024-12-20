import { useRouter } from 'next/router'

import React, { useContext, useState, useEffect } from 'react'

import { CurrentDateContext, CurrentDateProvider } from '../contexts/currentDateContext'
import { useRequest } from "../request/useRequest"
import { Spinner } from 'react-bootstrap'
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import CompetencesView from '../components/competences/competencesView'

function Competences() {
  const router = useRouter()
  console.log('router.query.>>> ',router.query);
  let personId = router.query["personId"]
  const currentDate = useContext(CurrentDateContext)

  const { data: session, status } = useSession()

  const year = currentDate.year
  const month = currentDate.month
  const parameters = personId ? `personId=${personId}&year=${year}&month=${month}` : `year=${year}&month=${month}`;

  const {data, error} = useRequest('?endpoint=competences', parameters);
  if (error) return (<div>Impossibile caricare la situazione mensile</div>);
  if (!data) return <React.Suspense fallback={<Spinner />} />

  return (
  <CompetencesView data={data} year={year} month={month} />
  )

}

export async function getServerSideProps({ req, res }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions)
    }
  }
}
export default Competences