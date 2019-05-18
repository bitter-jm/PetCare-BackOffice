import React, { Component } from "react";
import ChatItem from "./ChatItem";
import "./css/MessageList.css"
class chatList extends Component {
//HACER CSS DE BACKGROUND


myCallback = (dataFromChild) => {

  this.props.callbackFromParent(dataFromChild);
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
                <ChatItem  id={message.auxId}
                              from={message.from.email}
                              to={message.to.email}
                              createdDate={message.createdDate}
                              text={message.text}
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
export default chatList;