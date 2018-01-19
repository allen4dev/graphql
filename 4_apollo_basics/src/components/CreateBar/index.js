import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import uuid from 'uuid';

import './index.css';

class CreateBar extends Component {
  state = {
    name: '',
    description: '',
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props
      .mutate({
        variables: {
          id: uuid(),
          name: this.state.name,
          description: this.state.description,
        },
      })
      .then(() => this.setState({ name: '', description: '' }));
  };

  render() {
    return (
      <form className="CreateBar" onSubmit={this.handleSubmit}>
        <div>
          <input
            className="CreateBar-input"
            type="text"
            placeholder="My random artist"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <textarea
            className="CreateBar-textarea"
            placeholder="My artist description"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />

          <button>Submit</button>
        </div>
      </form>
    );
  }
}

const mutation = gql`
  mutation CreateArtist($id: ID!, $name: String!, $description: String!) {
    createArtist(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export default graphql(mutation)(CreateBar);
