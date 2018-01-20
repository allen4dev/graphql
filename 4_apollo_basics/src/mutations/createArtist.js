import gql from 'graphql-tag';

export default gql`
  mutation CreateArtist($name: String!, $description: String!) {
    createArtist(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;
