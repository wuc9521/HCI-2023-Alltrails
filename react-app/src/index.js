import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider, Modal } from "./context/Modal";
import MapProvider from "./context/MapContext";
import TrailProvider from "./context/TrailContext";
import configureStore from "./store";
import { createRoot } from "react-dom/client";
import * as sessionActions from "./store/session";
import App from "./App";

import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}


const Root = () => {
  return (
    <MapProvider>
      <TrailProvider>
        <ModalProvider>
          <Provider store={store}>
            <BrowserRouter>
              <App />
              <Modal />
            </BrowserRouter>
          </Provider>
        </ModalProvider>
      </TrailProvider>
    </MapProvider>
  );
}
const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
