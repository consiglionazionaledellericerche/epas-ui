import React from "react";
import { Table, Button } from "react-bootstrap";
import CalcTotRow from "./calcTotRow";
import { useState, useEffect } from 'react';
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react"
import { useRequest } from "../../../request/useRequest"
import { Spinner } from 'react-bootstrap'

interface CalcTotProps {
    data;
}

const CalcTot: React.FC<CalcTotProps> = ({
    data
  }) => {

    return(
    <>
	     <p>Sono stati calcolati <strong>{data.total}</strong> giorni totali.<br/>
	     I giorni totali di maturazione per l&#39;anno {data.year} sono <strong>{data.accruedDayTotal}</strong>.<br/>
	     { !data.postPartumisEmpty ? (<span>Dai giorni dell&#39;anno sono sottratti <strong>{data.postPartumSize}</strong>
	                                  giorni di assenza usufruiti che non contribuiranno alla maturazione.</span>)  : ''
        }
	     </p>
       <Table className="table table-condensed center">
        <thead>
         <tr>
           <th>Piano Ferie</th>
           <th>Data di Maturazione</th>
           <th>Maturati</th>
           <th>Progressione</th>
           <th>Giorni nell&#39;anno</th>
           { !data.postPartumisEmpty ? <th>Giorni riduzione</th> :''}
         </tr>
         </thead>
        <tbody>
         {  data.absenceSubPeriods?.map((period) => {
            return ( period.vacationCode ? (
              <>
              <CalcTotRow subperiod={period}/>
              </> ) : ''
            );
         })
         }
         </tbody>
       </Table>
	   </>
    );
}

export default CalcTot