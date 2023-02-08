import "./App.css";
import React from "react";
import Chart from "./components/Chart";
import Form from "./components/Form";
import Auth from "./components/Auth";
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
      <Auth />
      <div>
        <Chart />
        <Form />
      </div>
    </div>
  );
}

export default observer(App);
