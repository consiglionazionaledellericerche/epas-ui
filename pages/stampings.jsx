import React from 'react'
import { Spinner } from 'react-bootstrap'
import useSWR from 'swr'
import MonthRecapView from '../components/monthRecap/monthRecapView'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Stampings() {
  const { data, error } = useSWR('/api/rest/v4/monthrecaps?personId=146&year=2022&month=2', fetcher)

  if (error) return <div>Impossibile caricare la situazione mensile</div>
  if (!data) return 
    <React.Suspense fallback={<Spinner />} />

  return (
    <MonthRecapView monthRecap={data} />
  )
}

export default Stampings