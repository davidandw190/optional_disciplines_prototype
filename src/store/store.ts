import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { announcementsApi } from '../api/announcements/announcementsApi';
import { electiveDisciplinesApi } from '../api/elective-disciplines/electiveDisciplinesApi';
import { enrollmentPeriodsApi } from '../api/enrollmentPeriods/enrollmentPeriodsApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import themeReducer from '../features/sidebar/slices/theme.slice';

const rootReducer = combineReducers({
  theme: themeReducer,
  [electiveDisciplinesApi.reducerPath]: electiveDisciplinesApi.reducer,
  [enrollmentPeriodsApi.reducerPath]: enrollmentPeriodsApi.reducer,
  [announcementsApi.reducerPath]: announcementsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      electiveDisciplinesApi.middleware,
      enrollmentPeriodsApi.middleware,
      announcementsApi.middleware
    ),
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        electiveDisciplinesApi.middleware,
        enrollmentPeriodsApi.middleware,
        announcementsApi.middleware
      ),
    preloadedState,
  });
};

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
