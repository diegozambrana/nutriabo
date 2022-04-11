import { configureStore } from '@reduxjs/toolkit';
import dietReducer from './slices/diet';

export default configureStore({
  reducer: {
    diet: dietReducer
  },
})