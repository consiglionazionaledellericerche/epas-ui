import { useRouter } from "next/router"
import React from "react"

export function currentDate() {
    let now = new Date()
    
    const router = useRouter()
    let monthParam = router.query["month"]
    let yearParam = router.query["year"]
    let dayParam = router.query["day"]
    
    let month = (monthParam && Number(monthParam)) ? Number(monthParam) : now.getMonth()
    let year = (yearParam && Number(yearParam)) ? Number(yearParam) : now.getFullYear()
    let day = (yearParam && Number(yearParam)) ? Number(yearParam) : now.getFullYear()
    return new Date(year, month, day)

  }

export const CurrentDateContext = React.createContext(new Date());