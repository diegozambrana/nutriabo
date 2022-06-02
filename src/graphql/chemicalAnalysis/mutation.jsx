import { gql } from '@apollo/client';

export const CREATE_CHEMICAL_ANALYSIS = gql`
  mutation {
    CreateChemicalAnalysis(
      chemicalAnalysisData: {
        title: "Test from Another 6"
        description: "description"
        genre: "M"
        weight: 80.0
        size: 170
        age: 32
        RCB: 1500
        RCT: 1800
        activityFactor: 1.2
        injuryFactor: 1.4
        injuryFactorCode: "ac"
        molecularDistribution: {
          protein: { percent: 15, KCAL: 35, GR: 35 }
          lipid: { percent: 15, KCAL: 35, GR: 35 }
          carbohydrates: { percent: 15, KCAL: 35, GR: 35 }
          total: { percent: 15, KCAL: 35, GR: 35 }
        }
        foodTimesJSON: "{test:1}"
        total: {
          calcio: 13.0
          ceniza: 13.0
          choTotal: 13.0
          energia: 13.0
          fibraCruda: 13.0
          fosforo: 13.0
          grasa: 13.0
          hierro: 13.0
          humedad: 13.0
          niacina: 13.0
          proteina: 13.0
          riboflav: 13.0
          tiamina: 13.0
          vintaminaC: 13.0
          vitaminaA: 13.0
        }
        adequacy: { proteina: 100, grasa: 100, energia: 100, choTota: 100 }
      }
    ) {
      chemicalAnalysis {
        id
        title
      }
    }
  }
`;

export const DELETE_CHEMICAL_ANALYSIS = gql`
  mutation {
    DeleteChemicalAnalysis(id: "db1694a2-0bbb-4a20-b7ee-155f14f0ba37") {
      chemicalAnalysis {
        title
      }
    }
  }
`;
