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

library.add(faCheck);

interface StampingModalContentProps {
  data: StampingForm;
  parameters: string;
  handleChange: (elementOption: { value: any; label: any; from:string; }) => void;
  handleSaveData: () => void;
}

const StampingModalContent: React.FC<StampingModalContentProps> = ({
data,
parameters,
handleChange,
handleSaveData
  }) => {

  const [value, setValue] = useState(0);
  const handleChangeTime = (event) => {
    setValue(event.target.value);
    handleChange(event.target.value);
  };

  const [selectedWay, setSelectedWay] = useState('');

    const wayItems = [
      { value: 'in', label: 'Entrata' },
      { value: 'out', label: 'Uscita' },
    ];



    let divTitle = data.insertNormal || data.autocertification ? (<>
                                        <div className="alert alert-primary">
                                            Inserisci i dati della nuova timbratura
                                        </div>
                                        </>) :
                                    (<>
                                     <div className="alert alert-warning">
                                         Inserisci i dati per la timbratura fuori sede.
                                     </div>
                                     </>);

    let timeElem = <>
                      <div className="form-group">
                            <label className="col-sm-2 control-label">Orario* </label>
                            <input
                              type="time"
                              value=""
                              onChange={handleChangeTime}
                              required
                            />
                            <div className="custom-popover">
                              {/* Custom popover content here */}
                            </div>
                          </div>
                     </>
    let wayElem = <>
                      <div className="form-group">
                            <label className="col-sm-2 control-label">Verso timbratura* </label>
                            <RadioEnum
                                    name="stampingWay"
                                    items={wayItems}
                                    value={selectedWay}
                                    onChange={setSelectedWay}
                                  />
                          </div>
                     </>
                            //
    let reasonElem = <>
                      <div className="form-group">
                            <label className="col-sm-2 control-label">Causale timbratura* </label>
                            <DropDownElement data={data} onChange={setSelectedWay}/>
                          </div>
                     </>

    let noteElem = <>
                      <div className="form-group">
                            <label className="col-sm-2 control-label">Note* </label>
                            <input
                              name="note"
                              type="text"
                              value=""
                            />
                          </div>
                     </>
   return(
          <>
            {divTitle}
            {timeElem}
            {wayElem}
            {reasonElem}
            {noteElem}

            <p className="center">
            <Button onClick={handleSaveData}><FontAwesomeIcon icon={faCheck}/>&nbsp;Inserisci</Button>
            </p>
        </>
   );
}

export default StampingModalContent;


