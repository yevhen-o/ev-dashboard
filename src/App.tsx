import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";

import { Router } from "./Router";
import { store } from "src/store/store";
import ToastProvider from "./features/toasts/ToastProvider";
import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <ToastProvider />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
