const express = require('express');
const axios = require('axios');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');

const app = express();

const typeDefs = `
  type Song {
    id: Int
    name: String
    lyrics: [Lyric]!
  }

  type Lyric {
    id: Int
    content: String
    song: Song
  }

  type Query {
    getSong(id: Int!): Song
    getLyric(id: Int!): Lyric
    getSongLyrics(id: Int!): [Lyric]!
  }
`;

const resolvers = {
  Query: {
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

  Song: {
    lyrics: parentValue => {
      return axios
        .get(`http://localhost:3000/songs/${parentValue.id}/lyrics`)
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

app.use(
  '/graphql',
  graphqlHTTP({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
    graphiql: true,
  })
);

app.listen(8080, () => console.log('Server running in port 8080'));
