import gql from 'graphql-tag';

export default gql`
  query GetArtists {
    getArtists {
      id
      name
      description
    }
  }
`;
