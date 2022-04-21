import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { API_DOMAIN } from '../utils/constants';
import { getAccess } from '../utils/helpers'

const httpLink = createHttpLink({uri: `${API_DOMAIN}/graphql`,});

const authLink = setContext((_, { headers }) => {
  const token = getAccess();
  return {
    headers: {
      ...headers,
      'Authorization': token ? `Bearer ${token}` : "",
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
