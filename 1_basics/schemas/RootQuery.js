const graphql = require('graphql');
const axios = require('axios');

const SongType = require('./SongType');

const { GraphQLObjectType, GraphQLList } = graphql;

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    songs: {
      type: new GraphQLList(SongType),

      resolve() {
        return axios.get('http://localhost:3000/songs');
      },
    },
  },
});

module.exports = Query;
