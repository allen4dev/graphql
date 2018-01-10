const axios = require('axios');
const { makeExecutableSchema } = require('graphql-tools');

const Artist = require('./types/Artist');
const Album = require('./types/Album');

const RootQuery = `
  type RootQuery {
    getArtist(id: Int!): Artist
    getAlbum(id: Int!): Album
  }
`;

const resolvers = {
  RootQuery: {
    getArtist: (_, { id }) => {
      return axios
        .get(`http://localhost:3000/artists/${id}`)
        .then(res => res.data);
    },
    getAlbum: (_, { id }) => {
      return axios
        .get(`http://localhost:3000/albums/${id}`)
        .then(res => res.data);
    },
  },
  Album: {
    artist: parentValue => {
      return axios
        .get(`http://localhost:3000/artists/${parentValue.artistId}`)
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
  typeDefs: [SchemaDefinition, RootQuery, Artist, ...Album],
  resolvers,
});

module.exports = schema;
