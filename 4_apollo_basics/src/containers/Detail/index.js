import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import query from './../../queries/getArtist';

class Detail extends Component {
  render() {
    const { getArtist, loading, error } = this.props.data;

    if (loading) return <h1>Loading...</h1>;
    if (error) return <pre>{JSON.stringify(error, undefined, 2)}</pre>;

    return (
      <section className="Detail">
        <h2 className="Detail-title">{getArtist.name}</h2>
        <p className="Detail-description">{getArtist.description}</p>
      </section>
    );
  }
}

export default graphql(query, {
  options: ({ match: { params } }) => ({
    // variables: { id: Number(params.id) },
    variables: { id: params.id },
  }),
})(Detail);
