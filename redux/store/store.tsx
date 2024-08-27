import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import storage from "redux-persist/lib/storage";
import openSlice from "../slice/creadentialSlice";
import openModal from "../slice/openModal";
import darkModeSlice from "../slice/darkModeSlice";
import userSlice from "../../redux/slice/fetchAllUsersDetailSlice";
import adminLogin from "../../redux/slice/adminloginSlice";
import { apiSlice } from "../api/apiSlice";
import allPhSellerSlice from "../slice/photography/AllPhSellerSlice";
import perticularPhPhotographySellerSlice from "../slice/photography/AllPhotographySlice";

const persistConfig = {
  key: "root",
  storage,
};

const openCredentialSlice = persistReducer(
  { ...persistConfig, key: "open" },
  openSlice
);
const openmodal = persistReducer({ ...persistConfig, key: "modal" }, openModal);
const auth = persistReducer({ ...persistConfig, key: "auth" }, adminLogin);
const darkTheme = persistReducer(
  { ...persistConfig, key: "darkmode" },
  darkModeSlice
);

const phseller = persistReducer(
  { ...persistConfig, key: "phseller" },
  allPhSellerSlice
);
const photography = persistReducer(
  { ...persistConfig, key: "photography" },
  perticularPhPhotographySellerSlice
);

const persistUser = persistReducer({ ...persistConfig, key: "user" }, userSlice);

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    open: openCredentialSlice,
    modal: openmodal,
    auth:auth,
    darkmode: darkTheme,
    user:persistUser,
    phseller:phseller,
    photography:photography,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
const persistor = persistStore(store);



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };