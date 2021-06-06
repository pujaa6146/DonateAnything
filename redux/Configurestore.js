import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
// import storage from "redux-persist/es/storage";
import { auth } from "./Auth";
// import { login } from "./Login";
import thunk from "redux-thunk";
import logger from "redux-logger";
import AsyncStorage from "@react-native-async-storage/async-storage";

const config = {
  key: "root",
  storage: AsyncStorage,
  debug: true,
};

export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      auth,
    }),
    applyMiddleware(thunk, logger)
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
