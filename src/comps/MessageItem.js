import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/MessageItem.css"
import Moment from 'react-moment';
import 'moment-timezone';
class MessageItem extends Component {
	

	someFn = () => {
		this.props.callbackFromParent(this.props);
		console.log('CHECK 1');
		console.log(this.props);
};



  render() {
		const date = <Moment fromNow date={this.props.createdDate}/>
    return (	
    	<div className="msg" onClick={this.someFn}>
    		<div className="firstRow">
    			<p className="">From: {this.props.from}</p>
    			<p className="from">Received {date}</p>
    		</div>
    		<div className="secondRow">
    			<p className="title">{this.props.subject}</p>
    		</div>
        <div className="thirdRow">
    			<div>
		    		<span className="messageContent">{this.props.body}</span>
    			</div>
    		</div>
				
    	</div>
			
    );
  }
}

export default MessageItem;
