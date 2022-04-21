import { configureStore } from '@reduxjs/toolkit';
import dietReducer from './slices/diet';
import userReducer from './slices/user';

export default configureStore({
  reducer: {
    diet: dietReducer,
    user: userReducer,
  },
})