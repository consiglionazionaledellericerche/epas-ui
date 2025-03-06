import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { getSession } from 'next-auth/react';
import PeopleTable from "./peopleTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface PeopleTabProps {
  tabName: string;
  tabsVisible: Object;
  withContract: any;
  withoutContract: any;
}

const PeopleTab: React.FC<PeopleTabProps> = ({
  tabName,
  withContract,
  withoutContract
}) => {
  const [selectedTab, setSelectedTab] = useState<string | null | any>(tabName);
  const [dataTab, setDataTab] = useState(withContract);

  const handleTabChange = (tabName: string|null) => {
    setSelectedTab(tabName);
  };

  return (
    <>
      <Tabs
        activeKey={selectedTab}
        id="peopleTabs"
        className="mb-3"
        onSelect={(k) => handleTabChange(k)}
      >
            <Tab key="withContract" eventKey="WITHCONTRACT" title="Personale Attivo">
              <PeopleTable data={withContract} typeTable="A" />
            </Tab>
            <Tab key="withoutContract" eventKey="WITHOUTCONTRACT" title="Personale Non Attivo">
              <PeopleTable data={withoutContract} typeTable="D" />
            </Tab>
      </Tabs>
    </>
  );
}

export default PeopleTab;
