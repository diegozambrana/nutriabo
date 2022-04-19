import { client } from './index'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

export const useAuth = () => {
  const getToken = async () => {
    console.log(`-------> getToken`)
    const response = client.mutate({
      mutation: gql`
        mutation {
          tokenAuth(email:"test@mail.com",password:".qwer1234") {
            token
            payload
            refreshExpiresIn
          }
        }
      `
    });
    console.log(`response`, response)
  }
  return {getToken}
}