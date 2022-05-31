import { configureStore } from '@reduxjs/toolkit';
import dietReducer from './slices/diet';
import userReducer from './slices/user';
import alimentsReducer from './slices/aliments';

export default configureStore({
  reducer: {
    diet: dietReducer,
    user: userReducer,
    aliment: alimentsReducer,
  },
});
