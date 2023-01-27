import React from "react";
import { Table, Button } from "react-bootstrap";

interface InfoTotProps {
    data;
}

const InfoTot: React.FC<InfoTotProps> = ({
    data
  }) => {

    return(
     <div className="col-md-12">
       <i className="fa fa-info-circle"></i> Per il primo anno di contratto il dipendente potrà usufruire dei soli giorni maturati.
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
           <td><strong>vacations.takable</strong></td>
           <td>{data.usable} <i className="fa fa-info-circle"></i></td>
         </tr>
         <tr>
           <td><strong>Limite Massimo Utilizzo</strong></td>
           <td>{DateUtility.formatDate(data.upperLimit)}</td>
         </tr>
		   </Table>
	   </div>
    );
}

export default InfoTot