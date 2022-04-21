import { gql } from '@apollo/client';

export const TOKEN_AUTH = gql`
mutation TokenAuth($email: String!, $password: String!) {
  tokenAuth(email: $email, password: $password) {
    token
    refreshToken
    payload
    refreshExpiresIn
  }
}
`;

export const VERIFY_TOKEN = gql`
mutation VerifyToken($token: String!) {
  verifyToken(token: $token) {
    payload
  }
}
`;

export const REFRESH_TOKEN = gql`
mutation RefreshToken($token: String!) {
  refreshToken(token: $token) {
    token
    payload
    refreshExpiresIn
  }
}
`;

export const CREATE_USER = gql`
mutation CreateUser($email: String!, $password: String!, $firstName: String!, $lastName: String!){
  createUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName){
    token
    refreshToken
  }
}
`;