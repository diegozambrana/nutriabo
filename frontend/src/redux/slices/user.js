import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    inProgress: true,
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload
    },
    setInProgress: (state, action) => {
      state.inProgress = action.payload;
    }
  },
})

export const {
  updateUser,
  setInProgress,
} = userSlice.actions

export default userSlice.reducer