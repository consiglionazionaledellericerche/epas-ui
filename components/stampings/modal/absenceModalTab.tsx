import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { getSession } from 'next-auth/react';
import AbsenceModalContent from "./absenceModalContent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AbsenceForm } from "../../../types/absenceForm";
import { AbsenceFormSimulationResponse } from "../../../types/absenceFormSimulationResponse";
import { fetchData, simulateData } from './apiUtils';

interface AbsenceModalTabProps {
  tabName: string;
  tabsVisible: Object;
  data: AbsenceForm;
  simData: AbsenceFormSimulationResponse;
  parameters: any;
}

const AbsenceModalTab: React.FC<AbsenceModalTabProps> = ({
  tabName,
  tabsVisible,
  data,
  simData,
  parameters
}) => {
  const [selectedTab, setSelectedTab] = useState(tabName);
  const [visibleTabs, setVisibleTabs] = useState(Object.values(tabsVisible));
  const [dataTab, setDataTab] = useState(data);
  const [simDataTab, setSimDataTab] = useState(simData);
  const element = (<span><FontAwesomeIcon icon={faMagnifyingGlass} /> Ricerca Codici</span>);
  const [params, setParams] = useState({});
  const [newParams, setNewParams] = useState({});

  const handleChange = (element) => {
    console.log("element", element);
    if (element['absenceTypeCode'] === undefined) {
      delete newParams['absenceTypeCode'];
    }
    console.log('dataTab', dataTab);

    newParams['id'] = parameters.id;
    newParams['from'] = parameters.from;
    newParams['category'] = selectedTab;
    newParams['switchGroup'] = false;

    if (!('groupAbsenceTypeName' in element) && dataTab.groupSelected) {
      newParams['groupAbsenceTypeName'] = dataTab.groupSelected?.name;
    }
    if (!('absenceTypeCode' in element) && dataTab.absenceTypeSelected) {
      newParams['absenceTypeCode'] = dataTab.absenceTypeSelected.code;
    }
    if (element.from === 'ABSENCE') {
      newParams['absenceTypeCode'] = element.value;
    } else if (element.from === 'GROUPABS') {
      newParams['groupAbsenceTypeName'] = element.value;
      newParams['switchGroup'] = true;
    } else if (element.from === 'JUSTIFYTYPE') {
      newParams['justifiedTypeName'] = element.value;
    } else if (element.from === 'HOUR') {
      newParams['hours'] = element.value;
    } else if (element.from === 'MINUTE') {
      newParams['minute'] = element.value;
    } else if (element.from === 'ENDATE') {
      newParams['to'] = element.value;
    }
    console.log("newParams", newParams);

    fetchData(newParams, setDataTab, false, false);
  }

  useEffect(() => {
    params['id'] = parameters.id;
    params['from'] = parameters.from;
    params['category'] = selectedTab;
    fetchData(params, setDataTab, false, false);
  }, [selectedTab]);

  useEffect(() => {
    if (dataTab) {
      simulateData(dataTab, setSimDataTab);
    }
  }, [dataTab]);

  const handleTabChange = (tabName: string) => {
    console.log("handleTabChange");
    setParams({});
    setSelectedTab(tabName);
  };

  return (
    <>
      <Tabs
        defaultActiveKey={selectedTab}
        id="absenceTabs"
        className="mb-3"
        onSelect={handleTabChange}
      >
        {visibleTabs.map((elem) => {
          return (
            <Tab key={elem.name} eventKey={elem.name} title={elem.description}>
              <AbsenceModalContent data={dataTab} simData={simDataTab} parameters={parameters} handleChange={handleChange} />
            </Tab>
          );
        })}
        <Tab eventKey="FIND_CODE" title={element}>
          Ricerca Codici
        </Tab>
      </Tabs>
    </>
  );
}

export default AbsenceModalTab;
