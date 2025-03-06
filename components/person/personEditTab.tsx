import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { getSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import PersonDatiAnagrafici from "./personDatiAnagrafici";
import PersonContratti from "./personContratti";
import PersonBadge  from "./personBadge";
import PersonChildren  from "./personChildren";
import PersonConfiguration from "./personConfiguration";

interface PersonEditTabProps {
    tabName: string;
    tabsVisible: Object;
    data: any;
}

const PersonEditTab: React.FC<PersonEditTabProps> = ({
  tabName,
  data
}) => {
  const [selectedTab, setSelectedTab] = useState<string | null | any>(tabName);

  const handleTabChange = (tabName: string|null) => {
    setSelectedTab(tabName);
  };

  return (
    <>
      <Tabs
        activeKey={selectedTab}
        id="peopleTabs"
        className="mb-3 tabPrimary"
        onSelect={(k) => handleTabChange(k)}
      >
        <Tab key="anagrafica" eventKey="ANAGRAFICA" title="Dati Anagrafici" className="tabPrimary">
          <PersonDatiAnagrafici data={data} />
        </Tab>
        <Tab key="contratti" eventKey="CONTRATTI" title="Dati Contrattuali" className="tabPrimary">
          <PersonContratti data={data} />
        </Tab>
        <Tab key="configurazione" eventKey="CONFIGURAZIONE" title="Configurazione personale">
          <PersonConfiguration data={data} />
        </Tab>
        {/*<Tab key="gruppi" eventKey="GRUPPI" title="Gruppi">
          <PersonDatiAnagrafici data="D" />
        </Tab>*/}
        <Tab key="badge" eventKey="BADGE" title="Badge">
          <PersonBadge data={data} />
        </Tab>
        <Tab key="figli" eventKey="FIGLI" title="Figli">
          <PersonChildren data={data} />
        </Tab>
      </Tabs>
    </>
  );
}


export default PersonEditTab;
