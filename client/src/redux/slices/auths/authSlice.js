import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currUser: null,  
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrUser: (state, action) => {
      state.currUser = action.payload; 
    },
    clearCurrUser: (state) => {
      state.currUser = null;  
    },
  },
});

export const { setCurrUser, clearCurrUser } = authSlice.actions;

export default authSlice.reducer;
