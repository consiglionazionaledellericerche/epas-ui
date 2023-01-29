import React from "react";
import { Table, Button } from "react-bootstrap";
import DateUtility from "../../../utils/dateUtility";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

interface InfoTotProps {
    data;
}

const InfoTot: React.FC<InfoTotProps> = ({
    data
  }) => {
  console.log('InfoTot data>>>>', data);

    return(
    <>
     <div className="col-md-12">
      <div className="alert alert-info">
      <FontAwesomeIcon icon={faCircleInfo}/>
       &nbsp;Per il primo anno di contratto il dipendente potrà usufruire dei soli giorni maturati.
      </div>
     </div>

	 <div className="col-md-6 col-md-offset-3">
		   <Table className="table">
		     <tr>
		       <td><strong>Totali</strong></td>
		       <td>{data.total}</td>
		     </tr>
		     <tr>
		       <td><strong>Maturate</strong></td>
		       <td>{data.accrued}</td>
		     </tr>
		     <tr>
		       <td><strong>Usate</strong></td>
		       <td>{data.used}</td>
		     </tr>
		     <tr>
           <td><strong>Usufruibili</strong></td>
           <td>{data.usable} <FontAwesomeIcon icon={faCircleInfo}/></td>
         </tr>
         <tr>
           <td><strong>Limite Massimo Utilizzo</strong></td>
           <td>{DateUtility.formatDate(data.upperLimit)}</td>
         </tr>
		   </Table>
	   </div>
	   </>
    );
}

export default InfoTot