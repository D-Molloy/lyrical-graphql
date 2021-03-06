import React, { Component } from "react";
import { graphql } from "react-apollo";
import fetchSong from "../queries/fetchSong";
import { Link } from "react-router";

import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";
class SongDetail extends Component {
  render() {
    const { song } = this.props.data;

    if (!song) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

// #  QUERIES ARE EXECUTED AUTOMATICALLY BY GQL
// #  MUTATIONS ARE CALLED MANUALLY -this.props.mutate
// graphql is 100% aware of all the props getting passed to the component
export default graphql(fetchSong, {
  options: props => {
    return { variables: { id: props.params.id } };
  }
})(SongDetail);
