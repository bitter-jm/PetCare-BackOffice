import React from 'react';
import _ from 'lodash';
import axios from 'axios'; 

class LogInScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      correo: "",
      password: "",
    };
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
      <div>
        <p>Correo:</p>
        <input onChange={(event) => this.setState({correo: event.target.value})} type='text' value={this.state.correo} />
        <p>Contraseña:</p>
        <input onChange={(event) => this.setState({password: event.target.value})} type='password' value={this.state.password} style={{display:"block"}}/>
        <button onClick={this.submit.bind(this)}>Login</button>
      </div>
    );
  }
}

export default LogInScreen;

/*

{
  email: correo
}

*/