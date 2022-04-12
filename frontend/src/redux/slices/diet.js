import { createSlice } from '@reduxjs/toolkit'

export const dietSlice = createSlice({
  name: 'diet',
  initialState: {
    titleDiet: 'sin Titulo',
    foodTimes: [
      {
        name: 'Desayuno',
        aliments: [],
        total: {}
      }
    ],
  },
  reducers: {
    addFoodTime: (state, action) => {
      state.foodTimes.push({
        name: 'action.payload.name',
        aliments: [],
        total: {}
      })
    },
    updateNameFoodTime: (state, action) => {
      const {index, value} = action.payload
      state.foodTimes[index].name = value;
    },
    addNewFood: (state, action) => {
      const {index, value} = action.payload
      state.foodTimes[index].aliments.push(value);
    },
    updateFood: (state, action) => {
      const { index, indexFood, value} = action.payload
      state.foodTimes[index].aliments[indexFood] = value
    },
    removeFood: (state, action) => {
      const {index} = action.payload;
      state.foodTimes.aliments.splice(index, 1);
    },
    updateTitle: (state, action) => {
      state.titleDiet = action.payload;
    }
  },
})

export const {
  addFoodTime,
  updateNameFoodTime,
  addNewFood,
  updateFood,
  removeFood,
  updateTitle
} = dietSlice.actions

export default dietSlice.reducer