import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auths/authSlice'

export const store = configureStore({
  reducer: {
    auth : authReducer
  },
})