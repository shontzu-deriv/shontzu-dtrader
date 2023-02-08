import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useStore } from "../store/AppStore";

const Chart = () => {
  const app_store = useStore();
  const { tickstream, ticks_history, selected_symbol} = app_store;

  const [currentTick, setCurrentTick] = useState('')

  useEffect(()=>{
    setCurrentTick(tickstream);
  },[tickstream, ticks_history])


  return (
    <div>
      <h1>{selected_symbol.name} : {currentTick}</h1>
      <div className="chart">
        {ticks_history.prices?.map((p, id) => (
          <span key={id}>{p}</span>
        ))}
      </div>
    </div>
  );
};

export default observer(Chart);
