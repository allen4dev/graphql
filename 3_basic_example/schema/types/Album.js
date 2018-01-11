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
// "songIds": [4, 5, 6]

module.exports = [Album, Artist, ...Song];
