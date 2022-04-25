import { createSlice } from '@reduxjs/toolkit';
import { TOTAL_INIT } from '../../utils';

export const dietSlice = createSlice({
  name: 'diet',
  initialState: {
    titleDiet: 'sin Titulo',
    descriptionDiet: 'Lorem impsum',
    foodTimes: [
      {
        name: 'Desayuno',
        aliments: [],
        total: {...TOTAL_INIT}
      }
    ],
    total: {...TOTAL_INIT}
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
      dietSlice.caseReducers.updateTotalTimeFood(state, action);
    },
    removeFood: (state, action) => {
      const {index, indexFood} = action.payload;
      state.foodTimes[index].aliments.splice(indexFood, 1);
      dietSlice.caseReducers.updateTotalTimeFood(state, action);
    },
    updateTitle: (state, action) => {
      state.titleDiet = action.payload;
    },
    updateDescription: (state, action) => {
      state.descriptionDiet = action.payload
    },
    updateTotalTimeFood: (state, action) => {
      const { index } = action.payload;
      state.foodTimes[index].total = state.foodTimes[index].aliments.reduce(
        (res, aliment) => {
          Object.keys(TOTAL_INIT).forEach(key => {
            res[key] = res[key] + (aliment[key] ? parseFloat(aliment[key]) : 0)
          })
          return res
        }, {...TOTAL_INIT}
      )
      dietSlice.caseReducers.updateTotal(state);
    },
    updateTotal: (state) => {
      state.total = state.foodTimes.reduce(
        (res, foodTime) => {
          Object.keys(TOTAL_INIT).forEach(key => {
            res[key] = res[key] + (foodTime.total[key] ? parseFloat(foodTime.total[key]) : 0)
          })
          return res
        }, {...TOTAL_INIT}
      )
    }
  },
})

export const {
  addFoodTime,
  updateNameFoodTime,
  addNewFood,
  updateFood,
  removeFood,
  updateTitle,
  updateDescription
} = dietSlice.actions

export default dietSlice.reducer