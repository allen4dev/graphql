const axios = require('axios');
const { makeExecutableSchema } = require('graphql-tools');

const Lyric = require('./Lyric');

const RootQuery = require('./query');
const Mutation = require('./mutation');

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: Mutation
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

  Mutation: {
    addSong: (parentValue, { name }) => {
      return axios
        .post(`http://localhost:3000/songs`, { name })
        .then(res => res.data);
    },

    addLyric: (parentValue, { content, songId }) => {
      return axios
        .post(`http://localhost:3000/lyrics`, { content, songId })
        .then(res => res.data);
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, Mutation, ...Lyric],
  resolvers,
});

module.exports = schema;
