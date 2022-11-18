import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { Spinner } from 'react-bootstrap'
import useSWR from 'swr'
import MonthRecapView from '../components/monthRecap/monthRecapView'
import { CurrentDateContext} from '../contexts/currentDateContext'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Stampings() {
  const router = useRouter()
  let personId = router.query["personId"]
  personId = personId ? personId : 146
  let context = useContext(CurrentDateContext);
  console.log("CurrentDateContext = " + (context.getMonth() + 1 ))

  let API_URL = `/api/rest/v4/monthrecaps?personId=${personId}&year=${context.getFullYear()}&month=${context.getMonth() + 1}`
  const { data, error } = useSWR(API_URL, fetcher)

  if (error) return <div>Impossibile caricare la situazione mensile</div>
  if (!data) return 
    <React.Suspense fallback={<Spinner />} />

  return (
    <MonthRecapView monthRecap={data} month={context.getMonth() + 1} />
  )
}

export default Stampings