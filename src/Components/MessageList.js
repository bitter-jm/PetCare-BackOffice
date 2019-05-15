import React, { Component } from "react";
import MessageItem from "./MessageItem";
//import "./css/messageList.css"
class messageList extends Component {

  render() {
    console.log('MSG: '+this.props.messages);
    return (
      <div className="container">
        <table className="table">
          <tbody>
            {this.props.messages.map((message) => {
              return(
                <MessageItem  key={message.id}
                              id={message.id}
                              from={message.from.email}
                              createdDate={message.createdDate}
                              subject={message.subject}
                              body={message.body}
                              tag={message.tag}
                              renderParent = {this.props.renderParent}
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