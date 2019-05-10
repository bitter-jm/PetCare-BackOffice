import React from 'react';
import _ from 'lodash';
import axios from 'axios'; 

class LogInScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      correo: "",
    };
  }

  render() {
    return (
      <div>
        <input onChange={(event) => this.setState({correo: event.target.value})} type='text' value={this.state.correo}/>
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