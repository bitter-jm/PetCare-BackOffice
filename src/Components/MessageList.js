import React, { Component } from "react";
import MessageItem from "./MessageItem";
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
        <table className="table">
          <tbody>
            {this.props.messages.map((message) => {
              return(
                <MessageItem  id={message.id}
                              from={message.from.email}
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
    );
  }
}
export default messageList;