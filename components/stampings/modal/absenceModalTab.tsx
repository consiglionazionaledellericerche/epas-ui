import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useRequest } from "../../../request/useRequest"
import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import { getSession } from 'next-auth/react';
import AbsenceModalContent from "./absenceModalContent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AbsenceForm } from "../../../types/absenceForm";
import DateUtility from "../../../utils/dateUtility";

interface AbsenceModalTabProps {
  tabName: string;
  tabsVisible:Object;
  data: AbsenceForm,
  parameters: any
}

const AbsenceModalTab: React.FC<AbsenceModalTabProps> = ({
  tabName,
  tabsVisible,
  data,
  parameters
}) => {
  const [selectedTab, setSelectedTab] = useState(tabName);
  const [visibleTabs, setVisibleTabs] = useState(Object.values(tabsVisible));
  const [dataTab, setDataTab] = useState(data);
  const element =(<span><FontAwesomeIcon icon={faMagnifyingGlass} /> Ricerca Codici</span>);
  const [params, setParams] = useState({});

  const [newParams, setNewParams] = useState({});

  const handleChange = (element) => {
    console.log("element",element, );
    if ('cleanAll' in element && element['cleanAll'] ) {
        delete newParams['absenceTypeCode'];
    }
    console.log('dataTab', dataTab);

    if (!('groupAbsenceTypeName' in element)) {
            newParams['groupAbsenceTypeName'] = dataTab.groupSelected?.name;
        }
    if (!('absenceTypeCode' in element)) {
            newParams['absenceTypeCode'] = dataTab.absenceTypeSelected?.code;
        }
    if (element.from == 'ABSENCE'){
        newParams['absenceTypeCode'] = element.value;
    }
    else if (element.from == 'GROUPABS'){
        newParams['groupAbsenceTypeName'] = element.value;
    }
    else if (element.from == 'JUSTIFYTYPE'){
    }
    else if (element.from == 'ENDATE'){
      newParams['to'] = element.value;
    }
    console.log("newParams",newParams);

    fetchData(newParams);
  }
  console.log("selectedTab", selectedTab);

  const fetchData = async (params) => {
    const session = await getSession() as CustomSession;
    let accessToken = null;
    if (session) {
      accessToken = session.accessToken;
    }

    params['id'] = parameters.id;
    params['from'] = parameters.from;
    params['category'] = selectedTab;

    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    const url = '/api/rest/v4/absencesGroups/groupsForCategory?'+queryString;
    console.log("URL", url);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken
        }
      });
      if (!response.ok) {
        throw new Error('Errore durante la richiesta API');
      }
      const data = await response.json();
      // Aggiorna i dati con i nuovi dati ottenuti dall'API
      setDataTab(data);
    } catch (error) {
      console.error("unable to achieve this", error);
    }
  };

  useEffect(() => {
    fetchData(parameters);
  }, [selectedTab]);

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
              <AbsenceModalContent data={dataTab} parameters={parameters} handleChange={handleChange}/>
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
