import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { CustomSession } from '../../../types/customSession';
import { Button } from "react-bootstrap";
import DateUtility from "../../../utils/dateUtility";

const deleteData = async (id: number, handleClose: any, showError: any, showSuccess: any) => {
  try {
    const session = await getSession();
    if (!session) throw new Error("No session found");
    const accessToken = session.accessToken;
    const url = `/api/rest/v4/personmonths/trainingHours/${id}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Errore durante la richiesta API');
    }

    const data = await response.json();
    showSuccess(data.message);
    handleClose();
  } catch (error) {
    console.error("Unable to delete data", error);
    showError("Errore durante l'eliminazione dei dati");
  }
};

const saveData = async (modeType: string, dataForm: any, handleClose: any, showError: any, showSuccess: any) => {
  try {
    const session = await getSession();
    if (!session) throw new Error("No session found");
    const accessToken = session.accessToken;

    const action = modeType === 'edit' ? '/update' : '';
    const url = `/api/rest/v4/personmonths/trainingHours${action}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(dataForm)
    });

    if (!response.ok) {
      if (response.status === 409) {
        showError('Operazione ignorata: già presente');
      } else {
        throw new Error('Errore durante la richiesta API');
      }
    } else {
      const data = await response.json();
      showSuccess(data.message);
      handleClose();
    }
  } catch (error) {
    console.error("Unable to save data", error);
    showError("Errore durante il salvataggio dei dati");
  }
};

interface TrainingHoursModalContentProps {
  year: number;
  month: any;
  action: string;
  pm: any;
  handleClose: () => void;
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
}

const TrainingHoursModalContent: React.FC<TrainingHoursModalContentProps> = ({
  year,
  month,
  action,
  pm,
  handleClose,
  showError,
  showSuccess
}) => {
  const [begin, setBegin] = useState<number | ''>(pm ? pm.begin : '');
  const [end, setEnd] = useState<number | ''>(pm ? pm.end : '');
  const [value, setValue] = useState<number | ''>(pm ? pm.trainingHours : '');
  const [fromDate, setFromDate] = useState(pm?.fromDate || '');
  const [toDate, setToDate] = useState(pm?.toDate || '');
  const [yearForm, setYearForm] = useState(year);
  const [monthForm, setMonthForm] = useState(month.id);

  useEffect(() => {
    if (action === 'edit' && pm) {
      setBegin(pm.begin);
      setEnd(pm.end);
      setValue(pm.trainingHours);
      setFromDate(pm.fromDate);
      setToDate(pm.toDate);
    }
  }, [action, pm]);

  const handleSaveData = () => {
    if (action !== 'delete') {
      const formData = {
        id: action !== 'insert' ? pm.id : null,
        trainingHours: value,
        begin: begin,
        end: end,
        year: yearForm,
        month: parseInt(monthForm)
      };
      saveData(action, formData, handleClose, showError, showSuccess);
    } else {
      deleteData(pm.id, handleClose, showError, showSuccess);
    }
  };

  let buttonSave;
  let headerMessage;
  let formTraining;

  if (action === 'delete') {
    buttonSave = (
      <div className="alert alert-danger center">
        Attenzione!!! Questa operazione non potrà essere annullata.<br/><br/>
        <Button className="btn btn-danger" onClick={handleSaveData}>
          Conferma elimina
        </Button>
      </div>
    );
  } else {
    buttonSave = (
      <Button onClick={handleSaveData}>
        Invio
      </Button>
    );

    if (action === 'insert') {
      headerMessage = (
        <div className="alert alert-info">
          <p>Specificare le ore di formazione nel periodo selezionato.</p>
        </div>
      );

      formTraining = (
        <>
          <div className="form-group">
            <label htmlFor="begin" className="col-sm-3 control-label">
              Giorno Iniziale*
            </label>
            <div className="col-sm-6">
              <input
                className="form-control"
                id="begin"
                name="begin"
                type="number"
                value={begin}
                title="Giorno Iniziale"
                required
                onChange={(e) => setBegin(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="end" className="col-sm-3 control-label">
              Giorno Finale*
            </label>
            <div className="col-sm-6">
              <input
                className="form-control"
                id="end"
                name="end"
                type="number"
                value={end}
                title="Giorno Finale"
                required
                onChange={(e) => setEnd(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="value" className="col-sm-3 control-label">
              Quantità*
            </label>
            <div className="col-sm-6">
              <input
                className="form-control"
                id="value"
                name="value"
                type="number"
                value={value}
                title="Quantità"
                required
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </div>
          </div>
        </>
      );
    } else {
      headerMessage = (
        <div className="alert alert-info">
          <p>Modifica le ore di formazione nel periodo selezionato.</p>
        </div>
      );

      formTraining = (
        <>
          <div className="form-group">
            <label htmlFor="begin" className="col-sm-3 control-label">
              Giorno Iniziale*
            </label>
            <div className="col-sm-6">
              <p className="form-control-static">
                {DateUtility.formatDate(pm.fromDate)}
              </p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="end" className="col-sm-3 control-label">
              Giorno Finale*
            </label>
            <div className="col-sm-6">
              <p className="form-control-static">
                {DateUtility.formatDate(pm.toDate)}
              </p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="value" className="col-sm-3 control-label">
              Quantità*
            </label>
            <div className="col-sm-6">
              <input
                className="form-control"
                id="value"
                name="value"
                type="number"
                value={value}
                title="Quantità"
                required
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <>
      {headerMessage}
      <div className="center">
        <form className='form form-horizontal' autoComplete="off">
          {formTraining}
          <br /><br />
          {buttonSave}
        </form>
      </div>
    </>
  );
};

export default TrainingHoursModalContent;
