import { gql } from '@apollo/client';

export const WHOAMI = gql`
query{
  whoami{
    firstName
    lastName
    email
  }
}
`