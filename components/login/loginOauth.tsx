import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

// Definisci un nome per il componente OauthButton
const OauthButton = React.forwardRef(function OauthButton(
  { onClick, href },
  ref
) {
  function handleClick() {
    signIn("keycloak", { callbackUrl: "/stampings" });
  }

  return (
    <a onClick={handleClick} className="btn btn-default">
      <Image
        width="100"
        height="80"
        className="img-fluid w-75"
        alt="Login tramite OAuth2"
        src="/images/logo-cnr-big.png"
      />
    </a>
  );
});

// Assegna un nome al componente LoginOauth
LoginOauth.displayName = "LoginOauth";

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
