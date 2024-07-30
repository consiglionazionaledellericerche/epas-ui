import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DropDownElement from "./dropDownElement";
//import { AbsenceForm } from "../../../../types/absenceForm";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faCheck);

interface StampingModalContentProps {
  data: AbsenceForm;
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


    let justifiedTypeChoice = data.hasJustifiedTypeChoice ? (<>
                                                          <div className="form-group">
                                                              <label className="col-sm-2 control-label">Tempo giustificato</label>
                                                               <div className="col-sm-6" style={{ display: 'inline-block' }}>
                                                                  <DropDownElement typeElem="JUSTIFYTYPE" data={data} onChange={handleChange}/>
                                                              </div>
                                                          </div>
                                                          </>) : "";

   return(
          <>
            <div className="form-group">
                <label className="col-sm-2 control-label">Tipologia Assenza</label>
                 <div className="col-sm-6" style={{ display: 'inline-block' }}>
                    <DropDownElement typeElem="GROUPABS" data="" onChange=""/>
                </div>
            </div>

            <p className="center">
            <Button onClick={handleSaveData}><FontAwesomeIcon icon={faCheck}/>&nbsp;Inserisci</Button>
            </p>
        </>
   );
}

export default StampingModalContent;


