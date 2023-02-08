import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useStore } from "../store/AppStore";

const Auth = () => {
  const app_store = useStore();
  const { logOut, balance, setToken, getAuthorize } = app_store;

  useEffect(() => {}, [balance]); 
  
  function handleChange(e) {
    setToken(e);
  }
  return (
    <header>
      {balance.loginid == null ? (
        <p>you're not logged in</p>
      ) : (
        <p>{balance.loginid}</p>
      )}
      <div>
        AUTHENTICATE:
        <input
          placeholder="Place your Auth token here"
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
        {balance.loginid == null ? (
          <button onClick={getAuthorize}>Authorize</button>
        ) : (
          <button onClick={logOut}>Log Out</button>
        )}
      </div>
      <h2>
        $ {balance.balance} {balance.currency}
      </h2>
    </header>
  );
};
export default observer(Auth);
