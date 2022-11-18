import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'

import { SSRProvider} from 'react-bootstrap/'

import type { AppProps } from 'next/app'
import Layout from '../components/layout/layout'
import { useRouter } from 'next/router'
import React from 'react'
import { CurrentDateContext } from '../contexts/currentDateContext'

function currentPerson() {
  /*const router = useRouter()
  let personIdParam = router.query["personId"]
  let personId = (personIdParam && Number(personIdParam)) ? Number(personIdParam) : undefined
  */
}

export default function App({ Component, pageProps }: AppProps) {
 
  
  //const CurrentPerson = React.createContext(currentPerson())
  
  return (
    <SSRProvider>
      {/*<CurrentPerson.Provider value={undefined}> */}
        <CurrentDateContext.Provider value={new Date()}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CurrentDateContext.Provider>
      {/*</CurrentPerson.Provider> */}
    </SSRProvider>
  )
}