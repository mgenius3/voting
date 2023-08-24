import { Provider } from "react-redux";
import { store } from "../store/store";
// import { createContext } from 'react';

import "../styles/bootstrap.min.css";
import "../styles/style.css";
import "../styles/Home.module.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
