import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
//making gql requests and storing the data
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
// passing in an empty config object because apollo is friendly out of the box..makes assumptions of where you're making requests e.g. "/graphql"
// dataIdFromObject -  o === object.  this config takes every piece of data we take from the backend and runs it through this function
//  the result of the function is used to identify the data in the apollo store
//  apollo doesn't want to automatically assume that every piece of data has an id (maybe you didn't add it)
//  ** this means we have to ask for an ID to be returned for every query we make
//  this helps ensure that when queries are run the appropriate elements are rerendered
//  using this cached data reduces the # of request to the backend (no need to refetch data after a mutation/query)
const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

import "./style/style.css";

// Components
import App from "./components/App";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
