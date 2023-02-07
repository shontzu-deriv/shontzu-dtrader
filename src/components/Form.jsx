import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useStore } from "../store/AppStore";

const Form = () => {
  const app_store = useStore();
  const {
    markets,
    selected_market,
    symbols,
    selected_symbol,
    contracts_for,
    selected_contracts_for,
  } = app_store;

  return (
    <div className="form">
      <h2>Start Trading</h2>
      <div>
        Market:
        <select onChange={(m) => (selected_market = m.target.value)}>
          {markets.map((m) => (
            <option key={m.key} value={m.key}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <div>
        Symbol:
        <select onChange={(s) => (selected_symbol = s.target.value)}>
          {symbols.map((s) => (
            <option key={s.key} value={s.key}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        Contract:
        <select onChange={(c) => (selected_contracts_for = c.target.value)}>
          {contracts_for.map((c) => (
            <option key={c.key} value={c.key}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default observer(Form);
