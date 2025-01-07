import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import {userApiSlice} from "./slices/usersApiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApiSlice.middleware),
});

export default store;
