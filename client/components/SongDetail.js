import React, { Component } from "react";
import { graphql } from "react-apollo";
import fetchSong from "../queries/fetchSong";

class SongDetail extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h3>SONG DETAIL!</h3>
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
