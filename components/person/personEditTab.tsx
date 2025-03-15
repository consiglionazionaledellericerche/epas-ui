import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { getSession } from 'next-auth/react';
import PersonDatiAnagrafici from "./personDatiAnagrafici";
import PersonContratti from "./personContratti";
import PersonBadge  from "./personBadge";
import PersonChildren  from "./personChildren";
import PersonConfiguration from "./personConfiguration";
import { secureCheck } from '../../utils/secureCheck';

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
  const [canSeeBadgeTab, setCanSeeBadgeTab] = useState<boolean>(false);
  const [canSeeContractTab, setCanSeeContractTab] = useState<boolean>(false);
  const [canSeeChildrenTab, setCanSeeChildrenTab] = useState<boolean>(false);
  const [canSeeConfigurationTab, setCanSeeConfigurationTab] = useState<boolean>(false);
  const [canSeePersonTab, setCanSeePersonTab] = useState<boolean>(false);

  useEffect(() => {
      if (data.id){
        async function checkSecure() {
          let paramsSC = {'method':'GET',
                        'path':'/rest/v4/badgesystems/personBadges'};
          var checkBadgeTab = await secureCheck(paramsSC);
          setCanSeeBadgeTab(checkBadgeTab);

          paramsSC = {'method':'GET',
                        'path':'/rest/v4/contracts/personContracts'};
          var checkContractTab = await secureCheck(paramsSC);
          setCanSeeContractTab(checkContractTab);

          paramsSC = {'method':'GET',
                        'path':'/rest/v4/people/children'};
          var checkChildrenTab = await secureCheck(paramsSC);
          setCanSeeChildrenTab(checkChildrenTab);

          paramsSC = {'method':'GET',
                        'path':'/rest/v4/configurations/personShow'};
          var checkConfigurationTab = await secureCheck(paramsSC);
          setCanSeeConfigurationTab(checkConfigurationTab);

          paramsSC = {'method':'GET',
                        'path':'/rest/v4/people'};
          var checkPersonTab = await secureCheck(paramsSC);
          setCanSeePersonTab(checkPersonTab);
        }
        checkSecure();
      }
  }, [data.id]);

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
        { canSeePersonTab && <Tab key="anagrafica" eventKey="ANAGRAFICA" title="Dati Anagrafici" className="tabPrimary">
          <PersonDatiAnagrafici data={data} />
        </Tab>}
        {canSeeContractTab && <Tab key="contratti" eventKey="CONTRATTI" title="Dati Contrattuali" className="tabPrimary">
          <PersonContratti data={data} />
        </Tab>}
        {canSeeConfigurationTab && <Tab key="configurazione" eventKey="CONFIGURAZIONE" title="Configurazione personale">
          <PersonConfiguration data={data} />
        </Tab>}
        {/*<Tab key="gruppi" eventKey="GRUPPI" title="Gruppi">
          <PersonDatiAnagrafici data="D" />
        </Tab>*/}
        {canSeeBadgeTab && <Tab key="badge" eventKey="BADGE" title="Badge">
          <PersonBadge data={data} />
        </Tab>}
        {canSeeChildrenTab && <Tab key="figli" eventKey="FIGLI" title="Figli">
          <PersonChildren data={data} />
        </Tab>}
      </Tabs>
    </>
  );
}


export default PersonEditTab;
