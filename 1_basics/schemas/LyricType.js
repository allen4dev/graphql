const graphql = require('graphql');
const axios = require('axios');

const SongType = require('./SongType');

const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const LyricType = new GraphQLObjectType({
  name: 'LyricType',
  fields: {
    id: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      type: SongType,

      resolve(parentValue) {
        return axios
          .get(`http://localhost:3000/songs/${parentValue.songId}`)
          .then(res => res.data);
      },
    },
  },
});

module.exports = LyricType;
