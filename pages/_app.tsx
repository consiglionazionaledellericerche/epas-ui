import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import '../styles/epas.css'

import { SSRProvider} from 'react-bootstrap/'
import { SessionProvider } from "next-auth/react"

import type { AppProps } from 'next/app'
import Layout from '../components/layout/layout'
import { useRouter } from 'next/router'
import {React, useEffect} from 'react'
import { SWRConfig } from 'swr'
import { useSession} from "next-auth/react"

// import { CurrentDateContext } from '../contexts/currentDateContext'
const currentDate = new Date()

import dynamic from "next/dynamic";

const CurrentDateProvider = dynamic(
  () => import("../contexts/currentDateContext").then((ctx) => ctx.CurrentDateProvider),
  {
    ssr: false,
  }
);

function currentPerson() {
  /*const router = useRouter()
  let personIdParam = router.query["personId"]
  let personId = (personIdParam && Number(personIdParam)) ? Number(personIdParam) : undefined
  */
}

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function App({ Component, pageProps: { session, ...pageProps }}: AppProps) {

  return (
  <SessionProvider session={session}>
    <SSRProvider>
        <SWRConfig value={{
                           fetcher: async (url) => {
                               const res = await fetch(url, {
                                   headers: {
                                       'Content-Type': 'application/json',
                                       Authorization: `Bearer ${session.accessToken}`,
                                   },
                               });
                               return res.json();
                           },
                       }}>
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