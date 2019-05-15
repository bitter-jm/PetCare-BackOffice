import React, { Component } from "react";
import MessageItem from "./MessageItem";
import "./css/messageList.css"
class messageList extends Component {

  render() {
    return (
      <div className="container">
        <table className="table">
          <tbody>
            {this.props.messages.map((message) => {
              return(
                <MessageItem rank={this.props.messages.indexOf(message) + 1}
                              key={message.id}
                              id={message.id}
                              from={message.from}
                              createdDate={message.createdDate}
                              subject={message.subject}
                              body={message.body}
                              tag={message.tag}
                              usernameLogged = {this.props.username}
                              useridLogged = {this.props.userid}
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