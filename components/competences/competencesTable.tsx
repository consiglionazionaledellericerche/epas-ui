import React, { useState, useEffect } from "react";
import { getSession } from 'next-auth/react';
import { CustomSession } from '../../types/customSession';
import { Table } from "react-bootstrap";
import DateUtility from "../../utils/dateUtility";
import { CompetenceCode } from "../../types/competenceCode";

interface CompetencesTableProps {
  competencesCode: Array<CompetenceCode>;
  year: number;
  month: number;
}

const CompetencesTable: React.FC<CompetencesTableProps> = ({
  competencesCode,
  year,
  month
}) => {
  return (
    <>
      <Table id="competence" className="table hour-recap table-condensed center">
        <caption className="sr-only">Riepilogo competenze {month} {year}</caption>
        <thead>
          <tr className="warning">
            <th>Competenza</th>
            <th>Quantit&agrave;</th>
          </tr>
        </thead>
        <tbody>
          {competencesCode.map((row) => {
            return (
              <tr key={row.code}>
                <td>{row.description} ({row.code})</td>
                <td>{row.value}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default CompetencesTable;
