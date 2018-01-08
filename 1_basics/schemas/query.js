const graphql = require('graphql');
const axios = require('axios');

const SongType = require('./SongType');
const LyricType = require('./LyricType');

const { GraphQLObjectType, GraphQLList, GraphQLInt } = graphql;

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getSong: {
      type: SongType,
      args: { id: { type: GraphQLInt } },

      resolve(parentValue, { id }) {
        return axios
          .get(`http://localhost:3000/songs/${id}`)
          .then(res => res.data);
      },
    },

    songs: {
      type: new GraphQLList(SongType),

      resolve() {
        return axios.get('http://localhost:3000/songs').then(res => res.data);
      },
    },

    lyrics: {
      type: new GraphQLList(LyricType),

      resolve() {
        return axios.get('http://localhost:3000/lyrics').then(res => res.data);
      },
    },
  },
});

module.exports = query;
