import React from "react";
import {useState } from "react";
import { Table, Button } from "react-bootstrap";
import { VacationSituation } from "../../types/vacationSituation";
import VacationSummaryRow from "./vacationSummaryRow";

interface VacationRecapTableProps {
    vacationSituation: VacationSituation;
    tableName: string;
    param: string;
    setModal: Function;
    setParameters: Function;
    setTitleModal: Function;
}

const VacationRecapTable: React.FC<VacationRecapTableProps> = ({
    vacationSituation,
    tableName,
    param,
    setModal,
    setParameters,
    setTitleModal
  }) => {

    let caption;
    tableName == "tabellaFerie" ? ( caption = "Ferie") : ( caption = "Permessi legge 937/77")
    console.log("vacationSituation.lastYear", vacationSituation.lastYear);
    return (
    <>
    <div className="panel panel-primary">
      <div className="panel-heading">
        <h3 className="panel-title">{caption}</h3>
      </div>
      <div className="panel-body">
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
                <VacationSummaryRow
                vacationSummary={vacationSituation.lastYear}
                setModal={setModal}
                setTitleModal={setTitleModal}
                setParameters={setParameters}
                param={param+"&type=VACATION&year="+vacationSituation.lastYear.year} />
                <VacationSummaryRow
                vacationSummary={vacationSituation.currentYear}
                setModal={setModal}
                setTitleModal={setTitleModal}
                setParameters={setParameters}
                param={param+"&type=VACATION&year="+vacationSituation.currentYear.year} />
                </>
                ) : (
                <VacationSummaryRow
                vacationSummary={vacationSituation.permissions}
                setModal={setModal}
                setTitleModal={setTitleModal}
                setParameters={setParameters}
                param={param+"&type=PERMISSION&year="+vacationSituation.permissions.year} />
                )}
           </tbody>
      </Table>
      </div>
    </div>
    </>
    );
}

export default VacationRecapTable