import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppReducerInitialStateType } from './StateManagerProvider.types'

const initialState: AppReducerInitialStateType = {
  isDark: true,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsDark: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload
    },
  },
})

export const { setIsDark } = slice.actions
export default slice.reducer
