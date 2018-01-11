const Song = require('./Song');

const Playlist = `
  type Playlist {
    id: Int
    name: String
    songs: [Song!]!
  }
`;

module.exports = [Playlist, ...Song];
