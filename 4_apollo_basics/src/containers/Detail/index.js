import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Detail extends Component {
  render() {
    const { Artist, loading, error } = this.props.data;

    if (loading) return <h1>Loading...</h1>;
    if (error) return <pre>{JSON.stringify(error, undefined, 2)}</pre>;

    return (
      <section className="Detail">
        <h2 className="Detail-title">{Artist.name}</h2>
        <p className="Detail-description">{Artist.description}</p>
      </section>
    );
  }
}

const query = gql`
  query Artist($id: ID!) {
    Artist(id: $id) {
      id
      name
      description
    }
  }
`;

export default graphql(query, {
  options: ({ match: { params } }) => ({
    variables: { id: params.id },
  }),
})(Detail);
