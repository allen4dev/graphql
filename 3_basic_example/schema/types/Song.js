const Artist = require('./Artist');

const Song = `
  type Song {
    id: Int
    name: String
    artist: Artist
  }
`;

module.exports = [Song, Artist];
