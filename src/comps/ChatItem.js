import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/MessageItem.css"
import Moment from 'react-moment';
import 'moment-timezone';
class ChatItem extends Component {
	
  render() {
		console.log(this.props.user);
		const date = <Moment fromNow date={this.props.date}/>
    return (	
    	<div className="msg">
    		<div className="firstRow">
				<img src={this.props.photo} style={{width:"60px", height:"60px", borderRadius: "10px"}} />
    			<p className="chatListComp chatList-name">{this.props.user}</p>
					<p className="chatListComp chatList-msg">Last message: {this.props.message}</p>
    			<p className="chatListComp chatList-date">Received {date}</p>
    		</div>				
    	</div>
			
    );
  }
}

export default ChatItem;
