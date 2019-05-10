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
      user: null,
    };
  }

  notLoggedInHandler() {
    this.setState({loading: false, loggedIn: false});
  }

  loggedInHandler(User) {
    this.setState({loading: false, loggedIn: true, user: User});
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingScreen 
          notLoggedIn={this.notLoggedInHandler.bind(this)}
          loggedIn={this.loggedInHandler.bind(this)}/>
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
