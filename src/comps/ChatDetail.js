import React, { Component } from "react";
import "./css/MessageDetail.css"
import 'moment-timezone';
import axios from 'axios'; 
import _ from 'lodash';
import 'react-chat-elements/dist/main.css';
import { MessageBox, MessageList } from 'react-chat-elements';

class ChatDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: "mariogamarro97@gmail.com",
      other: "joan3pastor@gmail.com",
      messages: [],
    };

  }
  
  componentWillMount() {
    if (!_.isUndefined(this.props.me)) this.setState({me:this.props.me, other:this.props.other});
    console.log("Cargado");
    this.getMessages();
  }

  async getMessages() {
    var resp = await axios({
      method: 'get',
      url: "https://petcare-server.herokuapp.com/chats",
      params: {}
    });
    var data = resp.data;

    data.forEach((m, i) => {
      if ((m.from.email != this.state.me) && (m.to.email != this.state.me)) {
        data.splice(i, 1);
      }
      if ((m.from.email != this.state.other) && (m.to.email != this.state.other)) {
        data.splice(i, 1);
      }
    })
    
    var messages = data.map((m) => {
      var position = "left";
      if (m.from.email == this.state.me) position = "right";
      return {
        position: position,
        type: "text",
        text: m.text,
        date: new Date(m.createdDate),
      };
    })

    console.log(messages);
    this.setState({messages});
  }


  render() {
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
