import React from 'react';
import MessageList from "./MessageList";
import MessageDetail from "./MessageDetail";
import "./css/HomeScreen.css";
import axios from 'axios'; 
import _ from 'lodash';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {messages: [], data: null}
    this.componentWillMount = this.componentWillMount.bind(this);
}

myCallbackParent = (dataFromChild) => {
  this.setState({ data: dataFromChild });
  console.log('CHECK 3');
  console.log(dataFromChild);
};

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
    var message;
    if(this.state.data != null){
      message = <MessageDetail id={this.state.data.id}
      from={this.state.data.from}
      createdDate={this.state.data.createdDate}
      subject={this.state.data.subject}
      body={this.state.data.body}
      tag={this.state.data.tag}
      />  
    }
    else{
      message = <p id='welcome'>Welcome!</p>;
    }
    console.log(message);
    return(
      <div className="Home">
        <div className="Left scrollbar" id="scroll">
        <MessageList messages = {this.state.messages} 
                          username = {this.state.username}
                          renderParent = {() => {
                            this.setState({messages: []});
                            this.componentWillMount();
                          }}
                          callbackFromParent={this.myCallbackParent}

          />
        </div>
        <div className="Right">
          {message}
        </div>
      </div>
    )
  }
}
  
  export default HomeScreen;
