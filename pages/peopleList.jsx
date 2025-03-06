import { useRouter } from 'next/router'

import React, { useContext, useState, useEffect } from 'react'

import { CurrentDateContext, CurrentDateProvider } from '../contexts/currentDateContext'
import { useRequest } from "../request/useRequest"
import { Spinner } from 'react-bootstrap'
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import PeopleView from '../components/people/peopleView'

function PeopleList() {
  const router = useRouter()
  let personId = router.query["personId"]

  const { data: session, status } = useSession()

  const officeId=1;
  const name="";
  const parameters = `officeId=${officeId}&name=${name}`

  const {data, error} = useRequest('?endpoint=people%2Flist', parameters);
  if (error) return (<div>Impossibile caricare la situazione annuale</div>);
  if (!data) return <React.Suspense fallback={<Spinner />} />

  return (
  <PeopleView data={data}/>
  )

}

export async function getServerSideProps({ req, res }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions)
    }
  }
}
export default PeopleList