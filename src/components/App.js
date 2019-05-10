import React from 'react';

import LoadingScreen from "./LoadingScreen"
import HomeScreen from "./HomeScreen"
import LogInScreen from "./LogInScreen"

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loggedIn: false,
    };
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingScreen />
      );
    }
    if (this.state.loggedIn) {
      return (
        <HomeScreen />
      );
    }
    if (!this.state.loggedIn) {
      return (
        <LogInScreen />
      )
    }
  }
}

export default App;
