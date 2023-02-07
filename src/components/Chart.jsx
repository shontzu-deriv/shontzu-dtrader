import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useStore } from "../store/AppStore";

const Chart = () => {
  const app_store = useStore();
  const { ticks_history } = app_store;

  return (
    <div>
      <h1>ticks history</h1>
      prices:
      <p>{ticks_history.prices}</p>
      times:
      <p>{ticks_history.times}</p>
    </div>
  );
};

export default observer(Chart);
