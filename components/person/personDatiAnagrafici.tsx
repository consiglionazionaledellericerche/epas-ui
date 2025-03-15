import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Form, Button, Container, Row, Col, Alert} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { getSession } from 'next-auth/react';
import { CustomSession } from '../../types/customSession';
import { secureCheck } from '../../utils/secureCheck';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const { register, handleSubmit, setValue, watch } = useForm({ defaultValues: data });
  const [wantEmail, setWantEmail] = useState(data.wantEmail);
  const [canUpdate, setCanUpdate] = useState(false);
  const [qualifications, setQualifications] = useState([]);
  const [offices, setOffices] = useState([]);

  const onSubmit = async (data: Person) => {
     console.log("Form submitted:", data);

     try {
       const session = await getSession() as CustomSession;
       let accessToken = session ? session.accessToken : null;

       const response = await fetch(`/api/rest/v4?endpoint=people%2Fupdate`,
                                   {method: 'POST',
                                    headers: {
                                      'Accept': 'application/json',
                                      'Content-Type': 'application/json',
                                      'Authorization': `Bearer ${accessToken}`,
                                    },
                                    body: JSON.stringify(data)
                                  });

       if (!response.ok) {
         throw new Error('Errore durante la richiesta API response.ok: ' + response.status);
       }
       console.log("UPDATE OK");
       toast.success("Modificate le informazioni per l'utente "+data.fullname, {
                                                        style: {
                                                          backgroundColor: "#d4edda", // Verde chiaro
                                                          color: "#155724", // Testo verde scuro per contrasto
                                                          border: "1px solid #c3e6cb",
                                                        },
                                                      });
     } catch (error) {
       console.error("Errore durante la richiesta API", error);
     }
  }

  useEffect(() => {
    if (!data.id) return;

    const checkSecure = async () => {
      let paramsSC = {'method':'GET',
                    'path':'/rest/v4/people/update'};
      var checkUpdate = await secureCheck(paramsSC);
      setCanUpdate(checkUpdate);
    }
    checkSecure();

    const fetchQualification = async () => {
      try {
        const session = await getSession() as CustomSession;
        let accessToken = session ? session.accessToken : null;

        const response = await fetch(
          `/api/rest/v4?endpoint=templateUtility%2FgetAllQualifications`,
          { method: 'GET' }
        );

        if (!response.ok) {
          throw new Error('Errore durante la richiesta API response.ok: ' + response.status);
        }

        const jsonData: any = await response.json();
        setQualifications(jsonData);

        if (data.qualification) {
          setValue("qualification", data.qualification);
        }
      } catch (error) {
        console.error("Errore durante la richiesta API", error);
      }
    }
    fetchQualification();

    const fetchOfficesAllowed = async () => {
      try {
        const session = await getSession() as CustomSession;
        let accessToken = session ? session.accessToken : null;

        const response = await fetch(
          `/api/rest/v4?endpoint=templateUtility%2FofficesAllowed`,
          { method: 'GET' }
        );

        if (!response.ok) {
          throw new Error('Errore durante la richiesta API response.ok: ' + response.status);
        }

        const jsonData: any = await response.json();
        setOffices(jsonData);
        if (data.office) {
          setValue("office", data.office.id);
        }
      } catch (error) {
        console.error("Errore durante la richiesta API", error);
      }
    }
    fetchOfficesAllowed();

  }, [data.id]);

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
                  <Form.Control {...register("user.username")} disabled />
              </div>
            </Form.Group>

            <Form.Group className="form-group" controlId="qualification">
              <Form.Label className="col-sm-3 control-label">Livello</Form.Label>
              <div className="col-sm-6">
                <Form.Select {...register("qualification")}>
                <option value="">Seleziona un livello</option>
                  {qualifications.map((q) => (
                    <option key={q.qualification} value={q.qualification}>
                      {q.description}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group className="form-group" controlId="office">
              <Form.Label className="col-sm-3 control-label">Sede</Form.Label>
              <div className="col-sm-6">
                <Form.Select {...register("office")}>
                <option value="">Seleziona un livello</option>
                  {offices.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Form.Group>

            {/*
              <Form.Group className="form-group" controlId="beginDate">
                <Form.Label className="col-sm-3 control-label">Data di inizio</Form.Label>
                <div className="col-sm-6">
                    <Form.Control type="date" {...register("beginDate")} />
                </div>
              </Form.Group>
            */}

            {/*
              <Form.Group className="form-group" controlId="updatedAt">
                <Form.Label className="col-sm-3 control-label">Ultima Modifica</Form.Label>
                <div className="col-sm-6">
                    <Form.Control type="text" {...register("updatedAt")} disabled />
                </div>
              </Form.Group>
            */}

            <Form.Group className="form-group" controlId="wantEmail">
              <Form.Label className="col-sm-3 control-label">Invio Email</Form.Label>
              <div className="col-sm-6">
                <Form.Check
                className="radio-inline "
                      type="radio"
                      label="Sì"
                      value="true"
                      {...register("wantEmail")}
                      defaultChecked={watch("wantEmail") === true}
                    />
                    <Form.Check
                    className="radio-inline "
                      type="radio"
                      label="No"
                      value="false"
                      {...register("wantEmail")}
                      defaultChecked={watch("wantEmail") === false}
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

            {/*
              <Form.Group className="form-group" controlId="perseoId">
                <Form.Label className="col-sm-3 control-label">ID Perseo</Form.Label>
                <div className="col-sm-6">
                    <Form.Control {...register("perseoId")} />
                 </div>
              </Form.Group>
            */}

            <Form.Group className="form-group" controlId="eppn">
              <Form.Label className="col-sm-3 control-label">Eppn (Per login Shibboleth)</Form.Label>
              <div className="col-sm-6">
                  <Form.Control {...register("eppn")} disabled/>
              </div>
            </Form.Group>

            <br/>
            <div className="col-sm-6 col-sm-offset-3">
              <Alert variant="info">
                Il campo opzionale <strong>Eppn</strong> viene utilizzato per il login shibboleth quando attivo.
              </Alert>
            </div>
          </div>
        </div>

        {/* Bottone di salvataggio */}
        {canUpdate &&
        (<div className="text-center">
            <Button type="submit" variant="primary">
              Salva
            </Button>
          </div>)
        }
      </Form>
    </div>
    </>
  );
}


export default PersonDatiAnagrafici;
