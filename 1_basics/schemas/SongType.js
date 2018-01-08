const graphql = require('graphql');

const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const SongType = new GraphQLObjectType({
  name: 'SongType',
  fields: {
    // use GraphQLID instead
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  },
});

module.exports = SongType;
