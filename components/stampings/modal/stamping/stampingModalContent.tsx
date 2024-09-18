import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DropDownElement from "./dropDownElement";
import RadioEnum from './radioEnum';
import { StampingForm } from "../../../../types/stampingForm";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { saveDataStamping, deleteStamping } from '../apiUtils';
import { useTranslations } from 'next-intl';
import DateUtility from "../../../../utils/dateUtility";

library.add(faCheck);
library.add(faTrash);

interface StampingModalContentProps {
  data: any;//StampingForm | ;
  stampingId: number;
  modalType: string;
  handleClose: () => void;
  showError: () => void;
  showSuccess: () => void;
}

const StampingModalContent: React.FC<StampingModalContentProps> = ({
data,
stampingId,
modalType,
handleClose,
showError,
showSuccess
  }) => {
  const [valueTime, setValueTime] = useState(data.time);
  const [valueNote, setValueNote] = useState(data.note);
  const [valuePlace, setValuePlace] = useState(data.place);
  const [valueReason, setValueReason] = useState(data.reason);
  const [selectedWay, setSelectedWay] = useState(data.way);
  const [stampType, setStampType] = useState(data.insertOffsite ? data.offsite[0].name : data.stampType);

  const translation = useTranslations('Message');

  const handleChangeTime = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setValueTime(value);
    }
  };

  const handleInputChange = (event) => {
      if (event.target.name == "note"){
        setValueNote(event.target.value);
      } else if (event.target.name == "place"){
        setValuePlace(event.target.value);
      } else if (event.target.name == "reason"){
        setValueReason(event.target.value);
      }
    };

  const handleSaveData = () => {
    if (modalType != 'delete') {
      const formData = {
          personId: data.person.id,
          stampingId: stampingId,
          date:data.date,
          zone:null,
          time: valueTime,
          note: valueNote,
          way: selectedWay,
          stampType: stampType,
          mode: modalType,
          place:valuePlace,
          reason:valueReason,
          serviceReasons: data.serviceReasons,
          offSiteWork: data.offSiteWork,
          insertOffsite: data.insertOffsite
        };
        console.log("DEVO SALVARE I DATI ",formData);
        saveDataStamping(formData, handleClose, showError, showSuccess);
    } else {
        deleteStamping(stampingId, handleClose, showError, showSuccess);
    }
  };

    const wayItems = [
      { value: 'in', label: translation("WayType_in") },
      { value: 'out', label: translation("WayType_out") },
    ];
    let wayType = data.way != null ? translation("WayType_"+data.way): "";
    let stampString;
    let alertCss;
    let buttonLabel;

    console.log("formattedHour>>>> ", 'time' in data);

    let formattedHour = 'time' in data && data.time != null ? DateUtility.formattedHour(data.time): "";

    if (modalType == 'insert') {
      buttonLabel = "Inserisci";
      if (!data.insertOffsite){
        stampString = "Inserisci i dati della nuova timbratura.";
        alertCss = "alert alert-primary text-center";
      } else {
        stampString = "Inserisci i dati per la timbratura fuori sede.";
        alertCss = 'alert alert-warning text-center';
      }
    } else if (modalType == 'edit') {
      buttonLabel = "Modifica";
      if (!data.offSiteWork){
        if (!data.serviceReasons){
            stampString = `Modifica i dati della timbratura delle ore ${formattedHour}`;
            alertCss = "alert alert-primary text-center";
        } else {
            stampString = `Modifica i dati della timbratura per entrata/uscita di servizio delle ore ${formattedHour}`;
            alertCss = "alert alert-warning text-center";
        }
      } else {
        stampString = `Modifica i dati della timbratura fuori sede del ${formattedHour}`;
        alertCss = "alert alert-warning text-center";
      }
    } else if (modalType == 'delete') {
      buttonLabel = "Elimina";
      stampString = "";
      alertCss = "";
    }
    let mandatory = modalType == 'insert' || (modalType == 'edit' && data.offSiteWork) ? "*":"";

    let offsiteStampType = !data.insertOffsite ? "" : data.offsite[0].description;
    let divTitle = <>
                   <div className={`${alertCss}`}>
                   {stampString}
                   </div>
                   </>

    let timeElem = <>
                      <div className="form-group">
                            <label className="col-sm-2 control-label">Orario{mandatory} </label>
                            {modalType == 'insert' ? (
                            <div className="col-sm-6">
                                <input
                                  className="form-control"
                                  type="text"
                                  name="time"
                                  value={valueTime}
                                  maxLength="4"
                                  pattern="\d*"
                                  onChange={handleChangeTime}
                                  required />
                                  </div>
                                ):<div className="col-sm-6">
                                <label className="col-sm-6 control-label left-align">{formattedHour}</label>
                                </div>
                            }
                            <div className="custom-popover">
                              {/* Custom popover content here */}
                            </div>
                          </div>
                     </>;

    let wayElem = <>
                  <div className="form-group">
                        <label className="col-sm-2 control-label">Verso timbratura{mandatory} </label>
                        {modalType == 'insert' ? (
                        <div className="col-sm-6">
                          <RadioEnum
                                  name="stampingWay"
                                  className="form-control"
                                  items={wayItems}
                                  value={selectedWay}
                                  onChange={setSelectedWay}
                                />
                        </div>
                          ):<div className="col-sm-6">
                            <label className="col-sm-6 control-label left-align">{wayType}</label>
                          </div>
                       }
                  </div>
                 </>

    let stamTypeElem =  modalType != 'delete' ? (
                        <>
                          <div className="form-group">
                              <label className="col-sm-2 control-label">Causale timbratura</label>
                              <div className="col-sm-6">
                                {(modalType === 'insert' || !data.serviceReasons) && !data.offSiteWork ? (
                                !data.insertOffsite?
                                <DropDownElement data={data} setStampType={setStampType}/>
                                : <label className="col-sm-6 control-label left-align">{offsiteStampType}</label>
                                )
                                :(
                                <label className="col-sm-6 control-label left-align">{data.stampTypeOpt.description}</label>
                                )
                                }
                              </div>
                          </div>
                        </> ) : "";

    let reasonElem = modalType === 'edit' && (data.serviceReasons || data.offSiteWork) || modalType === 'insert' && data.insertOffsite ? (
                              <>
                              <div className="form-group">
                                 <label className="col-sm-2 control-label">Motivo{mandatory}</label>
                                 <div className="col-sm-6">
                                  <input
                                    type="text"
                                    name="reason"
                                    className="form-control"
                                    value={valueReason}
                                    onChange={handleInputChange}
                                  />
                                  </div>
                              </div>
                              </> ) : "";

    let placeElem = modalType === 'edit' && (data.serviceReasons || data.offSiteWork) || modalType === 'insert' && data.insertOffsite ? (
                              <>
                              <div className="form-group">
                                 <label className="col-sm-2 control-label">Luogo{mandatory}</label>
                                 <div className="col-sm-6">
                                  <input
                                    type="text"
                                    name="place"
                                    className="form-control"
                                    value={valuePlace}
                                    onChange={handleInputChange}
                                  />
                                  </div>
                              </div>
                              </> ) : "";

    let noteElem = modalType != 'delete' ? (
                          <>
                          <div className="form-group">
                             <label className="col-sm-2 control-label">Note</label>
                             <div className="col-sm-6">
                              <input
                                type="text"
                                name="note"
                                className="form-control"
                                value={valueNote}
                                onChange={handleInputChange}
                              />
                              </div>
                          </div>
                          </> ) : "";

    let historyStamp = modalType === 'delete' ? (
      <>
        {data.historyStamping.map((history: any, index: number) =>
          history.typeIsAdd ? (
            <div key={index}>
              <div className="form-group">
                <label className="col-sm-2 control-label">Dipendente</label>
                <div className="col-sm-6">
                  <label className="col-sm-6 control-label left-align">
                    {data.person.surname} {data.person.name}
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">Inserita il</label>
                <div className="col-sm-6">
                  <label className="col-sm-6 control-label left-align">
                    {history.formattedRevisionDate}
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">Inserita da</label>
                <div className="col-sm-6">
                  <label className="col-sm-6 control-label left-align">
                    {history.formattedOwner}
                  </label>
                </div>
              </div>
            </div>
          ) : null // Se la condizione non è soddisfatta, restituisci null
        )}
      </>
    ) : null;

   let buttonSave = modalType === 'delete' ? (
                  <>
                  	<div class="alert alert-danger center">
                  	  E' possibile eliminare questa timbratura.<br/><br/>
                  	  <Button className="btn btn-danger" onClick={handleSaveData}>
                      <FontAwesomeIcon icon={faTrash}/>&nbsp;{buttonLabel}
                      </Button>
                  	</div>
                  </>
                  ):
                  (<>
                  <Button onClick={handleSaveData}>
                  <FontAwesomeIcon icon={faCheck}/>&nbsp;{buttonLabel}
                  </Button>
                  </>);
   return(
          <>
          <form className='form form-horizontal' autoComplete="false">
            {divTitle}
            {timeElem}
            {wayElem}
            {stamTypeElem}
            {placeElem}
            {reasonElem}
            {noteElem}
            {historyStamp}
            <p className="center">
            {buttonSave}
            </p>
          </form>
        </>
   );
}

export default StampingModalContent;


