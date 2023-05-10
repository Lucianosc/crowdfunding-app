import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./main.css";
import { StateContextProvider } from "./context/StateContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { WagmiConfig, createClient, configureChains, goerli } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <WagmiConfig client={client}>
    <Router>
      <StateContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </StateContextProvider>
    </Router>
  </WagmiConfig>
);
