import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DropDownElement from "./dropDownElement";
import SimulationDataTable from "./simulationDataTable";
import { AbsenceForm } from "../../../types/absenceForm";
import { AbsenceFormSimulationResponse } from "../../../types/absenceFormSimulationResponse";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

library.add(faCheck);

interface AbsenceModalContentProps {
  data: AbsenceForm;
  simData: AbsenceFormSimulationResponse;
  parameters: string;
  handleChange: (elementOption: { value: any; label: any; from:string; }) => void;
  handleSaveData: () => void;
  showForceInsert: boolean;
  forceInsert: boolean;
  setForceInsert: (value:boolean) => void;
}

const AbsenceModalContent: React.FC<AbsenceModalContentProps> = ({
data,
simData,
parameters,
handleChange,
handleSaveData,
showForceInsert,
forceInsert,
setForceInsert
  }) => {

     let alldaySelected = (data?.justifiedTypeSelected == "all_day" ||
                         data?.justifiedTypeSelected == "assign_all_day") ? true : false;
     let specifiedMinuteSelected = (data?.justifiedTypeSelected == "specified_minutes") ? true : false;

  const [startDate, setStartDate] = useState<Date | undefined>(data.from);
  const [endDate, setEndDate] = useState<Date | undefined>(data.to);

  const formatDate = (date: Date | undefined): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

    const handleEndDateChange = (event:any) => {
      setEndDate(event.target.value);
      handleChange({'value':event.target.value, 'label':event.target.label, 'from':'ENDATE'});
    };

    const handleGrouptypeChange = (selectOption:any) => {
      setForceInsert(false);
      handleChange(selectOption);
    };

    const handleCheckboxForceInsert = (event:any) => {
        setForceInsert(event.target.checked);
        handleChange({'label':'FORCEINSERT','value':event.target.checked, 'from':'FORCEINSERT'});
      };

    let justifiedTypeChoice = data.hasJustifiedTypeChoice ? (<>
                                                          <div className="form-group">
                                                              <label className="col-sm-2 control-label">Tempo giustificato</label>
                                                               <div className="col-sm-6" style={{ display: 'inline-block' }}>
                                                                  <DropDownElement typeElem="JUSTIFYTYPE" data={data} onChange={handleChange}/>
                                                              </div>
                                                          </div>
                                                          </>) : "";

    let timeChoice = data.hasHourMinutesChoice ? (<>
                                                <div className="form-group">
                                                    <label className="col-sm-2 control-label">Ore</label>
                                                     <div className="col-sm-6" style={{ display: 'inline-block' }}>
                                                        <DropDownElement typeElem="HOUR" data={data} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-sm-2 control-label">Minuti</label>
                                                     <div className="col-sm-6" style={{ display: 'inline-block' }}>
                                                        <DropDownElement typeElem="MINUTE" data={data} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                 </>) : "";

    let forceInsertWarn = forceInsert ? (<>
     <br/><br/>
     <div>
       <p className="alert alert-warning">
        <strong>Attenzione:</strong> Forzando l&apos;inserimento di un codice al momento del salvataggio
           non verrà effettuato alcun tipo di controllo.
       </p>
     </div>
     </>
    ) : "";
    let forceInsertElem = showForceInsert && (data.absenceTypeSelected && data.hasAbsenceTypeChoice) ? (
    <>
    <div className="form-group">
        <label className="col-sm-2 control-label"></label>
         <div className="col-sm-6" style={{ display: 'inline-block' }}>
            <input
                    name="forceInsert"
                    type="checkbox"
                    title="Forza Inserimento"
                    aria-label="Forza Inserimento"
                    checked={forceInsert}
                    onChange={handleCheckboxForceInsert}
                  />
            <label htmlFor="forceInsert">&nbsp;Forza Inserimento</label>
        </div>
    </div>
    {forceInsertWarn}
    </>) : "";

    let warningMalattiaFiglio = data?.groupSelected?.name.startsWith('MALATTIA_FIGLIO') ? (
                                                <>
                                                <br/><br/>
                                                <div>
                                                  <p className="alert alert-danger">
                                                      <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'red', marginRight: '5px' }} size="2x" />
                                                      I gruppi riguardanti i codici malattia figli sono in fase di implementazione pertanto il controllo
                                                     sul superamento dei limiti è disabilitato. L&apos;implementazione verrà completata a breve.
                                                  </p>
                                                </div>
                                                </>):"";

   return(
          <>
            <div className="form-group">
                <label className="col-sm-2 control-label">Tipologia Assenza</label>
                 <div className="col-sm-6" style={{ display: 'inline-block' }}>
                    <DropDownElement typeElem="GROUPABS" data={data} onChange={handleGrouptypeChange}/>
                </div>
            </div>
            <div className="form-group">
              <label htmlFor="startDate" className="col-sm-2 control-label">Da</label>
              <div className="col-sm-6"  style={{ display: 'inline-block' }}>
                <input type="date" id="startDate" className="form-control" disabled value={formatDate(startDate)} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="endDate" className="col-sm-2 control-label">A</label>
              <div className="col-sm-6"  style={{ display: 'inline-block' }}>
                <input type="date" id="endDate" className="form-control" value={formatDate(endDate)} disabled={alldaySelected}
                 onChange={handleEndDateChange} />
              </div>
            </div>
            <div className="form-group">
                <label className="col-sm-2 control-label">Codice Assenza</label>
                 <div className="col-sm-6" style={{ display: 'inline-block' }}>
                    <DropDownElement typeElem="ABSENCE" data={data} onChange={handleChange}/>
                </div>
            </div>
            {justifiedTypeChoice}
            {timeChoice}
            {forceInsertElem}
            {warningMalattiaFiglio}
            <SimulationDataTable data={simData} />
            <p className="center">
            <Button onClick={handleSaveData}><FontAwesomeIcon icon={faCheck}/>&nbsp;Inserisci</Button>
            </p>
        </>
   );
}

export default AbsenceModalContent;


