import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import useSWR from 'swr'
import MonthRecapView from '../components/monthRecap/monthRecapView'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Stampings() {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState(1);
  const [currentYear, setCurrentYear] = useState(2022);
  let month = router.query["month"]
  //console.log("currentYear = " + currentYear + ", year = " + year)
  console.log("currentMonth = " + currentMonth + ", month = " + month)
  //if (year) {
  //  setCurrentYear(year)
  //}
  //if (month) {
  //  setCurrentMonth(month)
  //}
  
  const { data, error } = 
    useSWR('/api/rest/v4/monthrecaps?personId=146&year=2022&month=' + (month ? month.toString() : "6"), fetcher)

  if (error) return <div>Impossibile caricare la situazione mensile</div>
  if (!data) return 
    <React.Suspense fallback={<Spinner />} />

  return (
    <MonthRecapView monthRecap={data} />
  )
}

export default Stampings