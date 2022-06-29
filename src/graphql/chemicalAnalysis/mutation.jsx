import { gql } from '@apollo/client';

export const CREATE_CHEMICAL_ANALYSIS = gql`
  mutation CreateChemicalAnalysis(
    $title: String!
    $description: String!
    $genre: String!
    $weight: Float!
    $size: Float!
    $age: Float!
    $RCB: Float!
    $RCT: Float!
    $activityFactor: Float!
    $injuryFactor: Float!
    $injuryFactorCode: String!
    $molecularDistribution: MolecularDistributionInput!
    $foodTimesJSON: String!
    $total: TotalResultInput!
    $adequacy: AdequacyInput!
  ) {
    CreateChemicalAnalysis(
      chemicalAnalysisData: {
        title: $title
        description: $description
        genre: $genre
        weight: $weight
        size: $size
        age: $age
        RCB: $RCB
        RCT: $RCT
        activityFactor: $activityFactor
        injuryFactor: $injuryFactor
        injuryFactorCode: $injuryFactorCode
        molecularDistribution: $molecularDistribution
        foodTimesJSON: $foodTimesJSON
        total: $total
        adequacy: $adequacy
      }
    ) {
      chemicalAnalysis {
        id
        title
      }
    }
  }
`;

export const UPDATE_CHEMICAL_ANALYSIS = gql`
  mutation UpdateChemicalAnalysis(
    $id: String!
    $title: String!
    $description: String!
    $genre: String!
    $weight: Float!
    $size: Float!
    $age: Float!
    $RCB: Float!
    $RCT: Float!
    $activityFactor: Float!
    $injuryFactor: Float!
    $injuryFactorCode: String!
    $molecularDistribution: MolecularDistributionInput!
    $foodTimesJSON: String!
    $total: TotalResultInput!
    $adequacy: AdequacyInput!
  ) {
    UpdateChemicalAnalysis(
      chemicalAnalysisData: {
        id: $id
        title: $title
        description: $description
        genre: $genre
        weight: $weight
        size: $size
        age: $age
        RCB: $RCB
        RCT: $RCT
        activityFactor: $activityFactor
        injuryFactor: $injuryFactor
        injuryFactorCode: $injuryFactorCode
        molecularDistribution: $molecularDistribution
        foodTimesJSON: $foodTimesJSON
        total: $total
        adequacy: $adequacy
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
  mutation DeleteChemicalAnalysis($id: ID!) {
    DeleteChemicalAnalysis(id: $id) {
      chemicalAnalysis {
        title
      }
    }
  }
`;
