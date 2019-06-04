import React, { Component } from "react";
import MessageItem from "./InboxItem";
import "./css/MessageList.css"
class messageList extends Component {
//HACER CSS DE BACKGROUND


myCallback = (dataFromChild) => {

  this.props.callbackFromParent(dataFromChild);
  console.log('CHECK 2');
  console.log(dataFromChild);
};


  render() {
    console.log('MSG: '+this.props.messages);
    return (
      <div className="container">
      <div style={{backgroundColor:"#337ab7", color: "white", fontWeight: "bold", display:"flex"}}>
        <div style={{padding: "10px", textAlign: "center", flex:1}}
          onClick={() => this.props.changeToChat()}>
          Messages
        </div>
        <div style={{backgroundColor: "#2e5d94", padding: "10px", textAlign: "center", flex:1}}>
          Inbox
        </div>
      </div>
      <div className="bar" id="scroll">
        <table >
          <tbody>
            {this.props.messages.map((message) => {
              return(
                <MessageItem  id={message.auxId}
                              from={message.from.email}
                              to={message.to.email}
                              fromPhoto={message.from.userPicture}
                              fromName={message.from.name}
                              picture={message.auxField}
                              createdDate={message.createdDate}
                              subject={message.subject}
                              body={message.body}
                              tag={message.tag}
                              renderParent = {this.props.renderParent}
                              callbackFromParent={this.myCallback}
                />
              )}
            )}
          </tbody>
        </table>
      </div>
      </div>
    );
  }
}
export default messageList;