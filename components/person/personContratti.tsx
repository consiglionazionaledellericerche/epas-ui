import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { CustomSession } from '../../types/customSession';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import DateUtility from "../../utils/dateUtility";

const hasPermission = (permission: string) => {
  const userPermissions = ["Persons.update", "Persons.updateBeginDate", "Persons.updatedAt"]; // Esempio
  return userPermissions.includes(permission);
};

interface PersonContrattiProps {
    data: any;
}
interface Person {
  id: number;
  surname: string;
  name: string;
  number: string;
  email: string;
  fiscalCode: string;
  username: string;
  qualification: string;
  office: string;
  beginDate?: string;
  updatedAt?: string;
  wantEmail: boolean;
  telephone: string;
  birthday?: string;
  residence: string;
  perseoId?: string;
  eppn?: string;
}
const PersonContratti: React.FC<PersonContrattiProps> = ({
  data
}) => {
  const [currentContract, setCurrentContract] = useState(null);
  const [person, setPerson] = useState(null);
  const [contracts, setContracts] = useState(null);

  useEffect(() => {
    if (!data || !data.id) return;

    const fetchData = async () => {
      try {
        const session = await getSession() as CustomSession;
        let accessToken = session ? session.accessToken : null;

        console.log("personId>>> ", data.id);

        const response = await fetch(
          `/api/rest/v4?endpoint=contracts%2FpersonContracts&personId=${data.id}`,
          { method: 'GET' }
        );

        if (!response.ok) {
          throw new Error('Errore durante la richiesta API response.ok: ' + response.status);
        }

        const jsonData: any = await response.json();
        setCurrentContract(jsonData.wrCurrentContract);
        setPerson(jsonData.wrPerson);
        setContracts(jsonData.contractList);
      } catch (error) {
        console.error("Errore durante la richiesta API", error);
      }
    };

    fetchData();
  }, [JSON.stringify(data)]);

  let contractType = "";

  if (currentContract?.endDate == null && !currentContract?.temporaryMissing) {
      contractType = "Indeterminato";
  } else if (currentContract.temporaryMissing) {
     contractType = "Tempo determinato da definire";
  } else {
      contractType = DateUtility.formatDate(currentContract?.endDate);
  }

  return (
      <>
        <br />
        {/* Configurazione ePAS Contratto Attuale */}
        <div className="card panel-primary mb-4">
          <div className="card-header text-white panel-heading">Configurazione ePAS Contratto Attuale</div>
          <div className="card-body">
            <Form.Group className="form-group" controlId="beginDate">
              <Form.Label className="col-sm-3 control-label">Inizio Contratto</Form.Label>
              <Form.Label className="col-sm-6 label-normal">{DateUtility.formatDate(currentContract?.beginDate)}</Form.Label>
            </Form.Group>

            <Form.Group className="form-group" controlId="endDate">
              <Form.Label className="col-sm-3 control-label">Fine Contratto</Form.Label>
              <Form.Label className="col-sm-6 label-normal">{contractType}</Form.Label>
            </Form.Group>

            {currentContract?.endContract && (
              <Form.Group className="form-group" controlId="endContract">
                <Form.Label className="col-sm-3 control-label">Terminazione Contratto</Form.Label>
                <Form.Label className="col-sm-6 label-normal">{DateUtility.formatDate(currentContract?.endContract)}</Form.Label>
              </Form.Group>
            )}

            <Form.Group className="form-group" controlId="inAttestati">
              <Form.Label className="col-sm-3 control-label">In Attestati</Form.Label>
              <div className="col-sm-6">
                <Form.Check
                  className="radio-inline"
                  type="checkbox"
                  checked={currentContract?.onCertificate || false}
                  readOnly
                />
              </div>
            </Form.Group>

            <Form.Group className="form-group" controlId="tipoOrario">
              <Form.Label className="col-sm-3 control-label">Tipo Orario</Form.Label>
              <Form.Label className="col-sm-6 label-normal">{person?.currentWorkingTimeType?.description}</Form.Label>
            </Form.Group>

            <Form.Group className="form-group" controlId="pianoFerie">
              <Form.Label className="col-sm-3 control-label">Piano Ferie</Form.Label>
              <Form.Label className="col-sm-6 label-normal">{person?.currentVacationPeriod?.label}</Form.Label>
            </Form.Group>

            <Form.Group className="form-group" controlId="presenzaAutomatica">
              <Form.Label className="col-sm-3 control-label">Presenza Automatica</Form.Label>
              <div className="col-sm-6">
                <Form.Check
                  className="radio-inline"
                  type="checkbox"
                  checked={person?.currentContractStampProfile?.fixedworkingtime || false}
                  readOnly
                />
              </div>
            </Form.Group>

            <br />
            <div className="col-sm-12">
              <Alert variant="info">
                È possibile modificare la configurazione attuale del dipendente attraverso le funzionalità
                raggiungibili dal pannello sottostante <strong>Gestisci Contratti</strong>
              </Alert>
            </div>
          </div>
        </div>

        {/* Gestisci Contratti */}
        <div className="card panel-primary mb-4">
          <div className="card-header panel-heading text-white">Gestisci Contratti</div>
          <div className="card-body">
            <div className="text-center">
              <p>
                <a
                  className="btn btn-success"
                  href="#"
                  onClick={() => console.log("Apri inserimento contratto")}
                  data-async-modal="#defaultModal"
                >
                  <span className="glyphicon glyphicon-plus"></span> Inserisci un nuovo contratto
                </a>
              </p>
            </div>

            <table className="table table-hover">
              <thead>
                <tr className="warning">
                  <th>Inizio contratto</th>
                  <th>Fine contratto</th>
                  <th>Terminazione esperienza</th>
                  <th>Continuativo del precedente</th>
                  <th>Gestisci</th>
                  <th>Storico</th>
                </tr>
              </thead>
              <tbody>
                  {contracts?.map((contract, index) => (
                    <tr key={index}>
                      <td>{DateUtility.formatDate(contract.beginDate)}</td>
                      <td>
                        {contract.endDate ? (
                          DateUtility.formatDate(contract.endDate)
                        ) : contract.isTemporaryMissing ? (
                          <em className="text-danger">Tempo determinato da definire !!!</em>
                        ) : (
                          <em>Indeterminato</em>
                        )}
                      </td>
                      <td>{contract.endContract ? DateUtility.formatDate(contract.endContract) : ""}</td>
                      <td>{contract.previousContract ? "SI" : ""}</td>
                      <td>
                        <Button variant="primary" size="sm">Gestisci</Button>
                      </td>
                      <td>
                        <Button variant="secondary" size="sm">Storico</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

export default PersonContratti;
