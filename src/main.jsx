import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import "./index.css";
const root = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(
  <Provider store={store}>
    <StrictMode>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </StrictMode>
  </Provider>
);
