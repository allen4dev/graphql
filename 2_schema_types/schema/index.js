const axios = require('axios');
const { makeExecutableSchema } = require('graphql-tools');

const Song = require('./Song');
const Lyric = require('./Lyric');

const RootQuery = require('./query');

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

const resolvers = {
  RootQuery: {
    getSong: (parentValue, { id }) => {
      return axios
        .get(`http://localhost:3000/songs/${id}`)
        .then(res => res.data);
    },
    getLyric: (parentValue, { id }) => {
      return axios
        .get(`http://localhost:3000/lyrics/${id}`)
        .then(res => res.data);
    },
    getSongLyrics: (parentValue, { id }) => {
      return axios
        .get(`http://localhost:3000/songs/${id}/lyrics`)
        .then(res => res.data);
    },
  },

  Lyric: {
    song: parentValue => {
      return axios
        .get(`http://localhost:3000/songs/${parentValue.songId}`)
        .then(res => res.data);
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, ...Lyric],
  resolvers,
});

module.exports = schema;
