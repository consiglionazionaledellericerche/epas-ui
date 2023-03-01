import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'

import { SSRProvider} from 'react-bootstrap/'
import { SessionProvider } from "next-auth/react"

import type { AppProps } from 'next/app'
import Layout from '../components/layout/layout'
import { useRouter } from 'next/router'
import {React, useEffect} from 'react'
import { SWRConfig } from 'swr'
import { CurrentDateContext, CurrentDateProvider } from '../contexts/currentDateContext'
const currentDate = new Date()

function currentPerson() {
  /*const router = useRouter()
  let personIdParam = router.query["personId"]
  let personId = (personIdParam && Number(personIdParam)) ? Number(personIdParam) : undefined
  */
}

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function App({ Component, pageProps: { session, ...pageProps }}: AppProps) {

  //const CurrentPerson = React.createContext(currentPerson())
//          <CurrentDateContext.Provider value={new Date()}>

  return (
  <SessionProvider session={session}>
    <SSRProvider>
        <SWRConfig value={{ fetcher }}>
          <CurrentDateProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CurrentDateProvider>
        </SWRConfig>
    </SSRProvider>
  </SessionProvider>
  )
}