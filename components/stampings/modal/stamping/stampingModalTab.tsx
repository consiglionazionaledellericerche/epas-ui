import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { getSession } from 'next-auth/react';
import StampingModalContent from "./stampingModalContent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface StampingModalTabProps {
  data: any;
  parameters: any;
  handleClose: () => void;
  showError: (type: string) => void;
  showSuccess: (type: string) => void;
  showInsertTab: boolean;
  showInsertOffSiteTab: boolean
}

const StampingModalTab: React.FC<StampingModalTabProps> = ({
  data,
  parameters,
  handleClose,
  showError,
  showSuccess,
  showInsertTab,
  showInsertOffSiteTab
}) => {
  const [dataTab, setDataTab] = useState(data);
  const [params, setParams] = useState<any>({});
  const [selectedTab, setSelectedTab] = useState("");
  const [modalType, setModalType] = useState(parameters.mode);

  useEffect(() => {
    let tabSelect ;
    //console.log('parameters.mode--',parameters.mode, showInsertTab, showInsertOffSiteTab);
    if (selectedTab == ""){
      if (parameters.mode == 'insert' ){
        tabSelect = showInsertTab ? "ADD_STAMP" : (showInsertOffSiteTab ? "ADD_OFFSITE": "");
        handleTabChange(tabSelect)
      } else {
        tabSelect = "EDIT_STAMP";
        handleTabChange(tabSelect)
      }
    }
  }, [selectedTab, parameters.mode, showInsertTab, showInsertOffSiteTab]);

  const handleTabChange = (tabName: string|null, params={}) => {
    if (tabName == 'DELETE_STAMP') {
      parameters.mode='delete';
      setModalType('delete');
    } else if (tabName == 'ADD_STAMP'){
       parameters.mode='insert';
       setModalType('insert');
    }  else if (tabName == 'ADD_OFFSITE') {
        parameters.mode='insert';
        setModalType('insertOffSite');
     }  else if (tabName == 'EDIT_STAMP') {
       parameters.mode='edit';
       setModalType('edit');
    }
    setParams(params);
    setSelectedTab(tabName || '');
  };

  let tabList = [];
  if (parameters.mode == 'insert' ){
    if (showInsertTab){
      tabList.push(["addStamping", "ADD_STAMP", "Inserisci timbratura"]);
    }
    if (showInsertOffSiteTab){
      tabList.push(["addOffsite", "ADD_OFFSITE", "Fuori sede"]);
    }
  } else {
      tabList.push(["editStamping", "EDIT_STAMP", "Modifica"]);
      if (!data.serviceReasons) {
          tabList.push(["deleteStamping", "DELETE_STAMP", "Elimina"]);
      }
  }

  //dataTab['insertOffsite'] = showInsertOffSiteTab;

  return (
    <>
      <Tabs
        activeKey={selectedTab}
        id="stampingTabs"
        className="mb-3"
        onSelect={(k) => handleTabChange(k)}
      >
      {tabList.map(([key, eventKey, title]) => {
        return (
              <Tab key={key} eventKey={eventKey} title={title}>
                <StampingModalContent
                data={dataTab}
                stampingId={parameters.stampingId}
                modalType={modalType}
                handleClose={handleClose}
                showError={showError}
                showSuccess={showSuccess}/>
              </Tab>
        );
      })}
      </Tabs>
    </>
  );
}

export default StampingModalTab;
