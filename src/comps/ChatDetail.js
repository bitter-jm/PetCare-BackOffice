import React, { Component } from "react";
import "./css/MessageDetail.css"
import 'moment-timezone';
import axios from 'axios'; 
import _ from 'lodash';
import 'react-chat-elements/dist/main.css';
import { MessageList } from 'react-chat-elements';

class ChatDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: "",
      other: "",
      messages: [],
    };

  }
  
  componentWillMount() {
    this.updateMessages();
  }

  updateMessages() {
    if (this.props.other == this.state.other) return
    this.setState({me:this.props.me, other:this.props.other});
    this.getMessages();
  }

  async getMessages() {
    var resp = await axios({
      method: 'get',
      url: "https://petcare-server.herokuapp.com/chats",
      params: {}
    });
    var data = resp.data;
    var indicesAEliminar = [];

    data.forEach((m, i) => {
      if ((m.from.email != this.state.me) && (m.to.email != this.state.me)) {
        indicesAEliminar.push(i);

      }
      if ((m.from.email != this.state.other) && (m.to.email != this.state.other)) {
        indicesAEliminar.push(i);
      }
    })
    
    for (var i = indicesAEliminar.length-1; i >= 0; --i) {
      data.splice(indicesAEliminar[i],1);
    }

    var messages = data.map((m) => {
      var position = "left";
      if (m.from.email == this.state.me) position = "right";
      return {
        position: position,
        type: "text",
        text: m.text,
        date: new Date(m.createdDate),
        key: Math.random(),
      };
    })
    this.setState({messages});
  }


  render() {

    this.updateMessages();
    return (

      <div style={{}}>
        <div style={{padding:"30px"}}>


        <MessageList
          className='message-list'
          lockable={true}
          toBottomHeight={'100%'}
          dataSource={this.state.messages} />

        </div>
  
      </div>
      );
  }
}

export default ChatDetail;
