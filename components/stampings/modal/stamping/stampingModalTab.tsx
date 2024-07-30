import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { getSession } from 'next-auth/react';
import StampingModalContent from "./stampingModalContent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
//import { AbsenceForm } from "../../../../types/absenceForm";
import { fetchData, saveData } from '../apiUtils';

interface StampingModalTabProps {
  data: any;
  parameters: any;
  handleClose: () => void;
}

const StampingModalTab: React.FC<StampingModalTabProps> = ({
  data,
  parameters,
  handleClose
}) => {
  const [dataTab, setDataTab] = useState(data);
  const [params, setParams] = useState<any>({});
  const [selectedTab, setSelectedTab] = useState("ADD_STAMP");

  const handleChange = (element:any) => {
  }

  useEffect(() => {
  }, [selectedTab, parameters,params]);

  const handleTabChange = (tabName: string|null, params={}) => {
    setParams(params);
    setSelectedTab(tabName);
  };

  const handleSaveData = () => {
    if (dataTab) {
      saveData(dataTab, handleClose);
    }
  };

  return (
    <>
      <Tabs
        activeKey={selectedTab}
        id="stampingTabs"
        className="mb-3"
        onSelect={(k) => handleTabChange(k)}
      >
      <Tab key="addStamping" eventKey="ADD_STAMP" title="Inserisci timbratura">
        <StampingModalContent data={dataTab} parameters={parameters} handleChange={handleChange} handleSaveData={handleSaveData} />
      </Tab>
      <Tab key="addOffsite" eventKey="ADD_OFFSITE" title="Fuori sede">
        <StampingModalContent data={dataTab} parameters={parameters} handleChange={handleChange} handleSaveData={handleSaveData}/>
      </Tab>
      </Tabs>
    </>
  );
}

export default StampingModalTab;
