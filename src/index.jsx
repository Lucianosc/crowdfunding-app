import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import App from "./App";
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThirdwebProvider network={ChainId.Goerli}>
    <Router>
      <App />
    </Router>
  </ThirdwebProvider>
);
