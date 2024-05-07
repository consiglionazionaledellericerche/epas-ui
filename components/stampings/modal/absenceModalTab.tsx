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
  data: AbsenceForm;
  parameters: string
}

const AbsenceModalTab: React.FC<AbsenceModalTabProps> = ({
data,
parameters
  }) => {

  const [selectedTab, setSelectedTab] = useState(data.categoryTabSelected.name);
  const [dataTab, setDataTab] = useState(data);
  const element =(<span><FontAwesomeIcon icon={faMagnifyingGlass} /> Ricerca Codici</span>);
  console.log("data.tabsVisibile", data.tabsVisibile);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession() as CustomSession;
      let accessToken = null;
      if (session) {
        accessToken = session.accessToken;
      }
    const url = '/api/rest/v4/absencesGroups/groupsForCategory?'+parameters+"&category="+selectedTab;

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
            console.log("data", data);
            // Aggiorna i dati con i nuovi dati ottenuti dall'API
            setDataTab(data);
          } catch (error) {
            console.error("unable to achieve this", error);
          }
        };

        fetchData();
      }, [selectedTab]);

  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
  };

   return( <>
            <Tabs
              defaultActiveKey={selectedTab}
              id="absenceTabs"
              className="mb-3"
              onSelect={handleTabChange}
            >
              {Object.values(dataTab.tabsVisibile).map((elem) => {
                      return (
                            <Tab eventKey={elem.name} title={elem.description}>
                                <AbsenceModalContent data={dataTab} parameters={parameters} />
                            </Tab>
                            );
                        })
              }
              <Tab eventKey="FIND_CODE" title={element}>
                Ricerca Codici
              </Tab>
            </Tabs>
            </>
    );
}

export default AbsenceModalTab