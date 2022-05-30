import { createSlice } from '@reduxjs/toolkit';
import { TOTAL_INIT } from '../../utils';
import { calculateMolecularCalc } from '../../utils/handlers';

const SUGGESTED_NAMES = [
  'Desayuno',
  'Merienda Media Mañana',
  'Almuerzo',
  'Merienda Media Tarde',
  'Cena',
]

export const dietSlice = createSlice({
  name: 'diet',
  initialState: {
    titleDiet: 'sin Titulo',
    descriptionDiet: 'Lorem impsum',
    
    // Cálculo molecular calórica
    molecularCalc:  calculateMolecularCalc({
      genre: 'M',
      weight: 78,
      size: 170,
      age: 32,
      RCT: 0,
      RCB: 0,
    }),

    activityFactor: null,
    injuryFactor: {value: null, code: null},

    // distribución molecular calorica
    molecularDistribution: {
      protein: {
        percent: 0,
        KCAL: 0,
        GR: 0
      },
      lipids: {
        percent: 0,
        KCAL: 0,
        GR: 0
      },
      carbohydrates: {
        percent: 0,
        KCAL: 0,
        GR: 0
      },
      total: {
        percent: 0,
        KCAL: 0,
        GR: 0
      },
    },

    foodTimes: [
      {
        name: 'Desayuno',
        aliments: [],
        total: {...TOTAL_INIT}
      }
    ],
    total: {...TOTAL_INIT},
    adequacy: {
      energia: 0,
      grasa: 0,
      proteina: 0,
      choTotal: 0,
    }
  },
  reducers: {
    addFoodTime: (state, action) => {
      state.foodTimes.push({
        name: SUGGESTED_NAMES[state.foodTimes.length] || 'Sin nombre',
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
    },
    updateMolecularCalc: (state, action) => {
      state.molecularCalc = action.payload
    },
    updateMolecularDistribution: (state, action) => {
      state.molecularDistribution = action.payload
    },
    updateAdequacy: (state, action) => {
      state.adequacy = action.payload
    },
    updateActivityFactor: (state, action) => {
      state.activityFactor = action.payload;
    },
    updateInjuryFactor: (state, action) => {
      state.injuryFactor = action.payload;
    },
  },
})

export const {
  addFoodTime,
  updateNameFoodTime,
  addNewFood,
  updateFood,
  removeFood,
  updateTitle,
  updateDescription,
  updateMolecularCalc,
  updateMolecularDistribution,
  updateAdequacy,
  updateActivityFactor,
  updateInjuryFactor
} = dietSlice.actions

export default dietSlice.reducer