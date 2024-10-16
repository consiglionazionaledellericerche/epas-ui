import React from "react";
import { Table } from "react-bootstrap";
import { Contract } from "../../types/contract";
import DateUtility from "../../utils/dateUtility";

interface VacationPeriodTableProps {
    contracts: Contract[];
}

const VacationPeriodTable: React.FC<VacationPeriodTableProps> = ({
    contracts
  }) => {

    return ( <>
    <p>I <strong>Piani Ferie</strong> attualmente associati sono i seguenti:</p><br />
    <Table id="tabellapianiferie" bordered hover>
    <caption className="sr-only">Piani Ferie</caption>
    <thead>
      <tr>
        <th className="info">Dal</th>
        <th className="info">Al</th>
        <th className="info">Valore</th>
      </tr>
    </thead>
    <tbody>
      {contracts?.map((contract) => {
                                      return contract.vacationPeriods?.map((vp) => {
                                     return <tr key={vp.id}>
                                       <td>{DateUtility.formatDate(vp.beginDate)}</td>
                                       <td>{vp.endDate ? DateUtility.formatDate(vp.endDate) : <em>Indeterminato</em>}</td>
                                       <td>{vp.vacationCode}</td>
                                     </tr>
                                                          }
                                       )
                                }
                        )
      }
    </tbody>
  </Table>
  </>
 );
}

export default VacationPeriodTable