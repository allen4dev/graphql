const http = require('http');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors')

const schema = require('./schema');

const app = express();
const server = http.createServer(app);

app.use(
  '/graphql',
  cors(),
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

server.listen(8080, () => console.log('Server running in port 8080'));
