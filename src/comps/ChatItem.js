import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/MessageItem.css"
import Moment from 'react-moment';
import 'moment-timezone';
import axios from 'axios'; 
import _ from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
class ChatItem extends Component {
	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	};
	handleDelete(event) {
		event.preventDefault();
		console.log(this.props.userA +'  ' + this.props.userB);
    let props = this.props;
    this.deleteItem(props);
  }

	async deleteItem(props){
			var resp = await axios({
				method: 'put',
				url: "https://petcare-server.herokuapp.com/chats",
				params: {
					userAId: props.userA,
					userBId: props.userB,
				}
			});
	}
	
  render() {
		const date = <Moment fromNow date={this.props.date}/>
		console.log(this.props.userA +'  ' + this.props.userB);
    return (	
			
    	<div className="msg">
    		<div className="firstRow">
					<p className="chatListComp chatList-name">{this.props.user}</p>
				<img src={this.props.photo} style={{width:"60px", height:"60px", borderRadius: "10px"}} />
					<IconButton aria-label="Delete" onClick={this.handleDelete}>
						<DeleteIcon fontSize="small" />
					</IconButton>
					<p className="chatListComp chatList-msg">Last message: {this.props.message}</p>
    			<p className="chatListComp chatList-date">Received {date}</p>
    		</div>				
    	</div>
			
    );
  }
}

export default ChatItem;
