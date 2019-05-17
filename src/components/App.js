import React from 'react';

import LoadingScreen from "./LoadingScreen"
import HomeScreen from "./HomeScreen"
import LogInScreen from "./LogInScreen"
import NavigationBar from "./NavigationBar";

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

  loggedInHandler(session) {
    this.setState({loading: false, loggedIn: true, user: session});
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
      console.log(JSON.stringify(this.state.user));
      return (
      <div>
          <NavigationBar session={this.state.user} logout={this.notLoggedInHandler.bind(this)}/>
          <HomeScreen session={this.state.user}/>
      </div>
      );
    }
    if (!this.state.loggedIn) {
      return (
        <div>
          <LogInScreen loggedIn={this.loggedInHandler.bind(this)}/>
        </div>
      )
    }
  }
}

export default App;

