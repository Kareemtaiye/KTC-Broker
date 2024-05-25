import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Redux/Store.jsx";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

// import "./css/input.css";
let persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
