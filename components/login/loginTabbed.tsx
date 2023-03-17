import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useRouter } from 'next/router';
import { signIn, signOut } from "next-auth/react"
import Link from 'next/link';

function handleClick() {
  signIn('authIIT', { callbackUrl: '/stampings' })
}

const LoginTabbed = ({ children }) => {
  const router = useRouter();
  const activeTab = router.query.tab || 'loginOauth';

  return (<>
		<div class="panel-body">
		  <div class="row">
			<div class="col-lg-12">
          <Tabs
                defaultActiveKey="loginCNR"
                id="loginTab"
              >
                <Tab id="login-idp-link" eventKey="loginCNR" title="login CNR" active className="p-4 panel panel-login">
                  <h3>Utilizza il bottone sottostante per accedere con le credenziali CNR</h3>
                  <div className="center" id="login-idp-btn">
                  <Link className="col-xs-12" href="" legacyBehavior>
                    <a onClick={handleClick} className="btn btn-default" >
                      <img className="img-fluid w-75" alt="Login tramite OAuth2"
                                             				src="/images/logo-cnr-big.png" />
                    </a>
                  </Link>
                  </div>

                </Tab>
                <Tab eventKey="loginEPAS" title="login EPAS" disabled>

                </Tab>

                </Tabs>
   </div>
      </div>
         </div>

              </>
  );
};

export default LoginTabbed;