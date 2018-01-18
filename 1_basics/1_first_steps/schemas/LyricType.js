const graphql = require('graphql');

const SongType = require('./SongType');

const LyricType = `
  type LyricType {
    id: Int
    content: String
    song: SongType
  }
`;

// const LyricType = new GraphQLObjectType({
//   name: 'LyricType',
//   fields: () => ({
//     id: { type: GraphQLInt },
//     content: { type: GraphQLString },
//     song: {
//       type: require('./SongType'),

//       resolve(parentValue) {
//         return axios
//           .get(`http://localhost:3000/songs/${parentValue.songId}`)
//           .then(res => res.data);
//       },
//     },
//   }),
// });

module.exports = () => [LyricType, SongType];
