import React, { Component } from "react";
import { Link, hashHistory } from "react-router";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
// queries
import query from "../queries/fetchSongs";

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  onSubmit(event) {
    event.preventDefault();
    // returns a promise
    this.props
      .mutate({
        variables: {
          title: this.state.title
        },
        // cause the apollo store refetch our song list and store it
        refetchQueries: [{ query }]
      })
      .then(() => hashHistory.push("/"));
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

// when we wrap a mutation, it adds this.props.mutate - it invokes the function tied to the component
// check onSubmit method
export default graphql(mutation)(SongCreate);
