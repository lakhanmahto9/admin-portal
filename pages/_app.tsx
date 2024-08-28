import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store, persistor } from "@/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
        <ToastContainer/>
      </PersistGate>
    </Provider>
  )
}
