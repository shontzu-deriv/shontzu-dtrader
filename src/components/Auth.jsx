import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useStore } from "../store/AppStore";

const Auth = () => {
  const app_store = useStore();
  const { setToken , getAuthorize} = app_store;

  function handleChange(e) {
    setToken(e);
  }
  return (
    <header>
      AUTHENTICATE:{" "}
      <input
        placeholder="Place your Auth token here"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <button onClick={getAuthorize}>Authorize</button>
    </header>
  );
};
export default observer(Auth);
