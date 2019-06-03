import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/MessageItem.css"
import Moment from 'react-moment';
import 'moment-timezone';
import axios from 'axios'; 
import _ from 'lodash';
import { Dropdown } from 'semantic-ui-react'
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

	menu = <Dropdown text='File'>
						<Dropdown.Menu>
							<Dropdown.Item text='Delete Chat' />
							<Dropdown.Item text='Block User' />
						</Dropdown.Menu>
					</Dropdown>;

  render() {
		const date = <Moment fromNow date={this.props.date}/>
		console.log(this.props.userA +'  ' + this.props.userB);
    return (	

			<div className="msg" onClick={this.someFn}>
				<div style={{display:"flex", flexDirection: "row", marginTop:"10px", color:"#202020", fontSize:17}}>
					<img src={this.props.photo} style={{width:"60px", height:"60px", borderRadius: "10px"}} />
					<div style={{display:"flex", flexDirection: "column", justifyContent: "space-evenly", marginLeft: "10px"}}>
						<p style={{fontWeight:"bold"}}>{this.props.user}</p>
						{this.menu}
					</div>
				</div>

				<div style={{marginTop:"10px", marginBottom: "10px"}}>
					<div className="secondRow">
						<p className="title">{this.props.subject}</p>
					</div>

					<p className="chatListComp chatList-msg">Last message: {this.props.message}</p>

				</div>

				<div style={{display: "flex", flexDirection: "row-reverse"}}>
					<p style={{fontStyle:"italic", fontWeight:"bold"}}>Received {date}</p>
				</div>
    	</div>
			
			
    );
  }
}

export default ChatItem;
