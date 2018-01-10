const Song = require('./Song');

const Lyric = `
  type Lyric {
    id: Int
    content: String
    song: Song
  }
  `;

module.exports = [Lyric, Song];
