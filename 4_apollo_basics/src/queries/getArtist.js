import gql from 'graphql-tag';

export default gql`
  query GetArtist($id: Int!) {
    getArtist(id: $id) {
      id
      name
      description
    }
  }
`;
