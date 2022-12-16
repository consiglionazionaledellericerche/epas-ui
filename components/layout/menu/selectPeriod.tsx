import { useContext, useState } from "react";
import MonthSelect from './monthSelect'
import YearSelect from './yearSelect'
import ArrowLink from './arrowLink'
import React from 'react'

import { CurrentDateContext, CurrentDateProvider } from '../../../contexts/currentDateContext';

function SelectPeriod() {

    const currentDate = useContext(CurrentDateContext)

    const setContextMonth = React.useCallback((month) => {
        currentDate.setDateP(currentDate.year, month)
              setMonth(month)
    }, []);

    const setContextYear = React.useCallback((year) => {
        currentDate.setDateP(year, currentDate.month)
              setYear(year)
    }, []);


    const setContextDate = React.useCallback((month, year) => {
          currentDate.setDateP(year, month)
          setMonth(month)
          setYear(year)
    }, []);

    const [year, setYear] = useState(currentDate.year)
    const [month, setMonth] = useState(currentDate.month)

    return (
        <>
          <ArrowLink month={month} year={year} setContextDate={setContextDate} direction={"left"} />
          <YearSelect year={year} setContextYear={setContextYear} />
          <MonthSelect month={month} setContextMonth={setContextMonth} />
          <ArrowLink month={month} year={year} setContextDate={setContextDate} direction={"right"} />
        </>
    )
}

export default React.memo(SelectPeriod)
