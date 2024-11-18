import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// redux
import { Provider } from "react-redux";
import store from "./app/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
