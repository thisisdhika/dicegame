import React from "react";
import ReactDOM from "react-dom";

import "./styles/bundle.css";
import "./styles/index.scss";

import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();
