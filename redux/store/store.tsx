import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import openSlice from "../slice/creadentialSlice";
import openModal from "../slice/openModal";
import darkModeSlice from "../slice/darkModeSlice";

const persistConfig = {
  key: "root",
  storage,
};

const openCredentialSlice = persistReducer(
  { ...persistConfig, key: "open" },
  openSlice
);
const openmodal = persistReducer({ ...persistConfig, key: "modal" }, openModal);
const darkTheme = persistReducer(
  { ...persistConfig, key: "darkmode" },
  darkModeSlice
);

const store = configureStore({
  reducer: {
    open: openCredentialSlice,
    modal: openmodal,
    darkmode: darkTheme,
  },
});


const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
