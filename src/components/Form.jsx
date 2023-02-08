import React from "react";
import { observer } from "mobx-react";
import { useStore } from "../store/AppStore";

const Form = () => {
  const app_store = useStore();
  const {
    markets,
    symbols,
    contracts_for,
    setSelectedMarket,
    setSelectedSymbol,
    setSelectedContractsFor,
  } = app_store;

  return (
    <div className="form">
      <h1>Start Trading</h1>
      <div>
        Market:
        <select onChange={(m) => setSelectedMarket(m.target.value)}>
          {markets.map((m, id) => (
            <option key={id} value={m.key}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <div>
        Symbol:
        <select onChange={(s) => setSelectedSymbol(s.target.value)}>
          {symbols.map((s, id) => (
            <option key={id} value={s.key}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        Contract:
        <select onChange={(c) => setSelectedContractsFor(c.target.value)}>
          {contracts_for.map((c, id) => (
            <option key={id} value={c.key}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button>BUY</button>
        <button>SELL</button>
      </div>
    </div>
  );
};

export default observer(Form);
