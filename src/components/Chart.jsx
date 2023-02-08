import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useStore } from "../store/AppStore";

const Chart = () => {
  const app_store = useStore();
  const { ticks_history } = app_store;
  // const [ticks, setTicks] = useState([])

  // useEffect(()=>{
  //   setTicks(ticks_history.prices)

  // },[ticks_history])

  return (
    <div>
      <h1>Ticks</h1>
      <div className="chart">
        {ticks_history.prices?.map((p, id) => (
          <span key={id}>{p}</span>
        ))}
      </div>
    </div>
  );
};

export default observer(Chart);
