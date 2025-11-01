import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/authReducer";
import { clearAuthDetails } from "./reducers/authReducer";
import { jwtDecode } from "jwt-decode";
import sequenceReducer from "./reducers/sequenceReducer";

const tokenExpirationMiddleware = (store) => (next) => (action) => {
  if(action.type === clearAuthDetails().type){
    return next(action);
  }
  const authToken = localStorage.getItem("token");
  if (authToken) {
    const decodedToken = jwtDecode(authToken);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      store.dispatch(clearAuthDetails());
    }
  }
  return next(action);
};
const persistConfig = {
  key: "root",
  storage,
};

const rootReducers = combineReducers({
  authReducer:authReducer,
  sequence:sequenceReducer,
});

const persistedReducers = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(tokenExpirationMiddleware),
  reducer: persistedReducers,
});

export const persistor = persistStore(store);
