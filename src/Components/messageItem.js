import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/MessageItem.css"
import Moment from 'react-moment';
import 'moment-timezone';
class MessageItem extends Component {

  render() {
		const date = <Moment fromNow date={this.props.createdDate}/>
    return (	
    	<div className="msg">
    		<div className="firstRow">
    			<p className="">{this.props.from}</p>
    			<p className="from">{date}</p>
    		</div>
    		<div className="secondRow">
    			<p className="title">Información de reserva {this.props.subject}</p>
    		</div>
        <div className="thirdRow">
    			<div>
		    		<span className="messageContent">Content:{this.props.body}</span>
    			</div>
    		</div>
    	</div>
    );
  }
}

export default MessageItem;