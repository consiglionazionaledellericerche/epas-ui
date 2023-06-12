import { useContext, useState } from "react";
import MonthSelect from './monthSelect'
import YearSelect from './yearSelect'
import ArrowLink from './arrowLink'
import React from 'react'

import { CurrentDateContext, CurrentDateProvider } from '../../../contexts/currentDateContext';

function SelectPeriod() {

    const currentDate = useContext(CurrentDateContext)

    const setContextMonth = React.useCallback((month, year) => {
        currentDate.setDateP(year, month)
        setMonth(month)
        setYear(year)
    }, []);

    const setContextYear = React.useCallback((month, year) => {
        currentDate.setDateP(year, month)
        setMonth(month)
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
          <MonthSelect month={month} year={year} setContextMonth={setContextMonth} />
          <YearSelect month={month} year={year} setContextYear={setContextYear} />
          <ArrowLink month={month} year={year} setContextDate={setContextDate} direction={"right"} />
        </>
    )
}

export default React.memo(SelectPeriod)
