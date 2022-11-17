import { useRouter } from 'next/router'
import React from 'react'
import { Spinner } from 'react-bootstrap'
import useSWR from 'swr'
import MonthRecapView from '../components/monthRecap/monthRecapView'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Stampings() {
  let now = new Date();
  const router = useRouter()
  let month = router.query["month"]
  let year = router.query["year"];
  let personId = router.query["personId"];
  month = month ? month : now.getMonth();
  year = year ? year : now.getFullYear();
  personId = personId ? personId : 146
  let API_URL = `/api/rest/v4/monthrecaps?personId=${personId}&year=${year}&month=${month}` 
  const { data, error } = useSWR(API_URL, fetcher)

  if (error) return <div>Impossibile caricare la situazione mensile</div>
  if (!data) return 
    <React.Suspense fallback={<Spinner />} />

  return (
    <MonthRecapView monthRecap={data} month={month} />
  )
}

export default Stampings