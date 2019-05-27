import React, { Component } from "react";
import ChatItem from "./ChatItem";
import axios from 'axios';  
import "./css/MessageList.css"
class chatList extends Component {
//HACER CSS DE BACKGROUND

constructor(props) {
  super(props);
  this.state = {
    lastMessages: [],
  };
  this.handleConversations = this.handleConversations.bind(this);
}

myCallback = (me, other) => {
  this.props.callbackFromParent({me: me, other: other});
  //console.log({me: me, other: other});
};

  componentWillMount() {
    this.handleConversations();
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
      datos.forEach((msg => {
        if (msg.to.email == user || msg.from.email == user) {
          if(msg.from.email ==user){
            photo = msg.from.userPicture;
            userA = msg.to._id;
            userB = msg.from._id;
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
      lastMessages.push({date:lastDate, message, user, photo, userA, userB});
    });
    console.log(lastMessages);
    this.setState({lastMessages});
  }

  render() {
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
        <table className="table">
          <tbody>
            {this.state.lastMessages.map((message) => {
              return(
                <div onClick={() => this.myCallback(this.props.me, message.user)}>
                <ChatItem  user={message.user}
                              message={message.message}
                              date={message.date}
                              photo={message.photo}
                              userA={message.userA}
                              userB={message.userB}
                />
                </div>
              )}
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
export default chatList;
