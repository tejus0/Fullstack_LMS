import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist';
import studentReducer from './dataSlice';
import funcReducer from './tableFunc';
import authReducer from './authSlice';

// Combine your reducers
const rootReducer = combineReducers({
  data: studentReducer,
  func: funcReducer,
  auth: authReducer
});

// Configure persist settings
const persistConfig = {
  key: 'root',           
  storage,               
  whitelist: ['auth']    
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Avoid issues with non-serializable values in the state
    }),
});


export const persistor = persistStore(store);
export default store;
