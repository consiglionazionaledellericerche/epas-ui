import React from "react";
import { Table } from "react-bootstrap";
import DateUtility from "../../utils/dateUtility";
import AbsencePopOver from "./absencePopOver";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { useState } from 'react';
import { AbsenceShow } from "../../types/absenceShow";

function doesNotStartWithZero(variable:number) {
  return variable.toString()[0] !== '0';
}

function getTdElem(day: number, year: number, month: string, setTooltipContent: Function, setShowTooltip: Function, absencesRecap: AbsenceShow[]) {
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
               item={item}
               day={day}
               setTooltipContent={setTooltipContent}
               setShowTooltip={setShowTooltip} />
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
    const months = [{'id':'01', 'name':'January'},{'id':'02', 'name':'February'},{'id':'03', 'name':'March'},
     {'id':'04', 'name':'April'}, {'id':'05', 'name':'May'}, {'id':'06', 'name':'June'},
      {'id':'07', 'name':'July'},{'id':'08', 'name': 'August'},
     {'id':'09', 'name':'September'}, {'id':'10', 'name':'October'},
     {'id':'11', 'name':'November'}, {'id':'12', 'name':'December'}];

  const [tooltipContent, setTooltipContent] = useState('');
  const [showTooltip, setShowTooltip] = useState(true);

  const colSpan=31;

    return (
    <>
       <Tooltip id="tooltip-absencecode" className="tooltip-white webui-popover" isOpen={showTooltip} clickable={true}>
         {tooltipContent}
       </Tooltip>
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
              {getTdElem(day, year, month.id, setTooltipContent, setShowTooltip, absencesRecap)}
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