import { useRouter } from 'next/router'

import React, { useContext, useState, useEffect } from 'react'

import { CurrentDateContext, CurrentDateProvider } from '../contexts/currentDateContext'
import { useRequest } from "../request/useRequest"
import { Spinner } from 'react-bootstrap'
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import MealTicketsView from '../components/mealTickets/mealTicketsView'

function PersonMonthsHoursRecap() {
  const router = useRouter()
  let personId = router.query["personId"]

  const { data: session, status } = useSession()

  const {data, error} = useRequest('?endpoint=mealtickets');
  if (error) return (<div>Impossibile caricare la situazione annuale</div>);
  if (!data) return <React.Suspense fallback={<Spinner />} />

  return (
  <MealTicketsView mealTicketsData={data}/>
  )

}

export async function getServerSideProps({ req, res }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions)
    }
  }
}
export default PersonMonthsHoursRecap