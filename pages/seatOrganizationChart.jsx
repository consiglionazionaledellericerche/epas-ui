import { useRouter } from 'next/router'

import React, { useContext, useState, useEffect } from 'react'

import { CurrentDateContext, CurrentDateProvider } from '../contexts/currentDateContext'
import { useRequest } from "../request/useRequest"
import { Spinner } from 'react-bootstrap'
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import SeatOrganizationView from '../components/seatOrganizationChart/SeatOrganizationView'

function Competences() {
  const router = useRouter()
  let personId = router.query["personId"]
  const currentDate = useContext(CurrentDateContext)

  const { data: session, status } = useSession()

  const year = currentDate.year
  const month = currentDate.month
  const parameters = personId ? `personId=${personId}` : ``;

  const {data, error} = useRequest('?endpoint=groups%2FseatOrganizationChart', parameters);
  if (error) return (<div>Impossibile caricare la situazione dei ruoli dipendenti Epas</div>);
  if (!data) return <React.Suspense fallback={<Spinner />} />

  return (
  <SeatOrganizationView data={data}/>
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