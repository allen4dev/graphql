const { makeExecutableSchema } = require('graphql-tools');

const RootQuery = `
  type RootQuery {
    getDummieText(text: String!): String
  }
`;

const resolvers = {
  RootQuery: {
    getDummieText: (parentValue, { text }) => {
      return text;
    },
  },
};

const SchemaDefinition = `
  schema {
    query: RootQuery
  }  
`;

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery],
  resolvers,
});

module.exports = schema;
