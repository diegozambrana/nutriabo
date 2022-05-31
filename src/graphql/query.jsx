import { gql } from '@apollo/client';

export const WHOAMI = gql`
  query {
    whoami {
      firstName
      lastName
      email
    }
  }
`;

export const GET_ALIMENTS = gql`
  query {
    allAliments {
      nombre
      codigo
    }
  }
`;

export const SEARCH_ALIMENT = gql`
  query SearchAliment($search: String!) {
    searchAliment(search: $search) {
      nombre
      codigo
    }
  }
`;

export const GET_ALIMENT_BY_CODE = gql`
  query GetAlimentByCode($code: String!) {
    getAlimentByCode(codigo: $code) {
      codigo
      nombre
      categoria {
        codigo
        grupoCategoria
      }
      energia
      humedad
      proteina
      grasa
      choTotal
      fibraCruda
      ceniza
      calcio
      fosforo
      hierro
      vitaminaA
      tiamina
      riboflav
      niacina
      vintaminaC
    }
  }
`;

export const GET_CATEGORIES = gql`
  query {
    allCategories {
      codigo
      grupoCategoria
    }
  }
`;
