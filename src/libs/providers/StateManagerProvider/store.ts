import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import AppReducer from './App.reducer'
import { signupApi } from '@/domains/Auth/Signup/Signup.services'
import { homeApi } from '@/domains/Home/Home.services'
import { adsApi } from '@/domains/Ads/Ads.services'

export const store = configureStore({
  reducer: {
    [signupApi.reducerPath]: signupApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [adsApi.reducerPath]: adsApi.reducer,

    app: AppReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: process.env.NODE_ENV === 'production',
      immutableCheck: process.env.NODE_ENV === 'production',
      thunk: true,
    }).concat(signupApi.middleware, homeApi.middleware, adsApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
