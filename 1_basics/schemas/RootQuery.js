const graphql = require('graphql');
const axios = require('axios');

const SongType = require('./SongType');
const LyricType = require('./LyricType');

const { GraphQLObjectType, GraphQLList } = graphql;

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
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

module.exports = Query;
