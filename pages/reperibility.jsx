import { useRouter } from 'next/router'

import React, { useContext, useState, useEffect } from 'react'

import { CurrentDateContext, CurrentDateProvider } from '../contexts/currentDateContext'
import { useRequest } from "../request/useRequest"
import { Spinner } from 'react-bootstrap'
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import CalendarView from '../components/reperibilityCalendar/calendarView'
import { authOptions } from './api/auth/[...nextauth]'

function Reperibility() {
  const router = useRouter()
  let personId = router.query["personId"]
  const currentDate = useContext(CurrentDateContext)

  const { data: session, status } = useSession()

  const {data, error} = useRequest('?endpoint=reperibilitycalendar%2Fshow');
  if (error) return <div>Impossibile caricare la situazione annuale</div>
  if (!data) return <React.Suspense fallback={<Spinner />} />

  console.log("data Reperibility", data)

  return (
      <CalendarView reperibilityID={data.reperibilitySelected.id} />
  )

}

export async function getServerSideProps({ req, res }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions)
    }
  }
}

export default Reperibility