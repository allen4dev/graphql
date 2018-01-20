import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { toIdValue } from 'apollo-utilities';

import App from './App';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

const cache = new InMemoryCache({
  cacheResolvers: {
    Query: {
      getArtist: (_, { id }) =>
        toIdValue(cache.config.dataIdFromObject({ __typename: 'Artist', id })),
    },
  },
});

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:8080/graphql' }),
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
