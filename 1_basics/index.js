const http = require('http');
const express = require('express');
const expressGraphQL = require('express-graphql');

const schema = require('./schemas/schema');

const app = express();
const server = http.createServer(app);

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  }),
);

server.listen(8080, () => console.log('Server running in port 8080'));
