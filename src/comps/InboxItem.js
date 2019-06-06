import React, { Component } from "react";
import axios from 'axios'; 
import _ from 'lodash';
import { Dropdown } from 'semantic-ui-react'
import Moment from 'react-moment';
import 'moment-timezone';
class MessageItem extends Component {
	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleBlock = this.handleBlock.bind(this);
	};

	someFn = () => {
		this.props.callbackFromParent(this.props);
		console.log('CHECK 1');
		console.log(this.props);
	};

	handleDelete(event) {
		event.preventDefault();
		console.log(this.props.userA +'  ' + this.props.userB);
		let props = this.props;
		this.deleteItem(props);
  	};

	async deleteItem(props){
		var resp = await axios({
			method: 'delete',
			url: "https://petcare-server.herokuapp.com/inboxes",
			params: {
				userId: this.props.session._id
			},
			data:{
				side: 'to'
			}
		});
	};

	handleBlock(event) {
		if(this.props.session.hiddenUsers.indexOf(this.props.otherId) > -1) {
			event.preventDefault();
			console.log(this.props.userA +'  ' + this.props.userB);
			let props = this.props;
			this.unblockUser(props);
		} else {
			event.preventDefault();
			console.log(this.props.userA +'  ' + this.props.userB);
			let props = this.props;
			this.blockUser(props);
		}
  	}

	async blockUser(props){
		var resp = await axios({
			method: 'put',
			url: "https://petcare-server.herokuapp.com/user/"+props.session._id+"/block",
			data:{
				userId: props.otherId
			}
		});
	}

	async unblockUser(props){
		var resp = await axios({
			method: 'put',
			url: "https://petcare-server.herokuapp.com/user/"+props.session._id+"/unblock",
			data:{
				userId: props.otherId
			}
		});
	}
	

  render() {
		let date = <Moment fromNow date={this.props.createdDate}/>
		let blockText = 'Block User';
		//console.log(this.props.session._id);
		//console.log(this.props.session.hiddenUsers);
		if(this.props.session.hiddenUsers.indexOf(this.props.otherId) > -1) blockText = 'Unblock User';

		let menu = <Dropdown text=''>
		<Dropdown.Menu>
			<Dropdown.Item text='Delete Chat' onClick={(e)=>this.handleDelete(e)} />
			<Dropdown.Item text={blockText} onClick={(e)=>this.handleBlock(e)}/>
		</Dropdown.Menu>
		</Dropdown>;

    return (	
    	<div className="msgItem" onClick={this.someFn}>
				<div style={{display:"flex", flexDirection: "row", marginTop:"10px", color:"#202020", fontSize:17}}>
					<img src={this.props.fromPhoto} style={{width:"60px", height:"60px", borderRadius: "10px"}} />
					<div style={{display:"flex", flexDirection: "column", justifyContent: "space-evenly", marginLeft: "20px"}}>
						<p style={{fontWeight:"bold"}}>{this.props.fromName}</p>
						<p style={{fontWeight:"bold"}}>{this.props.from}</p>
					</div>
					<div style={{display:"flex", flexDirection: "column", justifyContent: "space-evenly", marginLeft: "20px"}}>
						{menu}
					</div>
				</div>

				<div style={{marginTop:"10px", marginBottom: "10px"}}>
					<div className="secondRow">
						<p className="title">{this.props.subject}</p>
					</div>

					<div className="messageContent" style={{marginTop:"6px"}}>{this.props.body}</div>

				</div>

				<div style={{display: "flex", flexDirection: "row-reverse"}}>
					<p style={{fontStyle:"italic", fontWeight:"bold"}}>Received {date}</p>
				</div>
    	</div>
			
    );
  }
}

export default MessageItem;
