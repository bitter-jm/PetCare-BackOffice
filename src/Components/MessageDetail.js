import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/MessageItem.css"
import Moment from 'react-moment';
import 'moment-timezone';
class MessageDetail extends Component {

    state = { numComments: null}
    componentWillMount() {
      fetch(`https://fakernews-waslab.herokuapp.com/api/item/${this.props.id}/comments`)
        .then((response) => {
          return response.json()
        })
        .then((comments) => {
          this.setState({ numComments: comments.length })
          console.log(comments.length)
        })
        console.log(this.props.userLogged)
    }

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
		    		<p className="messageContent">Content:{this.props.body}</p>
    			</div>
    		</div>
    	</div>
    );
  }
}