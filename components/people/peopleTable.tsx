import React, { useEffect, useState } from 'react';
import { Table, Button } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import PeopleModal from "./peopleModal";

interface PeopleTableProps {
data: any;
typeTable: string
}

const PeopleTable: React.FC<PeopleTableProps> = ({data, typeTable}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [personId, setPersonId] = useState<number | null>(null);
    const [modalType, setModalType] = useState<string | null>(null);
    const [titleModal, setTitleModal] = useState<string | null>(null);

    function showModalFunct(modalType:string, personId:number, fullname: string){
      setModalType(modalType);
      setPersonId(personId);
      if (modalType =="WT"){
        setTitleModal("Tipo Orario Attuale di "+fullname);
      } else {
        setTitleModal("Piano Ferie Attuale di "+fullname);
      }
      setShowModal(true);
    }

    const closeModal= () => {
      setShowModal(false);
      setTitleModal(null);
      setModalType(null);
      setPersonId(null);
    }

    const columns = [
        {
          name: <strong>Nome</strong>,
          selector: (row: any) => (<>
                                      <a href={`/personEdit?personId=${row.id}`}
                                        style={{ color: typeTable === "A" ? "#0000FF" : "#808080" }}>
                                      {row.fullname}
                                      </a>
                                    </>
                                      ),
          sortable: true,
          conditionalCellStyles: [
                {
                  when: (row) => typeTable === "A",
                  style: { backgroundColor: '#dff0d8'},
                }
              ],
        },
        {
          name: <strong>Matricola</strong>,
          selector: (row: any) => row.number,
          sortable: true,
          conditionalCellStyles: [
            {
              when: (row) => typeTable !== "A",
              style: { color: "#808080" },
            },
          ],
        }];

   const columnsWithContract = [{
          name: <strong>Inizio Contratto</strong>,
          selector: (row: any) => row.currentContracts?.beginDate,
          sortable: true,
        },
        {
          name: <strong>Fine Contratto</strong>,
          selector: (row: any) => row.currentContracts?.endDate,
          sortable: true,
        },
        {
          name: <strong>Tipo orario</strong>,
          selector: (row: any) => <a href="#" onClick={(e) => {e.preventDefault(); showModalFunct("WT", row.id, row.fullname);}}>
          {row.currentWorkingTimeType?.description}
          </a>,
          sortable: true,
        },
       {
         name: <strong>Ferie</strong>,
         selector: (row: any) => <a href="#" onClick={(e) => {e.preventDefault(); showModalFunct("VA", row.id, row.fullname);}}>
         {row.currentVacationPeriod?.label}
         </a>,
         sortable: true,
       },
       {
         name: <strong>Livello</strong>,
         selector: (row: any) => row.qualification,
         sortable: true,
       },
       {
         name: <strong>Sede</strong>,
         selector: (row: any) => row.office.name,
         sortable: true,
       },
       {
         name: <strong>Invio email</strong>,
         selector: (row: any) => (
             row.wantEmail ? <input type="checkbox" checked={row.wantEmail} disabled /> : ''
           ),
         sortable: true,
       },
   ];

    const columnsWithoutContract = [
        {
           name: <strong>Livello</strong>,
           selector: (row: any) => row.qualification,
           sortable: true,
           conditionalCellStyles: [
             {
               when: (row) => typeTable !== "A",
               style: { color: "#808080" },
             },
           ],
         },
        {
          name: <strong>Username</strong>,
          selector: (row: any) => row.user.username,
          sortable: true,
        },
         {
           name: <strong>Email</strong>,
           selector: (row: any) => row.email,
           sortable: true,
           conditionalCellStyles: [
             {
               when: (row) => typeTable !== "A",
               style: { color: "#808080" },
             },
           ],
         }];

    let columnsAll = typeTable == "A" ? columns.concat(columnsWithContract) : columns.concat(columnsWithoutContract);

    const filteredData = data.filter(item =>
      item.fullname?.toLowerCase().includes(searchTerm.toLowerCase())
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

        return (<>
          <PeopleModal
           title={titleModal}
           tmpshow={showModal}
           close={() => closeModal()}
           personId={personId}
           modalType={modalType}/>
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
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
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
                striped
                className="table-bordered"
                  columns={columnsAll}
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
          </>
        );
}

export default PeopleTable;


