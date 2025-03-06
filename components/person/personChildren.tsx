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

interface PersonChildrenProps {
    data: any;
}

const PersonChildren: React.FC<PersonChildrenProps> = ({
  data
}) => {
  const [children, setChildren] = useState(null);

  useEffect(() => {
    if (!data || !data.id) return;

    const fetchData = async () => {
      try {
        const session = await getSession() as CustomSession;
        let accessToken = session ? session.accessToken : null;

        const response = await fetch(
          `/api/rest/v4?endpoint=people%2Fchildren&personId=${data.id}`,
          { method: 'GET' }
        );
        if (!response.ok) {
          throw new Error('Errore durante la richiesta API response.ok: ' + response.status);
        }
        const jsonData: any = await response.json();
        setChildren(jsonData);
      } catch (error) {
        console.error("Errore durante la richiesta API", error);
      }
    };
    fetchData();
  }, [JSON.stringify(data)]);

  return (
      <>
        <br />

        <div className="container col-sm-12">

        {children?.length > 0 ? (
          <>
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Cognome</th>
                  <th>Data di nascita</th>
                  <th>Codice fiscale</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {[...children].map((child) => (
                    <tr key={child.name}>
                      <td>{child.name}</td>
                      <td>{child.surname}</td>
                      <td>{child.bornDate}</td>
                      <td>{child.taxCode != null ? child.taxCode : 'non presente'}</td>
                      <td className="col-xs-3 text-center">
                          <div className="btn-group" role="group" style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                              <a role="button" className="btn btn-primary" href="@{Persons.editChild(child.id)}" data-async-modal="#defaultModal">Modifica</a>
                              <a role="button" className="btn btn-danger" href="@{Persons.deleteChild(child.id)}" data-async-modal="#defaultModal">
                                  Elimina <i className="fa fa-trash"></i>
                              </a>
                          </div>
                      </td>

                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        ) : (
          <div className="alert alert-warning bg-yellow-100 text-yellow-700 p-2 rounded">
            Nessun figlio in anagrafica.
          </div>
        )}

        {data?.canJoinBadges && (
          <div className="text-center mb-4">
            <a
              className="btn btn-success bg-green-500 text-white px-4 py-2 rounded"
              href={`@{joinBadgesPerson(${person.id})}`}
              data-async-modal="#modalInsertBadge"
            >Inserisci figlio</a>
          </div>
        )}
      </div>
    </>
    );
  };

export default PersonChildren;
