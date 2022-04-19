import { gql } from '@apollo/client';

export const whoami = gql`
query{
  whoami{
    firstName
    lastName
    email
  }
}
`