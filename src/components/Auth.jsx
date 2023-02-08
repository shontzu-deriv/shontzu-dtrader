import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStore } from "../store/AppStore";

const Auth = () => {
  const app_store = useStore();
  const { logOut, balance, setToken, getAuthorize } = app_store;
  const [modal, setModal] = useState(false);

  useEffect(() => {}, [balance]);

  function handleChange(e) {
    setToken(e);
  }
  return (
    <div>
      <header>
        {balance.loginid == null ? (
          <button onClick={() => setModal(true)}>Log In</button>
        ) : (
          <button onClick={logOut}>
            {balance.loginid}
            <br />
            Log Out
          </button>
        )}
        <h2>
          $ {balance.balance} {balance.currency}
        </h2>
      </header>
      {modal ? (
        <div className="modal-container">
          <div className="modal">
            <button onClick={() => setModal(false)}>X</button>
            <h1>AUTHENTICATE:</h1>
            <span>
              <input
                placeholder="Place your Auth token here"
                onChange={(e) => {
                  handleChange(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  setModal(false);
                  getAuthorize()
                }}
              >
                Authorize
              </button>
            </span>
            <span style={{ color: "gray" }}>yBhAQBSjx7Zrf6T</span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default observer(Auth);
