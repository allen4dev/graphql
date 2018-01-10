const http = require('http');
const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./schema');

const app = express();
const server = http.createServer(app);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

server.listen(8080, () => console.log('Server running in port 8080'));
