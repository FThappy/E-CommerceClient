import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux"
import wishlistReducer from "./wishlistRedux";
import userReducer from "./userRedux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const cartPersistConfig = {
  key: "cart",
  version: 1,
  storage,
};

const wishlistPersistConfig = {
  key: "wishlist",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);
const cartPersistedReducer = persistReducer(cartPersistConfig, cartReducer);
const wishlistPersistedReducer = persistReducer(
  wishlistPersistConfig,
  wishlistReducer
);


export const store = configureStore({
  reducer: {
    cart: cartPersistedReducer,
    wishlist: wishlistPersistedReducer,
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);