import React from 'react';
import MessageList from "./MessageList";
//import "./css/HomeScreen.css";
import axios from 'axios'; 
import _ from 'lodash';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {messages: []}
    this.componentWillMount = this.componentWillMount.bind(this);
}

  async submit() {
    var resp = await axios({
      method: 'get',
      url: "https://petcare-server.herokuapp.com/inboxes",
      params: {
           to: this.props.session._id, 
      }
    });
    console.log('USER ID IS: '+ this.props.session._id);
    console.log(resp);
    this.setState({ messages: resp.data});
  };

  componentWillMount() {
    this.submit();
  }

  render(){
    return(

      <div className="Home">
        <div className="Left">
        <MessageList messages = {this.state.messages} 
                          username = {this.state.username}
                          renderParent = {() => {
                            this.setState({messages: []});
                            this.componentWillMount()
                          }}

          />
        </div>
        <div className="Right">
        {/* Componente de vista de elemento  */ }
        </div>
      </div>
    )
  }
}
  
  export default HomeScreen;
