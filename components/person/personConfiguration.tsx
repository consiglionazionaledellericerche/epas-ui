import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { CustomSession } from '../../types/customSession';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';

interface PersonConfigurationProps {
    data: any;
}

const PersonConfiguration: React.FC<PersonConfigurationProps> = ({
  data
}) => {
  const [personConfigurations, setPersonConfigurations] = useState(null);
  const [enableCovid, setEnableCovid] = useState(false);
  const [enableSmartworking, setEnableSmartworking] = useState(false);
  const translation = useTranslations('Message');

  useEffect(() => {
    if (!data || !data.id) return;

    const fetchData = async () => {
      try {
        const session = await getSession() as CustomSession;
        let accessToken = session ? session.accessToken : null;

        const response = await fetch(
          `/api/rest/v4?endpoint=configurations%2FpersonShow&personId=${data.id}`,
          { method: 'GET' }
        );
        if (!response.ok) {
          throw new Error('Errore durante la richiesta API response.ok: ' + response.status);
        }
        const jsonData: any = await response.json();
        setPersonConfigurations(jsonData.personConfigurations);
        setEnableCovid(jsonData.enableCovid);
        setEnableSmartworking(jsonData.enableSmartworking);
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
          <div className="col-sm-12">
            <Alert variant="info">
              <p>Elenco dei parametri <em><strong>generali</strong></em> di configurazione ed il loro valore.</p>
            </Alert>
          </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Parametro</th>
                  <th>Valore</th>
                </tr>
              </thead>
          {personConfigurations?.length > 0 && (
                    <tbody>
                      {personConfigurations
                        .filter(
                          (conf) =>
                            conf.epasParams.category === "GENERAL" &&
                            (conf.epasParams.name !== "covid_19" || enableCovid) &&
                            (conf.epasParams.name !== "smartworking" || enableSmartworking)
                        )
                        .map((conf) => (
                          <tr key={conf.epasParams.name}>
                            <td>
                              <a
                                href={`@{Configurations.personEdit(${conf.epasParams.name})}`}
                                data-async-modal="#defaultModal"
                              >
                                  {translation(conf.epasParams.name)}
                              </a>
                            </td>
                            <td>{conf.valore ? "SI" : "NO"}</td>
                          </tr>
                        ))}
                    </tbody>
                  )}
         </table>
      </div>
    </>
    );
  };

export default PersonConfiguration;
