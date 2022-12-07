import { useContext, useState } from "react";
import MonthSelect from './monthSelect'
import YearSelect from './yearSelect'
import ArrowLink from './arrowLink'
import React from 'react'

import { CurrentDateContext, CurrentDateProvider } from '../../../contexts/currentDateContext';

function SelectPeriod() {

    const currentDate = useContext(CurrentDateContext)

    function setContextMonth(month : string) {
      currentDate.setDateP(currentDate.year, month)
      setMonth(month)
    }

    const setContextYear = (year : string) => {
      currentDate.setDateP(year, currentDate.month)
      setYear(year)
    }

    function setContextDate(month : string, year: string) {
      currentDate.setDateP(year, month)
      setMonth(month)
      setYear(year)
    }

    const [year, setYear] = useState(currentDate.year)
    const [month, setMonth] = useState(currentDate.month)

    return (
        <>
          <ArrowLink month={month} year={year} setContextDate={setContextDate} direction={"left"}/>
          <YearSelect year={year} setContextYear={setContextYear}/>
          <MonthSelect month={month} setContextMonth={setContextMonth}/>
          <ArrowLink month={month} year={year} setContextDate={setContextDate} direction={"right"}/>
        </>

    )
}

// export default SelectPeriod

export default React.memo(SelectPeriod)