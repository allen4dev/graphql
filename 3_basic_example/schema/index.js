const axios = require('./../utils/axios');
const { makeExecutableSchema } = require('graphql-tools');

const Artist = require('./types/Artist');
const Album = require('./types/Album');
const Song = require('./types/Song');

const RootQuery = `
  type RootQuery {
    getArtist(id: Int!): Artist
    getAlbum(id: Int!): Album
    getSong(id: Int): Song
  }
`;

const resolvers = {
  RootQuery: {
    getArtist: (_, { id }) => {
      return axios.get(`/artists/${id}`).then(res => res.data);
    },
    getAlbum: (_, { id }) => {
      return axios.get(`/albums/${id}`).then(res => res.data);
    },

    getSong: (_, { id }) => {
      return axios.get(`/songs/${id}`).then(res => res.data);
    },
  },
  Album: {
    artist: parentValue => {
      return axios.get(`artists/${parentValue.artistId}`).then(res => res.data);
    },
  },

  Song: {
    artist: parentValue => {
      return axios.get(`artists/${parentValue.artistId}`).then(res => res.data);
    },
  },
};

const SchemaDefinition = `
  schema {
    query: RootQuery
  }  
`;

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, Artist, ...Album, ...Song],
  resolvers,
});

module.exports = schema;
