import { action, decorate, observable } from "mobx";
import React, { useRef } from "react";

export default class AppStore {
  app_id = 1089;
  reference = useRef();

  markets = []; //todo (if !includes(e){markets.push(e.market_display_name)})
  symbols = []; //todo (if (e.market_display_name == this.selected_market){symbols.push(e.display_name)})
  contracts_for = [];
  selected_market = "Forex";
  selected_symbol = "AUD/USD";
  selected_contracts_for = "Asians";

  tick_id = 0;
  ticks_history = [];
  profile = {
    login_id: "",
    total_balance: 0,
    token: { authorize: "" },
    expense_item: [],
  };
  contract_proposal = { proposal_id: "" };
  contract_portfolio = {
    contract_id: "",
  };
  buy_settings = {
    buy_price: 10,
    basis: "payout",
    duration_unit: "m",
    symbol: "R_100",
    duration: 15,
  };
  get_markets = {
    active_symbols: "brief",
    product_type: "basic",
  };
  ticks_history_request = {
    ticks_history: "R_50",
    adjust_start_time: 1,
    count: 10,
    end: "latest",
    start: 1,
    style: "ticks",
  };
  active_symbols_request = {
    active_symbols: "brief",
    product_type: "basic",
  };
  contracts_for_symbol_request = {
    contracts_for: "R_50",
    currency: "USD",
    landing_company: "svg",
    product_type: "basic",
  };

  connect_ws() {
    this.reference.current = new WebSocket(
      "wss://ws.binaryws.com/websockets/v3?app_id=1089"
    );
  }

  connect_wss() {
    this.connect_ws();

    let connection = this.reference.current;

    connection.onopen = (msg) => {
      console.log("connected", msg);
      this.getTicksHistory();
      this.getActiveSymbols();
      this.getContractsForSymbol();
    };

    connection.onmessage = (msg) => {
      let data = JSON.parse(msg.data);
      console.log(data);
      this.SwitchStatement(data);
    };

    connection.onclose = (msg) => {};

    connection.onerror = (msg) => {};
  }

  getTicksHistory() {
    this.reference.current.send(JSON.stringify(this.ticks_history_request));
  }

  getActiveSymbols() {
    this.reference.current.send(JSON.stringify(this.active_symbols_request));
  }

  getContractsForSymbol() {
    this.reference.current.send(
      JSON.stringify(this.contracts_for_symbol_request)
    );
  }

  //THE switch statement
  SwitchStatement(data) {
    if (data.error !== undefined) {
      console.log("Error : ", data.error?.message);
      this.api.disconnect();
    }
    if (data.msg_type === "active_symbols") {
      // get every market
      data.active_symbols.forEach((item) => {
        if (!this.markets.includes(item.market_display_name)) {
          this.markets.push(item.market_display_name);
        }
      });
      // get every symbol
      data.active_symbols.forEach((item) => {
        if (!this.symbols.includes(item.display_name)) {
          this.symbols.push(item.display_name);
        }
        //todo: filter based on selected_market
      });
    } else if (data.msg_type === "contracts_for") {
      this.contracts_for = [];
      data.contracts_for.available.forEach((contract) => {
        if (!this.contracts_for.includes(contract.contract_category_display)) {
          this.contracts_for.push(contract.contract_category_display);
        }
        //todo: filter based on selected_symbol
      });
    } else if (data.msg_type === "proposal") {
      // console.log("Ask Price: %s", data.proposal.display_value);
      // console.log("Payout: %f", data.proposal.payout);
      // console.log("Spot: %f", data.proposal.spot);
    } else if (data.msg_type === "history") {
      this.ticks_history = [];
      this.ticks_history=data.history;
    } else if (data.msg_type === "tick") {
      // console.log(this.ticks_history, data.tick.quote);
    }
  }
}

decorate(AppStore, {
  connected: observable,
  isLoading: observable,
  markets: observable,
  symbols: observable,
  contracts_for: observable,
  assets: observable,
  selected_market: observable,
  selected_symbol: observable,
  selected_trade_type: observable,
  tick_id: observable,
  ticks_history: observable,
  ticks_history_request: observable,
  contracts_for_symbol_request: observable,
  profile: observable,
  buy_settings: observable,
  error: observable,
  message: observable,
  connect_ws: action.bound,
  connect_wss: action.bound,
  SwitchStatement: action.bound,
  getTicksHistory: action.bound,
  getActiveSymbols: action.bound,
  getContractsForSymbol: action.bound,
});

let store_context;

export const useStore = () => {
  if (!store_context) {
    const appStore = new AppStore();

    store_context = React.createContext(appStore);
  }

  return React.useContext(store_context);
};