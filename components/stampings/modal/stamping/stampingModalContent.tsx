import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DropDownElement from "./dropDownElement";
import RadioEnum from './radioEnum';
import { StampingForm } from "../../../../types/stampingForm";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { saveDataStamping } from '../apiUtils';


library.add(faCheck);

interface StampingModalContentProps {
  data: any;//StampingForm | ;
  parameters: string;
  handleClose: () => void;
  showError: () => void;
}

const StampingModalContent: React.FC<StampingModalContentProps> = ({
data,
parameters,
handleClose,
showError
  }) => {
  const [modalType, setModalType] = useState(parameters.mode);
  const [valueTime, setValueTime] = useState();
  const [valueNote, setValueNote] = useState('');
  const [selectedWay, setSelectedWay] = useState('');
  const [stampType, setStampType] = useState('');

  const handleChangeTime = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setValueTime(value);
    }
 };

  const handleInputChange = (event) => {
      setValueNote(event.target.value);
    };

  const handleSaveData = () => {

  const formData = {
        personId: data.person.id,
        date:data.date,
        zone:null,
        time: valueTime,
        note: valueNote,
        way: selectedWay,
        stampType: stampType,
      };

    saveDataStamping(formData, handleClose, showError);
  };

    const wayItems = [
      { value: 'in', label: 'Ingresso' },
      { value: 'out', label: 'Uscita' },
    ];

    let action = modalType == 'insert' ? 'Inserisci' : 'Modifica';
    let divTitle = data.insertNormal || data.autocertification ? (<>
                                        <div className="alert alert-primary text-center">
                                            {action} i dati della nuova timbratura
                                        </div>
                                        </>) :
                                    (<>
                                     <div className="alert alert-warning text-center">
                                         {action} i dati per la timbratura fuori sede.
                                     </div>
                                     </>);

    let timeElem = modalType == 'insert' ? (<>
                      <div className="form-group">
                            <label className="col-sm-2 control-label">Orario* </label>
                            <div className="col-sm-6">
                              <input
                                className="form-control"
                                type="text"
                                value={valueTime}
                                maxLength="4"
                                pattern="\d*"
                                onChange={handleChangeTime}
                                required
                              />
                            </div>
                            <div className="custom-popover">
                              {/* Custom popover content here */}
                            </div>
                          </div>
                     </>):'';

    let wayElem = modalType == 'insert' ? (<>
                      <div className="form-group">
                            <label className="col-sm-2 control-label">Verso timbratura* </label>
                            <div className="col-sm-6">
                              <RadioEnum
                                      name="stampingWay"
                                      className="form-control"
                                      items={wayItems}
                                      value={selectedWay}
                                      onChange={setSelectedWay}
                                    />
                            </div>
                      </div>
                     </>):''

    let reasonElem = modalType == 'insert' ? (<>
                      <div className="form-group">
                            <label className="col-sm-2 control-label">Causale timbratura* </label>
                            <div className="col-sm-6">
                              <DropDownElement data={data} setStampType={setStampType}/>
                            </div>
                      </div>
                     </>):''

    let noteElem = modalType == 'insert' ? (<>
                      <div className="form-group">
                            <label className="col-sm-2 control-label">Note* </label>
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
                     </>):''
   return(
          <>

          <form className='form form-horizontal' autoComplete="false">
            {divTitle}
            {timeElem}
            {wayElem}
            {reasonElem}
            {noteElem}
            <p className="center">
            <Button onClick={handleSaveData}><FontAwesomeIcon icon={faCheck}/>&nbsp;Inserisci</Button>
            </p>
          </form>
        </>
   );
}

export default StampingModalContent;


