import React from "react";
import { Table } from "react-bootstrap";
import { VacationSummary } from "../../types/vacationSummary";
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap";

interface VacationSummaryProps {
    vacationSummary: VacationSummary;
    showModal: boolean;
}

const VacationSummary: React.FC<VacationSummaryProps> = ({
    vacationSummary,
    showModal
  }) => {
    return (
    <>
            <Modal onClose={() => setShowModal(false)} show={showModal}>
              <h4>{caption}</h4>

               <div class="col-md-12">
                 <i class="fa fa-info-circle"></i> Per il primo anno di contratto il dipendente potrà usufruire dei soli giorni maturati.
               </div>

               <div class="col-md-6 col-md-offset-3">
                 <table class="table">
                   <tr>
                     <td><strong>Totali</strong></td>
                     <td>{vacationSummary.total}</td>
                   </tr>
                   <tr>
                     <td><strong>Maturate</strong></td>
                     <td>{vacationSummary.accrued}</td>
                   </tr>
                   <tr>
                     <td><strong>Usate</strong></td>
                     <td>{vacationSummary.used}</td>
                   </tr>
                   <tr>
                     <td><strong>vacations.takable</strong></td>
                     <td>{vacationSummary.usable} <i class="fa fa-info-circle"></i></td>
                   </tr>
                   <tr>
                     <td><strong>Limite Massimo Utilizzo</strong></td>
                     <td></td>
                   </tr>
                 </table>
               </div>
            </Modal>


    </>
    )
}

export default VacationRecapTable