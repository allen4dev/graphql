const axios = require('./../utils/axios');
const { makeExecutableSchema } = require('graphql-tools');

const Artist = require('./types/Artist');
const Album = require('./types/Album');
const Song = require('./types/Song');
const Playlist = require('./types/Playlist');

const RootQuery = `
  type RootQuery {
    getArtist(id: Int!): Artist
    getArtistAlbums(id: Int!): [Album]!
    getArtistSongs(id: Int!): [Song]!

    getAlbum(id: Int!): Album

    getSong(id: Int): Song

    getPlaylist(id: Int): Playlist
  }
`;

const Mutation = `
  type Mutation {
    createArtist(name: String!, description: String!): Artist
    updateArtist(id: Int!, name: String, description: String): Artist
    deleteArtist(id: Int!): Artist

    createSong(name: String!, artistId: Int!): Song
    updateSong(id: Int!, name: String!): Song
    deleteSong(id: Int!): Song

    createAlbum(name: String!, artistId: Int!, songIds: [Int] = []): Album
    updateAlbum(id: Int!, name: String!): Album
    deleteAlbum(id: Int!): Album
    addAlbumSong(id: Int!, songId: Int!): Album
    deleteAlbumSong(id: Int!, songId: Int!): Album

    createPlaylist(name: String!, songIds: [Int] = []): Playlist
    updatePlaylist(id: Int!, name: String!): Playlist
    deletePlaylist(id: Int!): Playlist
    addPlaylistSong(id: Int!, songId: Int!): Playlist
    deletePlaylistSong(id: Int!, songId: Int!): Playlist
  }
`;

const resolvers = {
  RootQuery: {
    getArtist: (_, { id }) => {
      return axios.get(`/artists/${id}`).then(res => res.data);
    },
    getArtistAlbums: (_, { id }) => {
      return axios.get(`/artists/${id}/albums`).then(res => res.data);
    },
    getArtistSongs: (_, { id }) => {
      return axios.get(`/artists/${id}/songs`).then(res => res.data);
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
    updateArtist: (_, { id, ...rest }) => {
      return axios.patch(`/artists/${id}`, { ...rest }).then(res => res.data);
    },
    deleteArtist: (_, { id }) => {
      return axios
        .get(`/artists/${id}`)
        .then(res => res.data)
        .then(deleted => axios.delete(`/artists/${id}`).then(() => deleted));
    },

    createSong: (_, args) => {
      return axios.post('/songs', args).then(res => res.data);
    },
    updateSong: (_, { id, name }) => {
      return axios.patch(`/songs/${id}`, { name }).then(res => res.data);
    },
    deleteSong: (_, { id }) => {
      return axios
        .get(`/songs/${id}`)
        .then(res => res.data)
        .then(deleted => axios.delete(`/songs/${id}`).then(() => deleted));
    },

    createAlbum: (_, args) => {
      return axios.post('/albums', args).then(res => res.data);
    },
    updateAlbum: (_, { id, name }) => {
      return axios.patch(`/albums/${id}`, { name }).then(res => res.data);
    },
    deleteAlbum: (_, { id }) => {
      return axios
        .get(`/albums/${id}`)
        .then(res => res.data)
        .then(deleted => axios.delete(`/albums/${id}`).then(() => deleted));
    },
    addAlbumSong: (_, { id, songId }) => {
      return axios
        .get(`/albums/${id}`)
        .then(res => res.data)
        .then(album => {
          const exists = album.songIds.indexOf(songId);

          if (exists !== -1) return album;

          return axios
            .patch(`/albums/${id}`, {
              songIds: [...album.songIds, songId],
            })
            .then(res => res.data);
        });
    },
    deleteAlbumSong: (_, { id, songId }) => {
      return axios
        .get(`/albums/${id}`)
        .then(res => res.data)
        .then(album => album.songIds.filter(itemId => itemId !== songId))
        .then(newSongList =>
          axios.patch(`/albums/${id}`, { songIds: newSongList })
        )
        .then(res => res.data);
    },

    createPlaylist: (_, args) => {
      return axios.post('/playlists', args).then(res => res.data);
    },
    updatePlaylist: (_, { id, name }) => {
      return axios.patch(`/playlists/${id}`, { name }).then(res => res.data);
    },
    deletePlaylist: (_, { id }) => {
      return axios
        .get(`/playlists/${id}`)
        .then(res => res.data)
        .then(deleted => axios.delete(`/playlists/${id}`).then(() => deleted));
    },
    addPlaylistSong: (_, { id, songId }) => {
      return axios
        .get(`/playlists/${id}`)
        .then(res => res.data)
        .then(playlist => {
          const exists = playlist.songIds.indexOf(songId);

          if (exists !== -1) return playlist;

          return axios
            .patch(`/playlists/${id}`, {
              songIds: [...playlist.songIds, songId],
            })
            .then(res => res.data);
        });
    },
    deletePlaylistSong: (_, { id, songId }) => {
      return axios
        .get(`/playlists/${id}`)
        .then(res => res.data)
        .then(playlist => playlist.songIds.filter(itemId => itemId !== songId))
        .then(newSongList =>
          axios.patch(`/playlists/${id}`, { songIds: newSongList })
        )
        .then(res => res.data);
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
