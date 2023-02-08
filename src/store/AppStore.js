import { action, decorate, observable } from "mobx";
import React, { useRef } from "react";

export default class AppStore {
  app_id = 1089;
  reference = useRef();

  markets = []; // (if !includes(e){markets.push(e.market_display_name)})
  symbols = []; // (if (e.market_display_name == this.selected_market){symbols.push(e.display_name)})
  contracts_for = [];
  selected_market = "Derived";
  selected_symbol = { name: "EUR/AUD", symbol: "R_50" };
  selected_contracts_for = "Asians";
  tickstream = null;
  ticks_history = [];

  profile = {
    login_id: null,
    total_balance: 10000,
    token: { authorize: "null" },
    expense_item: [],
  };
  balance = {
    balance: 10000,
    currency: null,
    id: null,
    loginid: null,
  };
  contract_proposal = { proposal_id: "" };
  contract_portfolio = {
    contract_id: "",
  };
  buy_settings = {
    buy_price: 10,
    basis: "payout",
    duration_unit: "m",
    symbol: this.selected_symbol.symbol,
    duration: 15,
  };
  get_markets = {
    active_symbols: "brief",
    product_type: "basic",
  };
  ticks_history_request = {
    ticks_history: this.selected_symbol.symbol,
    adjust_start_time: 1,
    count: 10,
    end: "latest",
    start: 1,
    style: "ticks",
  };
  tickstream_request = {
    ticks: this.selected_symbol.symbol,
    subscribe: 1,
  };
  active_symbols_request = {
    active_symbols: "brief",
    product_type: "basic",
  };
  contracts_for_symbol_request = {
    contracts_for: this.selected_symbol.symbol,
    currency: "USD",
    landing_company: "svg",
    product_type: "basic",
  };

  setToken(token) {
    this.profile.token.authorize = token;
  }

  setSelectedMarket(market) {
    this.selected_market = market;
    this.getActiveSymbols();
  }

  setSelectedSymbol(symbol) {
    this.selected_symbol.name = symbol;
    this.getActiveSymbols();
    this.getContractsForSymbol();
    this.getTickstream();
  }

  setSelectedContractsFor(contract) {
    this.selected_contracts_for = contract;
  }

  connect_ws() {
    this.reference.current = new WebSocket(
      "wss://ws.binaryws.com/websockets/v3?app_id=1089"
    );
  }

  async connect_wss() {
    await this.connect_ws();

    let connection = this.reference.current;

    connection.onopen = (msg) => {
      this.getTicksHistory();
      this.getActiveSymbols();
      this.getContractsForSymbol();
      this.getTickstream();
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

  getTickstream() {
    // this.reference.current.send({ forget_all: "ticks" });
    this.reference.current.send(JSON.stringify(this.tickstream_request));
  }
  getActiveSymbols() {
    this.reference.current.send(JSON.stringify(this.active_symbols_request));
  }

  getContractsForSymbol() {
    this.reference.current.send(
      JSON.stringify(this.contracts_for_symbol_request)
    );
  }

  getAuthorize() {
    this.reference.current.send(JSON.stringify(this.profile.token));
  }

  //THE switch statement
  SwitchStatement(data) {
    if (data.error !== undefined) {
      console.log("Error : ", data.error?.message);
      this.api.disconnect();
    }
    if (data.msg_type === "active_symbols") {
      this.symbols = [];

      // get every market
      data.active_symbols.forEach((item) => {
        if (!this.markets.includes(item.market_display_name)) {
          this.markets.push(item.market_display_name);
        }
      });
      // get every symbol
      data.active_symbols.forEach((item) => {
        if (!this.symbols.includes(item.display_name)) {
          //filter based on selected_market
          if (item.market_display_name == this.selected_market) {
            this.symbols.push(item.display_name);
          }
        }
      });
    } else if (data.msg_type === "contracts_for") {
      // this.contracts_for = [];
      data.contracts_for.available.forEach((contract) => {
        if (!this.contracts_for.includes(contract.contract_category_display)) {
          this.contracts_for.push(contract.contract_category_display);
        }
        //todo: filter based on selected_symbol
      });
    } else if (data.msg_type === "authorize") {
      this.reference.current.send(
        JSON.stringify({
          balance: 1,
          subscribe: 1,
        })
      );
      console.log("authorized");
    } else if (data.msg_type === "balance") {
      this.balance = data.balance;
      console.log("balance ", this.balance);
    } else if (data.msg_type === "history") {
      this.ticks_history = [];
      this.ticks_history = data.history;
    } else if (data.msg_type === "tick") {
      this.getTicksHistory()
      this.tickstream = data.tick.quote;
    }
  }
}

decorate(AppStore, {
  connected: observable,
  isLoading: observable,

  markets: observable,
  symbols: observable,
  contracts_for: observable,
  selected_market: observable,
  selected_symbol: observable,
  selected_trade_type: observable,
  setSelectedMarket: action.bound,
  setSelectedSymbol: action.bound,
  setSelectedContractsFor: action.bound,
  balance: observable,
  profile: observable,
  setToken: action.bound,
  getAuthorize: action.bound,

  ticks_history: observable,
  ticks_history_request: observable,
  contracts_for_symbol_request: observable,
  buy_settings: observable,
  error: observable,
  message: observable,
  connect_ws: action.bound,
  connect_wss: action.bound,
  SwitchStatement: action.bound,
  getTicksHistory: action.bound,
  getActiveSymbols: action.bound,
  getContractsForSymbol: action.bound,
  tickstream: observable,
  tickstream_request: observable,
  setTickstream: action.bound,
  getTickstream: action.bound,
});

let store_context;

export const useStore = () => {
  if (!store_context) {
    const appStore = new AppStore();

    store_context = React.createContext(appStore);
  }

  return React.useContext(store_context);
};
