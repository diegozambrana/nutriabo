import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  fromPromise,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { API_DOMAIN } from '../utils/constants';
import { getAccess, getRefresh, setAccess, cleanToken } from '../utils/helpers';
import { REFRESH_TOKEN } from './mutation';

let isRefreshing = false;
let pendingRequests = [];
const TOKEN_REQUIRED_MSG = [
  'Authentication Failure: Your must be signed in',
  'Error decoding signature',
];

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback());
  pendingRequests = [];
};

const httpLink = createHttpLink({ uri: `${API_DOMAIN}/graphql` });

/* eslint-disable no-use-before-define */
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (
      graphQLErrors?.filter((g) => TOKEN_REQUIRED_MSG.includes(g?.message))
        .length > 0
    ) {
      const refresh = getRefresh();
      if (refresh) {
        let forward$;
        if (!isRefreshing) {
          isRefreshing = true;
          forward$ = fromPromise(
            client
              .mutate({
                mutation: REFRESH_TOKEN,
                variables: { refreshToken: refresh },
              })
              .then((response) => {
                const newToken = response.data?.refreshToken?.token;
                if (newToken) {
                  setAccess(newToken);
                  resolvePendingRequests();
                } else {
                  cleanToken();
                }
                return newToken;
              })
              .catch((error) => {
                pendingRequests = [];
                if (
                  !window.location.pathname.includes('login') &&
                  !window.location.pathname.includes('register')
                ) {
                  window.location.href = '/login';
                }
                cleanToken();
                return error;
              })
              .finally(() => {
                isRefreshing = false;
              }),
          ).filter((value) => Boolean(value));
        } else {
          forward$ = fromPromise(
            new Promise((resolve) => {
              pendingRequests.push(() => resolve());
            }),
          );
        }
        return forward$.flatMap(() => forward(operation));
      }
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
    return null;
  },
);

const authLink = setContext((_, { headers }) => {
  const token = getAccess();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
