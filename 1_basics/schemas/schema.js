const graphql = require('graphql');

const query = require('./RootQuery');

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query,
});
