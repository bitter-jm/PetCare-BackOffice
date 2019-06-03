import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { convertGoogleToken } from "./GoogleAuthActions.js"
import { Redirect } from 'react-router-dom'

export default class GoogleLoginButton extends Component {
  constructor(props) {
    super(props);
    this.state={
      redirect: false
    }
    this.signIn = this.signIn.bind(this);
  }

  signIn(resp) {
    if (resp === "google") {
      this.setState({redirect: true})
    }
  }
  

  render (){
    if (this.state.redirect) {
   
    }
    const responseGoogleSuccess = (response) => {
    console.log(response);
    console.log(response.profileObj);
    console.log(response.profileObj.email);
    this.props.callbackFromParent({mail:response.profileObj.email});


    convertGoogleToken(response.Zi.access_token);
    this.signIn('google')
  }

  const responseGoogleFailure =  (response) => {
    console.log(response);
  }

    return (
      <GoogleLogin
        clientId='422549574036-esohefm99abqg4doop6v3o6f6dv36rs4.apps.googleusercontent.com'
        buttonText="Login with Google"
        onSuccess={responseGoogleSuccess}
        onFailure={responseGoogleFailure}
        prompt="select_account"
        className="loginBtn loginBtn--google"
        cookiePolicy={'single_host_origin'}
      />
    );
  }
};