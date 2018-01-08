const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');

const SongType = require('./SongType');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
      type: SongType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },

      resolve(parentValue, args) {
        return axios
          .post('http://localhost:3000/songs', args)
          .then(res => res.data);
      },
    },
  },
});

module.exports = mutation;
