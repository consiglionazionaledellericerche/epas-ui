import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { getSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const hasPermission = (permission: string) => {
  const userPermissions = ["Persons.update", "Persons.updateBeginDate", "Persons.updatedAt"]; // Esempio
  return userPermissions.includes(permission);
};

interface PersonDatiAnagraficiProps {
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
const PersonDatiAnagrafici: React.FC<PersonDatiAnagraficiProps> = ({
  data
}) => {
  const { register, handleSubmit } = useForm({ defaultValues:data });
  const [wantEmail, setWantEmail] = useState(data.wantEmail);

  const onSubmit = (data: Person) => {
    console.log("Form submitted:", data);
  };

  return (
    <>
    <br/>
      <div>
      <Form onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
        <input type="hidden" {...register("id")} />

        {/* Dati personali */}
        <div className="card panel-primary mb-4">
          <div className="card-header text-white panel-heading">Dati personali</div>
          <div className="card-body">
            <Form.Group className="form-group" controlId="surname">
              <Form.Label className="col-sm-3 control-label">Cognome</Form.Label>
              <div className="col-sm-6">
                <Form.Control {...register("surname")} required />
              </div>
            </Form.Group>

            <Form.Group className="form-group" controlId="name">
              <Form.Label className="col-sm-3 control-label">Nome</Form.Label>
              <div className="col-sm-6">
                <Form.Control {...register("name")} required />
              </div>
            </Form.Group>

            <Form.Group className="form-group" controlId="number">
              <Form.Label className="col-sm-3 control-label">Matricola</Form.Label>
              <div className="col-sm-6">
                <Form.Control {...register("number")} />
              </div>
            </Form.Group>

            <Form.Group className="form-group" controlId="email">
              <Form.Label className="col-sm-3 control-label">Email</Form.Label>
              <div className="col-sm-6">
                <Form.Control type="email" {...register("email")} />
              </div>
            </Form.Group>

            <Form.Group className="form-group" controlId="fiscalCode">
              <Form.Label className="col-sm-3 control-label">Codice Fiscale</Form.Label>
              <div className="col-sm-6">
                  <Form.Control {...register("fiscalCode")} />
              </div>
            </Form.Group>

            <Form.Group className="form-group" controlId="username">
              <Form.Label className="col-sm-3 control-label">Username in ePAS</Form.Label>
              <div className="col-sm-6">
                  <Form.Control {...register("username")} disabled />
              </div>
            </Form.Group>

            <Form.Group className="form-group" controlId="qualification">
              <Form.Label className="col-sm-3 control-label">Livello</Form.Label>
              <div className="col-sm-6">
                <Form.Select {...register("qualification")}>
                {/* Aggiungere qui le opzioni dinamiche */}
                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group className="form-group" controlId="office">
              <Form.Label className="col-sm-3 control-label">Sede</Form.Label>
              <div className="col-sm-6">
                <Form.Select {...register("office")}>
                {/* Aggiungere qui le opzioni dinamiche */}
                </Form.Select>
              </div>
            </Form.Group>

            {hasPermission("Persons.updateBeginDate") && (
              <Form.Group className="form-group" controlId="beginDate">
                <Form.Label className="col-sm-3 control-label">Data di inizio</Form.Label>
                <div className="col-sm-6">
                    <Form.Control type="date" {...register("beginDate")} />
                </div>
              </Form.Group>
            )}

            {hasPermission("Persons.updatedAt") && (
              <Form.Group className="form-group" controlId="updatedAt">
                <Form.Label className="col-sm-3 control-label">Ultima Modifica</Form.Label>
                <div className="col-sm-6">
                    <Form.Control type="text" {...register("updatedAt")} disabled />
                </div>
              </Form.Group>
            )}

            <Form.Group className="form-group" controlId="wantEmail">
              <Form.Label className="col-sm-3 control-label">Invio Email</Form.Label>
              <div className="col-sm-6">
                <Form.Check
                className="radio-inline "
                      type="radio"
                      label="Sì"
                      value="yes"
                      {...register("wantEmail")}
                    />
                    <Form.Check
                    className="radio-inline "
                      type="radio"
                      label="No"
                      value="no"
                      {...register("wantEmail")}
                    />
              </div>
            </Form.Group>

            {wantEmail && (
              <>
              <br/>
              <div className="col-sm-6 col-sm-offset-3">
                <Alert variant="info">
                  Abilitando l'invio mail per il dipendente, si permetterà alle procedure di controllo sui
                  <strong> giorni con timbrature disaccoppiate</strong> e sui
                  <strong> giorni con mancanza di timbrature e codici assenza</strong>,
                  di inviare una mail al dipendente contenente i giorni in cui sono stati riscontrati i casi descritti.
                </Alert>
              </div>
              </>
            )}
          </div>
        </div>

        {/* Altre informazioni */}
        <div className="card panel-primary mb-4">
          <div className="card-header panel-heading text-white">Altre informazioni</div>
          <div className="card-body">
            <Form.Group className="form-group" controlId="telephone">
              <Form.Label className="col-sm-3 control-label">Telefono</Form.Label>
              <div className="col-sm-6">
                <Form.Control {...register("telephone")} />
              </div>
            </Form.Group>

            <Form.Group className="form-group" controlId="birthday">
              <Form.Label className="col-sm-3 control-label">Data di nascita</Form.Label>
              <div className="col-sm-6">
                <Form.Control type="date" {...register("birthday")} />
              </div>
            </Form.Group>

            <Form.Group className="form-group" controlId="residence">
              <Form.Label className="col-sm-3 control-label">Residenza</Form.Label>
              <div className="col-sm-6">
                  <Form.Control {...register("residence")} />
              </div>
            </Form.Group>

            {hasPermission("Persons.updatePerseoId") && (
              <Form.Group className="form-group" controlId="perseoId">
                <Form.Label className="col-sm-3 control-label">ID Perseo</Form.Label>
                <div className="col-sm-6">
                    <Form.Control {...register("perseoId")} />
                 </div>
              </Form.Group>
            )}

            {hasPermission("Persons.updateEppn") && (
              <Form.Group className="form-group" controlId="eppn">
                <Form.Label className="col-sm-3 control-label">Eppn (Per login Shibboleth)</Form.Label>
                <div className="col-sm-6">
                    <Form.Control {...register("eppn")} />
                </div>
              </Form.Group>
            )}
            <br/>
            <div className="col-sm-6 col-sm-offset-3">
              <Alert variant="info">
                Il campo opzionale <strong>Eppn</strong> viene utilizzato per il login shibboleth quando attivo.
              </Alert>
            </div>
          </div>
        </div>

        {/* Bottone di salvataggio */}
        {hasPermission("Persons.update") && (
          <div className="text-center">
            <Button type="submit" variant="primary">
              Salva
            </Button>
          </div>
        )}
      </Form>
    </div>
    </>
  );
}


export default PersonDatiAnagrafici;
