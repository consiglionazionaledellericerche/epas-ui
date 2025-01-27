import React, { useEffect, useState } from 'react';
import { Table, Button } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import { BlockMealTicket } from "../../types/blockMealTicket";

interface MealTicketsTableProps {
data: BlockMealTicket[] ;
}

const MealTicketsTable: React.FC<MealTicketsTableProps> = ({
data
}) => {
    // Stato per i dati e il caricamento
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);

    const columns = [
        {
          name: <strong>Codice</strong>,
          selector: (row: any) => (
                                        <>
                                          <strong>{row.codeBlock}</strong> ({row.first}-{row.last})
                                        </>
                                      ),
          sortable: true,
        },
        {
          name: <strong>Consegnato il</strong>,
          selector: (row: any) => row.getReceivedDate,
          sortable: true,
        },
        {
          name: <strong>Scadenza</strong>,
          selector: (row: any) => row.getExpireDate,
          sortable: true,
        },
        {
          name: <strong>Maturati</strong>,
          selector: (row: any) => (
                                    <>
                                      <h5 className="text-danger"><strong>{row.getConsumed}</strong></h5>
                                    </>
                                  ),
          sortable: true,
        },
        {
          name: <strong>Da Maturare</strong>,
          selector: (row: any) => (
                                    <>
                                      <h5 className="text-success"><strong>{row.getRemaining}</strong></h5>
                                    </>
                                  ),
          sortable: true,
        },
   ];

    const filteredData = data.filter(item =>
      item.codeBlock?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

      const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };

      const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1);
      };

      const paginationComponentOptions = {
          rowsPerPageText: 'Elementi per pagina',
          rangeSeparatorText: 'di',
          selectAllRowsItem: true,
          selectAllRowsItemText: 'Tutti',
        };

        return (
          <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div>
                    <span>Visualizza</span>
                    <select
                      value={rowsPerPage}
                      onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
                      style={{ marginLeft: '5px' }}
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                    </select>
                    <span style={{ marginLeft: '5px' }}>elementi</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Cerca"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginRight: '5px' }}
                  />
                </div>
                <DataTable
                className="table datatable-mealTicket table-condensed center"
                  columns={columns}
                  data={paginatedData}
                  pagination
                  paginationServer
                  paginationTotalRows={filteredData.length}
                  paginationPerPage={rowsPerPage}
                  paginationDefaultPage={currentPage}
                  onChangePage={handlePageChange}
                  paginationComponentOptions={paginationComponentOptions}
                  highlightOnHover
                />
                <div style={{ marginTop: '20px' }}>
                  Vista da {(currentPage - 1) * rowsPerPage + 1} a {Math.min(currentPage * rowsPerPage, filteredData.length)} di {filteredData.length} elementi (filtrati da {totalRows} elementi totali)
                </div>
          </div>
        );
}

export default MealTicketsTable;


