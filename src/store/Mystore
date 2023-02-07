export default class Mystore {
    reference = React.useRef()
    constructor() {
        this.reference.current = new WebSocket(
        "wss://ws.binaryws.com/websockets/v3?app_id=1089"
        );
        this.reference.current.onopen(()=> {})
        this.reference.current.onmessage((msg)=> {
            let data = JSON.parse(msg.data);

            this.SwitchStatement(data);
        })
    }


}

let store_context;

export const useStore = () => {
  if (!store_context) {
    const expenseStore = new Mystore();

    store_context = React.createContext(expenseStore);
  }

  return React.useContext(store_context);
};