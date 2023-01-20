import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { VacationSituations } from "../../types/vacationSituations";

import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap";

interface VacationRecapTableProps {
    vacationSituations: VacationSituations;
    tableName: string;
}

const VacationRecapTable: React.FC<VacationRecapTableProps> = ({
    vacationSituations,
    tableName
  }) => {

    const [showModal, setShowModal] = useState(false);
    let lastYearTR;
    let currentYearTR;
    let permissionTR;
    let caption;

    console.log("vacationSituations", vacationSituations);

    if (tableName == "tabellaFerie") {
      caption = "Ferie";
      vacationSituations?.map((vsr) => {
        vsr.lastYear != null ?	(
          lastYearTR = <>
                    <tr>
                      <td>{vsr.lastYear.year}</td>
                      <td>{vsr.lastYear.total} ({vsr.lastYear.accrued})</td>
                      <td>
                         <a href="" id="last-year-used" data-async-modal="#defaultModal" onClick={() => setModalOpen(!modalOpen)}>
                            {vsr.lastYear.used}
                         </a>
                      </td>
                      <td>{vsr.lastYear.usableTotal}
                         ({vsr.lastYear.usable})
                      </td>
                    </tr>
                  </>
        ) : (
        lastYearTR = ''
        ),

        vsr.currentYear != null ? (
          currentYearTR =
          <>
            <tr>
              <td>{vsr.currentYear.year}</td>
              <td>{vsr.currentYear.total} ({vsr.currentYear.accrued})</td>
              <td>
                 <a href="@{Vacations.personVacationSummary(vacationSituation.contract.id, vacationSituation.currentYear.year, 'VACATION')}"
                    data-async-modal="#defaultModal">
            {vsr.currentYear.used}
            </a>
            </td>
              <td>{vsr.currentYear.usableTotal}
                 ({vsr.currentYear.usable})
              </td>
            </tr>
          </>
        ) : (
        currentYearTR = ''
        )
      }
    )
    }

    if (tableName == "tabellaPermessi"){
    vacationSituations?.map((vsr) => {
    caption = "Permessi legge 937/77"

      vsr.permissions != null ? (
        permissionTR = <>
                  <tr>
                    <td>{vsr.permissions.year}</td>
                    <td>{vsr.permissions.total} ({vsr.permissions.accrued})</td>
                    <td>
                       <a href="@{Vacations.personVacationSummary(vacationSituation.contract.id, vacationSituation.lastYear.year, 'VACATION')}"
                          data-async-modal="#defaultModal">
                  {vsr.permissions.used}
                  </a>
                  </td>

                    <td>{vsr.permissions.usableTotal}
                       ({vsr.permissions.usable})
                    </td>
                  </tr>
                </>
      ) : (
        permissionTR = ''
        )
      }
    )
    }

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
        {lastYearTR}
        {currentYearTR}
        {permissionTR}
      </tbody>
    </Table>

    </>
    )
}

export default VacationRecapTable