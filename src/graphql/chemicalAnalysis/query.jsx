import { gql } from '@apollo/client';

export const GET_CHEMICAL_ANALYSIS_LIST = gql`
  query {
    getChemicalAnalysisList {
      id
      title
    }
  }
`;

export const GET_CHEMICAL_ANALYSIS_BY_ID = gql`
  query GetChemicalAnalysisById($id: String!) {
    getChemicalAnalysisById(id: $id) {
      id
      title
      description
      genre
      weight
      size
      age
      RCB
      RCT
      activityFactor
      injuryFactor
      injuryFactorCode
      mdProteinPercent
      mdProteinKCAL
      mdProteinGR
      mdLipidsPercent
      mdLipidsKCAL
      mdLipidsGR
      mdCarbohydratesPercent
      mdCarbohydratesKCAL
      mdCarbohydratesGR
      mdTotalPercent
      mdTotalKCAL
      mdTotalGR
      foodTimesJSON
      totalEnergia
      totalHumedad
      totalProteina
      totalGrasa
      totalChoTotal
      totalFibraCruda
      totalCeniza
      totalCalcio
      totalFosforo
      totalHierro
      totalVitaminaA
      totalTiamina
      totalRiboflav
      totalNiacina
      totalVintaminaC
      adequacyEnergia
      adequacyGrasa
      adequacyProteina
      adequacyChoTotal
      createdAt
      updatedAt
    }
  }
`;
