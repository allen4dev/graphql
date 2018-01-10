const Artist = require('./Artist');

const Album = `
  type Album {
    id: Int
    name: String
    artist: Artist
  }
`;
// "songIds": [4, 5, 6]

module.exports = [Album, Artist];
