import React, { Component } from "react";
import "./css/ChatDetail.css"
import 'moment-timezone';
import axios from 'axios'; 
import _ from 'lodash';
import 'react-chat-elements/dist/main.css';
import { MessageBox, MessageList,Input, Button  } from 'react-chat-elements';
import socketIOClient from "socket.io-client";

class ChatDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: "",
      other: "",
      meId: "",
      otherId: "",
      messages: [],
      newMessage: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({newMessage: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let state = this.state;
    this.submit(state);
  }

  _handleKeyDown(e){
    console.log('JELOU');
    console.log(e.key);
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }

  async mark(){
    console.log('HE ENTRAU');
    var resp = await axios({
      method: 'put',
      url: "https://petcare-server.herokuapp.com/chat/mark",
      data: {
        userA: this.props.meId,
        userB: this.props.otherId,
      }
    });
    
    //console.log(resp.data);
    this.props.updateChatList();
    console.log('HE ACABAU');
  }

  componentDidMount(){
    this.socket = socketIOClient('https://petcare-server.herokuapp.com');
    this.socket.emit('identification', this.state.meId);
    this.socket.on("messageReceived", () => {console.log('HOLA HOLA PROBANDO');this.getMessages();});
  }

  async submit(){
    this.socket = socketIOClient('https://petcare-server.herokuapp.com');
    var resp = await axios({
      method: 'post',
      url: "https://petcare-server.herokuapp.com/chats",
      data: {
        from: this.props.meId,
        to: this.props.otherId,
        text: this.state.newMessage,
      }
    });
    
    this.getMessages();
    this.socket.emit("messageSent", this.state.otherId);
    this.props.updateChatList();
  }
  
  componentWillMount() {
    if (this.props.other == null || this.props.me ==null) return ;
    this.updateMessages();
    const { endpoint } = this.state;
    
    
  }

  updateMessages() {
    if (this.props.other == this.state.other) return
    this.setState({me:this.props.me, other:this.props.other});
    this.getMessages();
    this.mark();
  }

  async getMessages() {
    console.log('INICIO');
    console.log(this.props.meId);
    var resp = await axios({
      method: 'get',
      url: "https://petcare-server.herokuapp.com/chats",
      params: {
        userA:this.props.meId,
        userB:this.props.otherId
      }
    });
    var data = resp.data;
    console.log(data);
    //console.log('Messages: '+data);
    var indicesAEliminar = [];
    this.refs.input.clear();
    // data.forEach((m, i) => {
    //   if ((m.from.email != this.state.me) && (m.to.email != this.state.me)) {
    //     indicesAEliminar.push(i);

    //   }
    //   if ((m.from.email != this.state.other) && (m.to.email != this.state.other)) {
    //     indicesAEliminar.push(i);
    //   }
    // })
    
    // for (var i = indicesAEliminar.length-1; i >= 0; --i) {
    //   data.splice(indicesAEliminar[i],1);
    // }

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
    
    console.log('FIN');
  }
  

  render() {
    if (this.props.other == null || this.props.me ==null) return <div />;
    var list = "";
    console.log("IDs: " + this.props.meId + " - " + this.props.otherId);
    if(this.state.messages != null){
      list = <MessageList
      className='message-list'
      lockable={true}
      downButton={true}
      downButtonBadge={true}
      dataSource={this.state.messages} />
    }
    
    this.updateMessages();
    return (

      <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", height: "100%"}}>
        <div id="scroll" style={{padding:"30px", overflowY:"scroll", bottom:'5%'}}>
        {list}

        </div>
        
        <div style={{marginBottom:"15px"}}>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <Input
            placeholder="Type here..."
            multiline={false}
            ref="input"
            autofocus
            value={this.state.newMessage}
            onChange={this.handleChange}
            rightButtons={
              <Button
              type="submit"
                color='white'
                backgroundColor='black'
                text='Send'
                onClick={this.handleSubmit}
                
                />
            }
          />
          </form>
          </div>

      </div>
      );
  }
}

export default ChatDetail;

