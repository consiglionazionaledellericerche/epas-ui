import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DropDownElement from "./dropDownElement";
import SimulationDataTable from "./simulationDataTable";
import { AbsenceForm } from "../../../types/absenceForm";
import { AbsenceFormSimulationResponse } from "../../../types/absenceFormSimulationResponse";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faCheck);

interface AbsenceModalContentProps {
  data: AbsenceForm;
  simData: AbsenceFormSimulationResponse;
  parameters: string;
  handleChange: (elementOption: { value: any; label: any; from:string; }) => void;
  handleSaveData: () => void;
}

const AbsenceModalContent: React.FC<AbsenceModalContentProps> = ({
data,
simData,
parameters,
handleChange,
handleSaveData
  }) => {

     let alldaySelected = (data?.justifiedTypeSelected == "all_day" ||
                         data?.justifiedTypeSelected == "assign_all_day") ? true : false;
     let specifiedMinuteSelected = (data?.justifiedTypeSelected == "specified_minutes") ? true : false;

//     const [startDate, setStartDate] = useState(data.from);
//     const [endDate, setEndDate] = useState(data.to);

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
      handleChange(selectOption);
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
            <SimulationDataTable data={simData} />
            <p className="center">
            <Button onClick={handleSaveData}><FontAwesomeIcon icon={faCheck}/>&nbsp;Inserisci</Button>
            </p>
        </>
   );
}

export default AbsenceModalContent;


