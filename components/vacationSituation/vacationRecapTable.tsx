import {React, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { vacationSituation } from "../../types/vacationSituation";
import VacationSummaryRow from "./vacationSummaryRow";

interface VacationRecapTableProps {
    vacationSituation: VacationSituation;
    tableName: string;
    param: string;
    setModal;
    setParameters;
}

const VacationRecapTable: React.FC<VacationRecapTableProps> = ({
    vacationSituation,
    tableName,
    param,
    setModal,
    setParameters
  }) => {

    let caption;

    tableName == "tabellaFerie" ? ( caption = "Ferie") : ( caption = "Permessi legge 937/77")

    return (
    <>
      <h4>{caption}</h4>
      <Table id={tableName} bordered className="riepilogo-ore table-smr">
          <caption className="sr-only">{caption}</caption>
          <thead>
          <tr className="warning">
              <th>Anno</th>
              <th>Totali (maturate)</th>
              <th>Utilizzate</th>
              <th>Residue (maturate)</th>
          </tr>
          </thead>
          <tbody>
                {tableName == 'tabellaFerie' ? (
                <>
                <VacationSummaryRow vacationSummary={vacationSituation.lastYear} setModal={setModal} setParameters={setParameters} param={param} />
                <VacationSummaryRow vacationSummary={vacationSituation.currentYear} setModal={setModal} setParameters={setParameters} param={param} />
                </>
                ) : (
                <VacationSummaryRow vacationSummary={vacationSituation.permissions} setModal={setModal} setParameters={setParameters} param={param} />
                )}
           </tbody>
      </Table>
    </>
    );
}

export default VacationRecapTable