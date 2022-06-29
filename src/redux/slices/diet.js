import { createSlice } from '@reduxjs/toolkit';
import { TOTAL_INIT } from '../../utils';
import { calculateMolecularCalc } from '../../utils/handlers';

const SUGGESTED_NAMES = [
  'Desayuno',
  'Merienda Media Mañana',
  'Almuerzo',
  'Merienda Media Tarde',
  'Cena',
];

/* eslint-disable no-param-reassign */
export const dietSlice = createSlice({
  name: 'diet',
  initialState: {
    id: null,
    titleDiet: 'sin Titulo',
    descriptionDiet: 'Lorem impsum',

    // Cálculo molecular calórica
    molecularCalc: calculateMolecularCalc({
      genre: 'M',
      weight: 78,
      size: 170,
      age: 32,
      RCT: 0,
      RCB: 0,
    }),

    activityFactor: null,
    injuryFactor: { value: null, code: null },

    // distribución molecular calorica
    molecularDistribution: {
      protein: {
        percent: 0,
        KCAL: 0,
        GR: 0,
      },
      lipid: {
        percent: 0,
        KCAL: 0,
        GR: 0,
      },
      carbohydrates: {
        percent: 0,
        KCAL: 0,
        GR: 0,
      },
      total: {
        percent: 0,
        KCAL: 0,
        GR: 0,
      },
    },

    foodTimes: [
      {
        name: 'Desayuno',
        aliments: [],
        total: { ...TOTAL_INIT },
      },
    ],
    total: { ...TOTAL_INIT },
    adequacy: {
      energia: 0,
      grasa: 0,
      proteina: 0,
      choTotal: 0,
    },
  },
  reducers: {
    addFoodTime: (state) => {
      state.foodTimes.push({
        name: SUGGESTED_NAMES[state.foodTimes.length] || 'Sin nombre',
        aliments: [],
        total: {},
      });
    },
    updateNameFoodTime: (state, action) => {
      const { index, value } = action.payload;
      state.foodTimes[index].name = value;
    },
    addNewFood: (state, action) => {
      const { index, value } = action.payload;
      state.foodTimes[index].aliments.push(value);
    },
    updateFood: (state, action) => {
      const { index, indexFood, value } = action.payload;
      state.foodTimes[index].aliments[indexFood] = value;
      dietSlice.caseReducers.updateTotalTimeFood(state, action);
    },
    removeFood: (state, action) => {
      const { index, indexFood } = action.payload;
      state.foodTimes[index].aliments.splice(indexFood, 1);
      dietSlice.caseReducers.updateTotalTimeFood(state, action);
    },
    updateTitle: (state, action) => {
      state.titleDiet = action.payload;
    },
    updateDescription: (state, action) => {
      state.descriptionDiet = action.payload;
    },
    updateTotalTimeFood: (state, action) => {
      const { index } = action.payload;
      state.foodTimes[index].total = state.foodTimes[index].aliments.reduce(
        (res, aliment) => {
          Object.keys(TOTAL_INIT).forEach((key) => {
            res[key] += aliment[key] ? parseFloat(aliment[key]) : 0;
          });
          return res;
        },
        { ...TOTAL_INIT },
      );
      dietSlice.caseReducers.updateTotal(state);
    },
    updateTotal: (state) => {
      state.total = state.foodTimes.reduce(
        (res, foodTime) => {
          Object.keys(TOTAL_INIT).forEach((key) => {
            res[key] += foodTime.total[key]
              ? parseFloat(foodTime.total[key])
              : 0;
          });
          return res;
        },
        { ...TOTAL_INIT },
      );
    },
    updateMolecularCalc: (state, action) => {
      state.molecularCalc = action.payload;
    },
    updateMolecularDistribution: (state, action) => {
      state.molecularDistribution = action.payload;
    },
    updateAdequacy: (state, action) => {
      state.adequacy = action.payload;
    },
    updateActivityFactor: (state, action) => {
      state.activityFactor = action.payload;
    },
    updateInjuryFactor: (state, action) => {
      state.injuryFactor = action.payload;
    },
    updateId: (state, action) => {
      state.id = action.payload;
    },
    loadChemicalAnalysis: (state, action) => {
      state.id = action.payload.id;
      state.titleDiet = action.payload.title;
      state.descriptionDiet = action.payload.description;

      state.molecularCalc = {
        genre: action.payload.genre,
        weight: action.payload.weight,
        size: action.payload.size,
        age: action.payload.age,
        RCT: action.payload.RCT,
        RCB: action.payload.RCB,
      };

      state.activityFactor = action.payload.activityFactor;
      state.injuryFactor = {
        value: action.payload.injuryFactor,
        code: action.payload.injuryFactorCode,
      };

      state.molecularDistribution = {
        protein: {
          percent: action.payload.mdProteinPercent,
          KCAL: action.payload.mdProteinKCAL,
          GR: action.payload.mdProteinGR,
        },
        lipid: {
          percent: action.payload.mdLipidsPercent,
          KCAL: action.payload.mdLipidsKCAL,
          GR: action.payload.mdLipidsGR,
        },
        carbohydrates: {
          percent: action.payload.mdCarbohydratesPercent,
          KCAL: action.payload.mdCarbohydratesKCAL,
          GR: action.payload.mdCarbohydratesGR,
        },
        total: {
          percent: action.payload.mdTotalPercent,
          KCAL: action.payload.mdTotalKCAL,
          GR: action.payload.mdTotalGR,
        },
      };

      state.foodTimes = JSON.parse(action.payload.foodTimesJSON);
      state.total = {
        energia: action.payload.totalEnergia,
        humedad: action.payload.totalHumedad,
        proteina: action.payload.totalProteina,
        grasa: action.payload.totalGrasa,
        choTotal: action.payload.totalChoTotal,
        fibraCruda: action.payload.totalFibraCruda,
        ceniza: action.payload.totalCeniza,
        calcio: action.payload.totalCalcio,
        fosforo: action.payload.totalFosforo,
        hierro: action.payload.totalHierro,
        vitaminaA: action.payload.totalVitaminaA,
        tiamina: action.payload.totalTiamina,
        riboflav: action.payload.totalRiboflav,
        niacina: action.payload.totalNiacina,
        vintaminaC: action.payload.totalVintaminaC,
      };

      state.adequacy = {
        energia: action.payload.adequacyEnergia,
        grasa: action.payload.adequacyGrasa,
        proteina: action.payload.adequacyProteina,
        choTotal: action.payload.adequacyChoTotal,
      };
    },
  },
});

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
  updateInjuryFactor,
  updateId,
  loadChemicalAnalysis,
} = dietSlice.actions;

export default dietSlice.reducer;
