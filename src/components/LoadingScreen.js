import React from 'react';
import _ from 'lodash';

class LoadingScreen extends React.Component {

    componentDidMount() {
        this.getLocalStorageSession();
    }

    async getLocalStorageSession() {
        var session = await localStorage.getItem("session");
        if (_.isNull) this.props.notLoggedIn();
        else this.props.loggedIn();
    }

    render() {
      return (<div>Loading...</div>);
    }
  }
  
  export default LoadingScreen;
