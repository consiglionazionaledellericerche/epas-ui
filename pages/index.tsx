import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

import Container from 'react-bootstrap/Container';


const App: React.FC = () => {

  const { data: session } = useSession()
  if(session) {
      const { accessToken } = data
      return <>
      <div>Access Token: {accessToken}</div>
        Signed in as {session.user.email} <br/>
        <button onClick={() => signOut()}>Sign out</button>
          <h1 className="header">
            Benvenuto nella nuova UI di ePAS
          </h1>
        </>
    }
    return <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </>
};

export default App;