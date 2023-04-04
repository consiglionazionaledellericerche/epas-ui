import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

function handleClick() {
  signIn("keycloak", { callbackUrl: "/stampings" });
}

const OauthButton = React.forwardRef(({ onClick, href }, ref) => {
    return (
      <a onClick={handleClick} className="btn btn-default">
        <img
             className="img-fluid w-75"
             alt="Login tramite OAuth2"
             src="/images/logo-cnr-big.png"
           />
      </a>
    );
});

const LoginOauth = ({ children }) => {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);

  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);

  return (
          <div className="center" id="login-idp-btn">
            {initialRenderComplete && (
            <>
              <h3>Utilizza il bottone sottostante per accedere con le credenziali CNR</h3>
              <OauthButton />
            </>
            )}
          </div>
  );
};

export default LoginOauth;