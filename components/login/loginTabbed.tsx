import React, { ReactNode } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useRouter } from 'next/router';
import LoginOauth from './loginOauth';
import LoginLdap from './loginLdap';

const LoginTabbed = () => {
  const router = useRouter();
  const activeTab = router.query.tab || 'loginOauth';

  return (<>
		<div className="panel-body">
		  <div className="row">
			<div className="col-lg-12">
          <Tabs defaultActiveKey="loginCNR" id="loginTab" >
                <Tab id="login-idp-link" eventKey="loginCNR" title="login CNR" active className="p-4 panel panel-login">
                  <LoginOauth />
                </Tab>
                <Tab eventKey="loginEPAS" title="login EPAS" disabled>
                  <LoginLdap />
                </Tab>
          </Tabs>
      </div>
      </div>
    </div>
  </>
  );
};

export default LoginTabbed;