import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/MessageDetail.css"
import Moment from 'react-moment';
import 'moment-timezone';
class MessageDetail extends Component {

    state = { numComments: null}

  render() {
	const date = <Moment fromNow date={this.props.createdDate}/>
    return (	
    	<div className="">
    		  
    	</div>
    );
  }
}

export default MessageDetail;
