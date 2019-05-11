import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/messageItem.css"
import Moment from 'react-moment';
import 'moment-timezone';
class MessageItem extends Component {

  state = { numInboxes: null}
  componentWillMount() {
    var data = {to: this.state.userLogged};
    fetch(`https://petcare-server.herokuapp.com/inboxes`,{method: 'GET', body: JSON.stringify(data)})
      .then((response) => {
        return response.json()
      })
      .then((inboxes) => {
        this.setState({ numInboxes: inboxes.length })
        console.log(comments.length)
      })
      console.log(this.props.userLogged)
  }

  render() {
		const date = <Moment fromNow date={this.props.data_creacio}/>
    return (	
    	<div className="">
    		<tr className="firstRow">
    			<td className="">#{this.props.rank}</td>
    			<td className="">
                    <span>{votebutton}</span>
                </td>
    			<td>
	    			<div>
		               	<p className="from">{this.props.from} </p>
		               	<p className="title">{this.props.title}</p>
		            </div>
                </td>
    		</tr>
    		<tr className="secondRow">
    			<td>
		    		<span className="messageContent">{this.props.content}</span>
    			</td>
    		</tr>
    	</div>
    );
  }
}

export default messageItem;