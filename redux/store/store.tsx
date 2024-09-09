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
import sidebarNavColorSlice from "../slice/sidebarNavColorSlice";
import navfix from "../slice/headerNavFixSlice";
import allPhSellerSlice from "../slice/photography/AllPhSellerSlice";
import perticularPhPhotographySellerSlice from "../slice/photography/AllPhotographySlice";
import PhSellerProfileSlice from "../slice/photography/PhSellerProfile";
import OpenModalSlice from "../slice/photography/OpenModalSlice";
import allPhBuyerSlice from "../slice/photography/AllPhBuyerSlice";
import BuyerProfileSlice from "../slice/photography/BuyerProfileSlice";
import allBuyerSlice from "../slice/photography/AllBuyerSlice";
import artMusicBuyerProfileSlice from "../slice/artMusicBuyerProfileSlice";
import ArtMusicBuyerPurchaseListSlice from "../slice/ArtMusicBuyerPurchaseListSlice";
import artMusicSellerProfileSlice from "../slice/artMusicSellerProfileSlice";
import particularSellerArtMusicSlice from "../slice/particularSellerArtMusicSlice";
import salePhotographySlice from "../slice/photography/PhotographySaleSlice";
import BuyerPhotograhySlice from "../slice/photography/AllBuyerPhotography";
import getEcommerceBuyersReducer from "../slice/ecommerce/getEcommerceBuyersSlice";
import actionReducer from "../slice/ecommerce/actionSlice";




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
const phprofile = persistReducer(
  { ...persistConfig, key: "phprofile" },
  PhSellerProfileSlice
);
const openDialog = persistReducer(
  { ...persistConfig, key: "dialog" },
  OpenModalSlice
);
const photography = persistReducer(
  { ...persistConfig, key: "photography" },
  perticularPhPhotographySellerSlice
);

const phbuyer = persistReducer(
  { ...persistConfig, key: "phbuyer" },
  allPhBuyerSlice
);

const buyer = persistReducer(
  { ...persistConfig, key: "buyer" },
  allBuyerSlice
);

const buyerprofile = persistReducer(
  { ...persistConfig, key: "buyerprofile" },
  BuyerProfileSlice
);
const artMusicBuyerProfile = persistReducer(
  { ...persistConfig, key: "artmusicbuyerprofile" },
  artMusicBuyerProfileSlice
);

const artMusicBuyerPurchaseList = persistReducer(
  { ...persistConfig, key: "artmusicbuyerpurchaseList" },
  ArtMusicBuyerPurchaseListSlice
);

const artMusicSellerProfile = persistReducer(
  { ...persistConfig, key: "artmusicsellerprofile" },
  artMusicSellerProfileSlice
);

const particularSellerArtMusic = persistReducer(
  { ...persistConfig, key: "particularsellersartmusic" },
  particularSellerArtMusicSlice
);
const sale = persistReducer(
  { ...persistConfig, key: "sale" },
  salePhotographySlice
);

const buyerphotography = persistReducer(
  { ...persistConfig, key: "buyerphotography" },
  BuyerPhotograhySlice
);

const userDetails = persistReducer({ ...persistConfig, key: "user" }, userSlice);
const nevSideColor = persistReducer({ ...persistConfig, key: "sidebarbg" }, sidebarNavColorSlice);
const headerFix = persistReducer({ ...persistConfig, key: "fix" }, navfix);


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    open: openCredentialSlice,
    modal: openmodal,
    auth:auth,
    darkmode: darkTheme,
    user:userDetails,
    sidebarbg:nevSideColor,
    fix:headerFix,
    phseller:phseller,
    photography:photography,
    phprofile:phprofile,
    dialog:openDialog,
    phbuyer:phbuyer,
    buyerprofile:buyerprofile,
    buyer:buyer,
    sale:sale,
    buyerphotography:buyerphotography,
    artMusicBuyerProfile:artMusicBuyerProfile,
    artmusicbuyerpurchaseList:artMusicBuyerPurchaseList,
    artmusicsellerprofile:artMusicSellerProfile,
    particularsellersartmusic:particularSellerArtMusic,
    getEcommerceBuyers:getEcommerceBuyersReducer,
    userActions: actionReducer, // Add the actionSliceReducer to the store

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