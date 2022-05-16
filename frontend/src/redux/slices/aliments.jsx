import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../graphql/index';
import { GET_ALIMENTS } from '../../graphql/query';

export const getAliments = createAsyncThunk('aliments/getAliments', async () => {
  const response = await client.query({query: GET_ALIMENTS})
  return response.data.allAliments
})


export const alimentsSlice = createSlice({
  name: 'aliments',
  initialState: {
    searchedAlimentList: [],
    alimentList: [],
    loadingAlimentsList: false
  },
  reducers: {
    updateSearchedAlimentList: (state, action) => {
      state.searchedAlimentList = action.payload
    },
    updateAlimentList: (state, action) => {
      state.alimentList = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAliments.pending, (state, action) => {
        state.loadingAlimentsList = true;
      })
      .addCase(getAliments.fulfilled, (state, action) => {
        state.loadingAlimentsList = false;
        state.alimentList = action.payload
      })
      .addCase(getAliments.rejected, (state, action) => {
        state.loadingAlimentsList = false;
      })
  }
})

export const {
  updateSearchedAlimentList,
} = alimentsSlice.actions

export default alimentsSlice.reducer