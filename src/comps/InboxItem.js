import React, { Component } from "react";
import axios from 'axios'; 
import _ from 'lodash';
import { Dropdown } from 'semantic-ui-react'
import Moment from 'react-moment';
import 'moment-timezone';
class MessageItem extends Component {
	

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
  	}

	async deleteItem(props){
		var resp = await axios({
			method: 'put',
			url: "https://petcare-server.herokuapp.com/inboxes",
			params: {
				userAId: props.userA,
				userBId: props.userB,
			}
		});
	}

	handleBlock(event) {
		event.preventDefault();
		console.log(this.props.userA +'  ' + this.props.userB);
		let props = this.props;
		this.blockUser(props);
  	}

	async blockUser(props){
			var resp = await axios({
				method: 'put',
				url: "https://petcare-server.herokuapp.com/user/"+props.userA+"/block",
				data:{
					userId: props.userB

				}
			});
	}

	menu = <Dropdown text=''>
						<Dropdown.Menu>
							<Dropdown.Item text='Delete Chat' onClick={(e)=>this.handleDelete(e)} />
							<Dropdown.Item text='Block User' onClick={(e)=>this.handleBlock(e)}/>
						</Dropdown.Menu>
					</Dropdown>;

  render() {
		const date = <Moment fromNow date={this.props.createdDate}/>
    return (	
    	<div className="msg" onClick={this.someFn}>
				<div style={{display:"flex", flexDirection: "row", marginTop:"10px", color:"#202020", fontSize:17}}>
					<img src={this.props.fromPhoto} style={{width:"60px", height:"60px", borderRadius: "10px"}} />
					<div style={{display:"flex", flexDirection: "column", justifyContent: "space-evenly", marginLeft: "20px"}}>
						<p style={{fontWeight:"bold"}}>{this.props.fromName}</p>
						<p style={{fontWeight:"bold"}}>{this.props.from}</p>
					</div>
					<div style={{display:"flex", flexDirection: "column", justifyContent: "space-evenly", marginLeft: "20px"}}>
						{this.menu}
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
