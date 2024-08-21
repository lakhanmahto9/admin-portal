import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import openSlice from "../slice/creadentialSlice";

const persistConfig = {
  key: "root",
  storage,
};

const openCredentialSlice = persistReducer(
  { ...persistConfig, key: "open" },
  openSlice
);

const store = configureStore({
  reducer: {
    open: openCredentialSlice,
  },
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
