const Song = require('./Song');
const Lyric = require('./Lyric');

const Mutation = `
  type Mutation {
    addSong(name: String!): Song
    addLyric(content: String!, songId: Int!): Lyric
  }
`;

module.exports = Mutation;
