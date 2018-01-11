const Artist = require('./Artist');
const Song = require('./Song');

const Album = `
  type Album {
    id: Int
    name: String
    artist: Artist
    songs: [Album]!
  }
`;

module.exports = [Album, Artist, ...Song];
