const express = require('express');
const axios = require('axios');
const graphqlHTTP = require('express-graphql');

const schema = require('./schema');

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(8080, () => console.log('Server running in port 8080'));
