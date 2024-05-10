import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DropDownElement from "./dropDownElement";
import { AbsenceForm } from "../../../types/absenceForm";

const customStyles: Styles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: '14px', // Dimensione del testo
  }),
  groupHeading: (provided, state) => ({
    ...provided,
    fontSize: '14px', // Dimensione del testo più grande per l'optgroup
    fontWeight: 'bold', // Grassetto per l'optgroup
  }),
};

interface AbsenceModalContentProps {
  data: AbsenceForm;
  parameters: string;
  handleDropdownChange: (elementOption: { value: any; label: any; from:string; }) => void;
}

const AbsenceModalContent: React.FC<AbsenceModalContentProps> = ({
data,
parameters,
handleChange
  }) => {

     let alldaySelected = (data?.justifiedTypeSelected == "all_day" ||
                         data?.justifiedTypeSelected == "assign_all_day") ? true : false;
     let specifiedMinuteSelected = (data?.justifiedTypeSelected == "specified_minutes") ? true : false;

    const [startDate, setStartDate] = useState(data.from);
    const [endDate, setEndDate] = useState(data.to);

    const handleEndDateChange = (event) => {
    console.log('handleEndDateChange', handleEndDateChange);
      setEndDate(event.target.value);
      handleChange({'value':event.target.value, 'from':'ENDATE'});
    };
    const handleGrouptypeChange = (selectOption) => {
      selectOption['cleanAll'] = true;
      handleChange(selectOption);
    };

    useEffect(() => {
    setEndDate(data.to);
    console.log('cambio endate')
    }, [data]);

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
                    <DropDownElement typeElem="GROUPABS" data={data} onChange={handleGrouptypeChange}/>
                </div>
            </div>
            <div className="form-group">
              <label htmlFor="startDate" className="col-sm-2 control-label">Da</label>
              <div className="col-sm-6"  style={{ display: 'inline-block' }}>
                <input type="date" id="startDate" className="form-control" disabled value={startDate} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="endDate" className="col-sm-2 control-label">A</label>
              <div className="col-sm-6"  style={{ display: 'inline-block' }}>
                <input type="date" id="endDate" className="form-control" value={endDate} disabled={alldaySelected}
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
        </>
   );
}

export default AbsenceModalContent;


