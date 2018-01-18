module.exports = {
  artists: [
    {
      id: 1,
      name: 'Artist Name',
      description: 'Artist Name is a random artist',
    },
    {
      id: 2,
      name: 'Artist name 2',
      description: 'Artist Name is a random artist 2',
    },
  ],
  albums: [
    {
      id: 1,
      name: 'Artist 1 album',
      artistId: 1,
      songIds: [1, 3],
    },
  ],
  songs: [
    {
      id: 1,
      name: 'Song name 1',
      artistId: 1,
    },
    {
      id: 2,
      name: 'Song name 2',
      artistId: 1,
    },
    {
      id: 3,
      name: 'Song name 3',
      artistId: 1,
    },
    {
      id: 4,
      name: 'Song name 4',
      artistId: 2,
    },
  ],
  playlists: [
    {
      id: 1,
      name: 'Playlist name',
      songIds: [1, 2],
    },
  ],
};
