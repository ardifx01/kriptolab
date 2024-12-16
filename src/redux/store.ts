import { createWrapper } from "next-redux-wrapper";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import localforage from "localforage";
import { persistReducer, persistStore } from "redux-persist";

import cryptoTokenReducer from "./reducers/cryptoToken";
import globalSettingsReducer from "./reducers/globalSettingsSlice";
import modalReducer from "./reducers/modalSlice";
import portfolioReducer from "./reducers/portfolioSlice";
import userReducer from "./reducers/userSlice";

const persistConfig = {
  key: "KriptoLab_state",
  storage: localforage,
  blacklist: ["cryptoToken", "portfolio", "modal"],
};

const rootReducer = combineReducers({
  globalSettings: globalSettingsReducer,
  cryptoToken: cryptoTokenReducer,
  portfolio: portfolioReducer,
  user: userReducer,
  modal: modalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const storeWrapper = createWrapper(() => store);
const persistor = persistStore(store);

export { persistor, store, storeWrapper };
export type { AppDispatch, RootState };
