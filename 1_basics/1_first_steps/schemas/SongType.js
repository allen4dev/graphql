const graphql = require('graphql');

const LyricType = require('./LyricType');

const SongType = `
  type SongType {
    id: Int
    name: String
    lyrics: [LyricType]!
  }
`;

// const SongType = new GraphQLObjectType({
//   name: 'SongType',
//   fields: () => ({
//     // use GraphQLID instead
//     id: { type: GraphQLInt },
//     name: { type: GraphQLString },
//     lyrics: {
//       type: new GraphQLList(LyricType),

//       resolve(parentValue) {
//         return axios
//           .get(`http://localhost:3000/songs/${parentValue.id}/lyrics`)
//           .then(res => res.data);
//       },
//     },
//   }),
// });

module.exports = () => [SongType, LyricType];
