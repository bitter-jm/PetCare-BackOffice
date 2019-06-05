import React, { Component } from "react";
import ChatItem from "./ChatItem";
import SearchUsers from "./SearchUsers";
import axios from 'axios';  
import "./css/MessageList.css"
import socketIOClient from "socket.io-client";

class chatList extends Component {
//HACER CSS DE BACKGROUND

constructor(props) {
  super(props);
  this.state = {
    lastMessages: [],
    lastUpdated: "",
  };
  
  
  this.handleConversations = this.handleConversations.bind(this);
}

async updateList() {
  this.loadUsersTalkedTo(this.props);
}

myCallbackSearch = (dataFromChild) => {
  this.props.callbackFromParentSearch(dataFromChild);
  console.log('CHECK HALF');
  console.log(dataFromChild);
};

myCallback = (me, other, userA, userB) => {
  this.props.callbackFromParent({me: me, other: other, meId:userA, otherId:userB});
  //console.log({me: me, other: other});
};

  componentWillMount() {
    this.handleConversations();
  }

  componentDidMount(){
    this.socket = socketIOClient('https://petcare-server.herokuapp.com');
      this.socket.emit('identification', this.props.sessionId);
    this.socket.on("messageReceived", () => {console.log('HOLA HOLA PROBANDO');this.handleConversations();});
  }

  handleConversations() {
    let props = this.props;
    console.log(this.props.sessionId);
    this.loadUsersTalkedTo(props);
  }

  async loadUsersTalkedTo(props) {
    console.log(props.sessionId);
    var resp = await axios({
      method: 'get',
      url: "https://petcare-server.herokuapp.com/chats",
      params:{
        userA: props.sessionId
      }
    });
    var datos = resp.data;
    var indicesAEliminar = [];
    console.log(datos);
    datos.forEach((m, i) => {
      if ((m.from.email != this.props.me) && (m.to.email != this.props.me)) {
        indicesAEliminar.push(i);
      }
    })
    
    for (var i = indicesAEliminar.length-1; i >= 0; --i) {
      datos.splice(indicesAEliminar[i],1);
    }

    var usersChated = []; //! ------------------------------------------------
    var other;
    datos.forEach((msg => {
      
      if (msg.to.email != this.props.me){
        other = msg.to.email;
      }
      else if (msg.from.email != this.props.me){
        other = msg.from.email;
      } 
      if (!usersChated.includes(other)) usersChated.push(other);
    }));

    var lastMessages = []; //! ------------------------------------------------
    var photo,userA,userB;
    usersChated.forEach((user) => {
      var message = "";
      var lastDate;
      var pendingCount = 0;
      datos.forEach((msg => {
        if (msg.to.email == user || msg.from.email == user) {
          if(msg.from.email ==user){
            photo = msg.from.userPicture;
            userA = msg.to._id;
            userB = msg.from._id;
            if(msg.read == false) pendingCount++;
          } 
          if(msg.to.email == user){
            photo = msg.to.userPicture;
            userA = msg.from._id;
            userB = msg.to._id; 
          }
          var newDate = new Date(msg.createdDate);
          if (!(newDate < lastDate)) {
            message = msg.text;
            lastDate = newDate;
          }
          
        }
      }));
      console.log(userA +'  ' + userB);
      lastMessages.push({date:lastDate, message, user, photo, userA, userB, pendingCount});
    });
    console.log(lastMessages);
    lastMessages.sort(function(a, b) {
      return new Date(b['date']) - new Date(a['date']);
    });
    this.setState({lastMessages});
  }

  render() {

    if (this.state.lastUpdated != this.props.lastUpdated) {
      this.setState({lastUpdated: this.props.lastUpdated});
      this.updateList();
    }

    return (
      <div className="container">
        
      <div style={{backgroundColor:"#337ab7", color: "white", fontWeight: "bold", display:"flex"}}>
        <div style={{backgroundColor: "#2e5d94", padding: "10px", textAlign: "center", flex:1}}>
          Messages
        </div>
        <div style={{padding: "10px", textAlign: "center", flex:1}}
          onClick={() => this.props.changeToInbox()}>
          Inbox
        </div>
      </div>
      <div style={{width:"100%"}}>
        <SearchUsers 
          sessionId ={this.props.sessionId}
          callbackFromParent={this.myCallbackSearch}
          >
        </SearchUsers>
      </div>
      <div className="bar" id="scroll">
        <table className="table">
          <tbody>
            {this.state.lastMessages.map((message) => {
              return(
                <div onClick={() => this.myCallback(this.props.me, message.user,message.userA, message.userB)}>
                <ChatItem  user={message.user}
                              message={message.message}
                              date={message.date}
                              photo={message.photo}
                              userA={message.userA}
                              userB={message.userB}
                              pendingCount={message.pendingCount}
                />
                </div>
              )}
            )}
          </tbody>
        </table>
      </div>
      </div>
    );
  }
}
export default chatList;
