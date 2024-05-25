import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { investMentReducer } from "./State";

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  investMentReducer.reducer,
);

const store = configureStore({
  reducer: { BTC: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
setupListeners(store.dispatch);

export default store;
