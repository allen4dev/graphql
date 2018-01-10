const axios = require('axios');
const { makeExecutableSchema } = require('graphql-tools');

const Artist = require('./types/Artist');

const RootQuery = `
  type RootQuery {
    getArtist(id: Int!): Artist
  }
`;

const resolvers = {
  RootQuery: {
    getArtist: (_, { id }) => {
      return axios
        .get(`http://localhost:3000/artists/${id}`)
        .then(res => res.data);
    },
  },
};

const SchemaDefinition = `
  schema {
    query: RootQuery
  }  
`;

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, Artist],
  resolvers,
});

module.exports = schema;
