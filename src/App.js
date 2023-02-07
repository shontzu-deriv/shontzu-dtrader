import "./App.css";
import React from "react";
import Chart from "./components/Chart";
import Form from "./components/Form";
import { observer } from "mobx-react";
import { useStore } from "./store/AppStore";

function App() {
  const appStore = useStore();
  const { connect_wss, getTicksHistory, getActiveSymbols, getContractsForSymbol} = appStore;

  React.useEffect(()=>{
    connect_wss()
  },[])

  return (
    <div className="App">
      <Chart />
      <Form />
    </div>
  );
}

export default observer(App);
