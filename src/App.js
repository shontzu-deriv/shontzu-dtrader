import "./App.css";
import React from "react";
import Chart from "./components/Chart";
import Form from "./components/Form";
import { observer } from "mobx-react";
import { useStore } from "./store/AppStore";

function App() {
  const appStore = useStore();
  const { connect_wss } = appStore;

  React.useEffect(() => {
    connect_wss();
  }, []);

  return (
    <div className="App">
      <div>
        <Chart />
      </div>
      <div>
        <Form />
      </div>
    </div>
  );
}

export default observer(App);
