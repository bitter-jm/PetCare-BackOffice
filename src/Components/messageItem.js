import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/messageItem.css"
import Moment from 'react-moment';
import 'moment-timezone';
class MessageItem extends Component {

  state = { numInboxes: null}
  componentWillMount() {
    fetch(`https://petcare-server.herokuapp.com/inboxes`)
      .then((response) => {
        return response.json()
      })
      .then((inboxes) => {
        this.setState({ numInboxes: inboxes.length })
        console.log(comments.length)
      })
      console.log(this.props.userLogged)
  }

  cutrefind(array,item){
    var found = false;

    for(var i = 0; i < array.length;++i){
      if(array[i]==item) found = true;
    }
    return found;
  }

  render() {
		const date = <Moment fromNow date={this.props.data_creacio}/>
    let votebutton;
    if(this.props.usernameLogged == null){
      votebutton = <button><img width="30" height="30" src={logoneutral}></img></button>
    }
    else if(this.props.usernameLogged == this.props.autor){
      votebutton = <button ><img width="30" height="30" src={logoneutral}></img></button>
    }
    else if(this.cutrefind(this.props.vots,this.props.useridLogged) ){
      votebutton = <button onClick={this.unvote.bind(this,this.props.id)}><img width="30" height="30" src={logounvote}></img></button>
    }
    else{
      votebutton = <button onClick={this.vote.bind(this,this.props.id)}><img width="30" height="30" src={logovote}></img></button>
    }
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