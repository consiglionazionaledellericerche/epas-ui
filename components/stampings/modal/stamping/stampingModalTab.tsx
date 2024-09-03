import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { getSession } from 'next-auth/react';
import StampingModalContent from "./stampingModalContent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
//import { AbsenceForm } from "../../../../types/absenceForm";

interface StampingModalTabProps {
  data: any;
  parameters: any;
  handleClose: () => void;
  showError: () => void;
}

const StampingModalTab: React.FC<StampingModalTabProps> = ({
  data,
  parameters,
  handleClose,
  showError
}) => {
  const [dataTab, setDataTab] = useState(data);
  const [params, setParams] = useState<any>({});
  const [selectedTab, setSelectedTab] = useState("ADD_STAMP");

  useEffect(() => {
  }, [selectedTab, parameters,params]);

  const handleTabChange = (tabName: string|null, params={}) => {
    setParams(params);
    setSelectedTab(tabName);
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
        <StampingModalContent data={dataTab} parameters={parameters} handleClose={handleClose} showError={showError} />
      </Tab>
      <Tab key="addOffsite" eventKey="ADD_OFFSITE" title="Fuori sede">
        <StampingModalContent data={dataTab} parameters={parameters} handleClose={handleClose} showError={showError} />
      </Tab>
      </Tabs>
    </>
  );
}

export default StampingModalTab;
