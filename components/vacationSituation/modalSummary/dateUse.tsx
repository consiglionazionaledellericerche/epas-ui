import React, { useState } from "react";
import { Table } from "react-bootstrap";
import DateUtility from "../../../utils/dateUtility";
import ReactPaginate from 'react-paginate';
import { VacationSummary } from "../../../types/vacationSummary";

interface DateUseProps {
    data: VacationSummary;
}

const DateUse: React.FC<DateUseProps> = ({
    data
  }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value);
            setCurrentPage(0); // Reset della paginazione in caso di nuova ricerca
        };

    // Filtra i dati in base al termine di ricerca
    const filteredAbsences = data.absencesUsed?.filter((absence) =>
        absence.absenceType.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        absence.absenceType.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        DateUtility.formatDate(absence.personDay.date).includes(searchTerm)
    ) || [];

    // Calcola le righe per la pagina corrente
    const offset = currentPage * rowsPerPage;
    const currentRows = filteredAbsences.slice(offset, offset + rowsPerPage);
    const pageCount = Math.ceil(filteredAbsences.length / rowsPerPage);

    // Funzione per cambiare pagina
    const handlePageClick = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setRowsPerPage(parseInt(e.target.value));
            setCurrentPage(0);
        };

    let rowElem = currentRows.map((absence) => {
        let trID = absence.absenceType.code + "$" + DateUtility.formatDate(absence.personDay.date);
        return (
            <tr key={trID}>
                <td data-order={absence.personDay.date}>{DateUtility.formatDate(absence.personDay.date)}</td>
                <td>{absence.absenceType.code}</td>
                <td>{absence.absenceType.description}</td>
            </tr>
        );
    });

    return(
        <>
           {data.sourced && data.sourced > 0 ? (<div className="alert alert-info">
                                 <p><strong>{data.sourced}</strong> giorni utilizzati sono stati definiti da da inizializzazione ePAS.</p>
                                 </div>)  : ''
           }

          <div className="col-md-8 col-md-offset-2">

           <div className="d-flex justify-content-between mb-2">
           <div className="d-flex align-items-center mb-2"><strong>Visualizza&nbsp;</strong>
           <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="form-control" style={{ width: "auto" }}>
               <option value={5}>5</option>
               <option value={10}>10</option>
               <option value={15}>15</option>
           </select>
           <strong>&nbsp;elementi</strong></div>

            <input
                type="text"
                placeholder="Cerca..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="form-control"
                style={{ width: "200px" }}
            />
            </div>
            <Table className="table table-condensed table-hover">
                <thead>
                    <tr className="warning">
                        <th className="col-xs-4">Data</th>
                        <th className="col-xs-2">Codice</th>
                        <th className="col-xs-6">Descrizione</th>
                    </tr>
                </thead>
                <tbody>{rowElem}</tbody>
            </Table>
<div className="d-flex justify-content-between mb-2">
            <div className="d-flex align-items-center mb-2">
                Vista da {offset + 1} a {Math.min(offset + rowsPerPage, filteredAbsences.length)} di {filteredAbsences.length} elementi
            </div>
            <ReactPaginate
                previousLabel={"← Precedente"}
                nextLabel={"Successivo →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
            </div>
        </div>
          </>
    );
}

export default DateUse