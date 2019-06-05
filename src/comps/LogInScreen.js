import React from 'react';
import _ from 'lodash';
import axios from 'axios'; 
import "./css/LoginScreen.css";
import GoogleLoginButton from "./GoogleAuth/GoogleLoginButton";


class LogInScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      correo: "",
      password: "",
    };
  }

  myCallbackParent = (dataFromChild) => {
    console.log('CHECK 3');
    console.log(dataFromChild.mail);
    this.setState({correo: dataFromChild.mail});
    this.submit();
  }

  async submit() {
    var resp = await axios({
      method: 'post',
      url: "https://petcare-server.herokuapp.com/users",
      data: {
          email: this.state.correo,
      }
    });
    console.log(resp);
    localStorage.setItem("session", JSON.stringify(resp.data));
    this.props.loggedIn(resp.data);
  }

  render() {
    return (
      
      <body>
        <div class="back"></div>
      <div class="form-login">
        <form action="">
          <h1>Petcare Desktop App</h1>
          <GoogleLoginButton
          callbackFromParent={this.myCallbackParent}
         />
          <div type="link">
            <a href="#" >Download the mobile version!</a>
            
          </div>
        </form>
      </div>
    </body>
    );
  }
}

export default LogInScreen;
