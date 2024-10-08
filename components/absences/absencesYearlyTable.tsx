import React from "react";
import { Table } from "react-bootstrap";
import DateUtility from "../../utils/dateUtility";
import AbsencePopOver from "./absencePopOver";
import { useState } from 'react';
import { AbsenceShow } from "../../types/absenceShow";

function doesNotStartWithZero(variable:number) {
  return variable.toString()[0] !== '0';
}

function getTdElem(day: number, year: number, month: string, absencesRecap: AbsenceShow[]) {
    let dday = day < 10 && doesNotStartWithZero(day) ? `0${day}` : day;
    let item;

    try{
        item = absencesRecap.find(recap => recap && DateUtility.formatDateLocal(recap.date) === `${year}-${month}-${dday}`);
    }catch {
        item = null;
    }

    if (!item  || item ===null){
      return (<div></div>);
    }
    else {
       return (<a href="#" onClick={(e) => e.preventDefault()}>
               <AbsencePopOver showGroup={true}
               key={`${month}-${day}`}
               absElem={item}
               day={day}/>
               </a>);
    }
}

interface AbsencesYearlyTableProps {
    absencesRecap: AbsenceShow[];
    year: number;
}

const AbsencesYearlyTable: React.FC<AbsencesYearlyTableProps> = ({
    absencesRecap,
    year
  }) => {

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        { 'id': '01', 'name': 'Gennaio' },
        { 'id': '02', 'name': 'Febbraio' },
        { 'id': '03', 'name': 'Marzo' },
        { 'id': '04', 'name': 'Aprile' },
        { 'id': '05', 'name': 'Maggio' },
        { 'id': '06', 'name': 'Giugno' },
        { 'id': '07', 'name': 'Luglio' },
        { 'id': '08', 'name': 'Agosto' },
        { 'id': '09', 'name': 'Settembre' },
        { 'id': '10', 'name': 'Ottobre' },
        { 'id': '11', 'name': 'Novembre' },
        { 'id': '12', 'name': 'Dicembre' }
    ];


  const colSpan=31;

    return (
    <>
        <Table id="assenzeannuali" className="table table-bordered table-hover table-condensed" >
            <caption className="sr-only">Assenze Annuali</caption>
            <thead>
            <tr className="warning">
                <th >Mese</th>
                <th colSpan={colSpan}>Giorni</th>
            </tr>
            <tr className="warning">
            <th></th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
            </tr>
            </thead>
            <tbody>
            {months.map((month) => (
            <tr key={`tr-${month.name}`}>
            <td key={month.name}>{month.name}</td>
              {days.map((day) => (
              <td key={`td-${month.id}-${day}`}>
              {getTdElem(day, year, month.id, absencesRecap)}
              </td>

              ))}
            </tr>
            ))}
            </tbody>
        </Table>

       </>
    );
}

export default AbsencesYearlyTable