import React, { useEffect, useState } from 'react';
import { fetchFindCode } from './callApi';
import { Table, Button } from "react-bootstrap";
import DataTable from 'react-data-table-component';

interface FindCodeContentProps {
parameters: any;
handleTabChange:(tabName:string, params:any) => void;
}

interface CodeData {
    id: number;
    code: string;
    description: string;
    categoryTabName: string;
    defaultTakableGroup: string;
    hasGroups: boolean;
    numberOfDays: number;
}

const FindCodeContent: React.FC<FindCodeContentProps> = ({
parameters,
handleTabChange
}) => {
    // Stato per i dati e il caricamento
    const [data, setData] = useState<CodeData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);

    // Effetto per chiamare l'API quando il componente viene montato
    useEffect(() => {
        fetchFindCode(parameters, setData, setLoading, setError, setTotalRows);
    }, []);

    const columns = [
        {
          name: 'Codice',
          selector: (row: DataType) => row.code,
          sortable: true,
        },
        {
          name: 'Tipologia',
          selector: (row: DataType) => row.defaultTakableGroup,
          sortable: true,
        },
        {
          name: 'Descrizione',
          selector: (row: DataType) => row.description,
          sortable: true,
        },
        {
          name: 'Seleziona',
          cell: (row: DataType) => (
                <button onClick={() => handleTabChange(row.categoryTabName, parameters)}>Seleziona</button>
              ),
              ignoreRowClick: true,
              allowoverflow: true,
              button: true,
            },
   ];

    const filteredData = data.filter(item =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
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
            {loading ? (
              <p>Caricamento...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <>
                <DataTable
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
              </>
            )}
          </div>
        );
}

export default FindCodeContent;


