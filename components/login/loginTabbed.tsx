import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useRouter } from 'next/router';
import { signIn, signOut } from "next-auth/react"

const LoginTabbed = ({ children }) => {
  const router = useRouter();
  const activeTab = router.query.tab || 'loginOauth';

  return (<>
          <Tabs
                defaultActiveKey="loginCNR"
                id="loginTab"
                className="mb-3"
              >
                <Tab eventKey="loginCNR" title="login CNR" active>
                  <h4>Utilizza il bottone sottostante per accedere con le credenziali CNR</h4>
                  <button onClick={() => signIn()}>Consiglio Nazionale delle Ricerche</button>
                </Tab>
                <Tab eventKey="loginEPAS" title="login EPAS" disabled>

                </Tab>

                </Tabs>
              </>
  );
};

export default LoginTabbed;