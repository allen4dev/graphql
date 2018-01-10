const Song = require('./Song');
const Lyric = require('./Lyric');

const RootQuery = `
  type RootQuery {
    getSong(id: Int!): Song
    getLyric(id: Int!): Lyric
    getSongLyrics(id: Int!): [Lyric]!
  }
`;

module.exports = RootQuery;
