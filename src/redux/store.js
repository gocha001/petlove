import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { friendsReducer } from "./friends/friendsSlice";
import { newsReducer } from "./news/newsSlice";
import { noticesReducer } from "./notices/noticesSlice";
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

const authPersistorConfig = {
  key: "auth",
  storage,
};

const noticesPersistorConfig = {
  key: "notices",
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistorConfig, authReducer),
    friends: friendsReducer,
    news: newsReducer,
    notices: persistReducer(noticesPersistorConfig, noticesReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
