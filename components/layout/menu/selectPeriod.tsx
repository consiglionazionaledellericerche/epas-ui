import { useContext, useState, useEffect } from "react";
import MonthSelect from './monthSelect'
import YearSelect from './yearSelect'
import ArrowLink from './arrowLink'
import React from 'react'

import { CurrentDateContext, CurrentDateProvider, CurrentDateContextType } from '../../../contexts/currentDateContext';

function SelectPeriod() {
    const currentDate = useContext(CurrentDateContext) as CurrentDateContextType | undefined;

    const [year, setYear] = useState(currentDate ? currentDate.year : 0);
    const [month, setMonth] = useState(currentDate ? currentDate.month : 0);

    useEffect(() => {
        if (currentDate) {
            setYear(currentDate.year);
            setMonth(currentDate.month);
        }
    }, [currentDate]);


    const setContextMonth = React.useCallback((selectedMonth: number, selectedYear: number) => {
        if (currentDate) {
          currentDate.setDateP(selectedYear, selectedMonth);
          setMonth(selectedMonth);
          setYear(selectedYear);
        }
    }, [currentDate]);

    const setContextYear = React.useCallback((selectedMonth: number, selectedYear: number) => {
        if (currentDate) {
          currentDate.setDateP(selectedYear, selectedMonth);
          setMonth(selectedMonth);
          setYear(selectedYear);
        }
    }, [currentDate]);

    const setContextDate = React.useCallback((selectedMonth: number, selectedYear: number) => {
        if (currentDate) {
          currentDate.setDateP(selectedYear, selectedMonth);
          setMonth(selectedMonth);
          setYear(selectedYear);
        }
    }, [currentDate]);

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
