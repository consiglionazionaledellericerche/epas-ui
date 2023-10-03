import React from "react";
import { Table } from "react-bootstrap";
import DateUtility from "../../utils/dateUtility";
import AbsencePopOver from "./absencePopOver";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { useState } from 'react';

function doesNotStartWithZero(variable:number) {
  return variable.toString()[0] !== '0';
}

function getTdElem(day, year, month, setTooltipContent, setShowTooltip, absencesRecap) {
    let dday = day < 10 && doesNotStartWithZero(day) ? `0${day}` : day;
    let item;

    try{
        item = absencesRecap.find(item => item.date === `${year}-${month.id}-${dday}`);
    }catch {
        item = absencesRecap;
    }

    if (!item  || item ===null){
      return (<div></div>);
    }
    else {
       return (<a href="#" onClick={(e) => e.preventDefault()}>
               <AbsencePopOver showGroup={true}
               key={`${month}-${day}`}
               absencesRecap={absencesRecap}
               item={item}
               day={day}
               setTooltipContent={setTooltipContent}
               setShowTooltip={setShowTooltip} />
               </a>);
    }
}

interface AbsencesYearlyTableProps {
    absencesRecap: Absence[];
    year: integer;
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

    return (
    <>
       <Tooltip id="tooltip-absencecode" className="tooltip-white webui-popover" isOpen={showTooltip} effect="solid" clickable={true}>
         {tooltipContent}
       </Tooltip>
        <Table id="assenzeannuali" className="table table-bordered table-hover table-condensed" >
            <caption className="sr-only">Assenze Annuali</caption>
            <thead>
            <tr className="warning">
                <th >Mese</th>
                <th colSpan="31">Giorni</th>
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
              <td key={`td-${month}-${day}`}>
              {getTdElem(day, year, month, setTooltipContent, setShowTooltip, absencesRecap)}
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