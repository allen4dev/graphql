const axios = require('./../utils/axios');
const { makeExecutableSchema } = require('graphql-tools');

const Artist = require('./types/Artist');
const Album = require('./types/Album');
const Song = require('./types/Song');
const Playlist = require('./types/Playlist');

const RootQuery = `
  type RootQuery {
    getArtist(id: Int!): Artist
    getAlbum(id: Int!): Album
    getSong(id: Int): Song
    getPlaylist(id: Int): Playlist
  }
`;

const Mutation = `
  type Mutation {
    createArtist(name: String!, description: String!): Artist
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

    getPlaylist: (_, { id }) => {
      return axios.get(`/playlists/${id}`).then(res => res.data);
    },
  },

  Mutation: {
    createArtist: (_, args) => {
      return axios.post('/artists', args).then(res => res.data);
    },
  },

  Album: {
    artist: parentValue => {
      return axios
        .get(`/artists/${parentValue.artistId}`)
        .then(res => res.data);
    },

    songs: parentValue => {
      const promises = parentValue.songIds.map(id =>
        axios.get(`/songs/${id}`).then(res => res.data)
      );

      return promises;
    },
  },

  Song: {
    artist: parentValue => {
      return axios
        .get(`/artists/${parentValue.artistId}`)
        .then(res => res.data);
    },
  },

  Playlist: {
    songs: parentValue => {
      const promises = parentValue.songIds.map(id =>
        axios.get(`/songs/${id}`).then(res => res.data)
      );

      return promises;
    },
  },
};

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: Mutation
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    RootQuery,
    Mutation,
    Artist,
    ...Album,
    ...Song,
    ...Playlist,
  ],
  resolvers,
});

module.exports = schema;
