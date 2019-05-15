import React from 'react';
import _ from 'lodash';

class LoadingScreen extends React.Component {

    componentDidMount() {
        this.getLocalStorageSession();
    }

    async getLocalStorageSession() {
        var session = await localStorage.getItem("session");
        if (_.isNull(session)) this.props.notLoggedIn();
        else this.props.loggedIn(session);
    }

    render() {
      return (<div>Loading...</div>);
    }
  }
  
  export default LoadingScreen;
