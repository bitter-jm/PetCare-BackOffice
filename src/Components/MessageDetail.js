import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/MessageDetail.css"
import Moment from 'react-moment';
import 'moment-timezone';
import ReactModal from 'react-modal';
import axios from 'axios'; 
import _ from 'lodash';

class MessageDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  async acceptCarer() {
    var resp = await axios({
      method: 'get',
      url: "https://petcare-server.herokuapp.com/inboxes",
      params: {
           to: this.props.session._id, 
      }
    });
    console.log('USER ID IS: '+ this.props.session._id);
    console.log(resp);
    this.setState({ messages: resp.data});
  };


  render() {
	const date = <Moment fromNow date={this.props.createdDate}/>
  var modalType;
  var tag = this.props.tag;
  if(tag  = 'Approval Request') {
    modalType = 
    <div>
        <button onClick={this.handleOpenModal}>Trigger Modal</button>
        
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="onRequestClose Example"
           onRequestClose={this.handleCloseModal}
           className="Modal"
           overlayClassName="Overlay"
        >
          <p>Petición Aceptada!</p>
          <button onClick={this.handleCloseModal}>Close</button>
        </ReactModal>
      </div>
  }
  else if(tag = 'Caring Request'){
    modalType = <div>
    <button onClick={this.handleOpenModal}>Trigger Modal</button>
    
    <ReactModal 
       isOpen={this.state.showModal}
       contentLabel="onRequestClose Example"
       onRequestClose={this.handleCloseModal}
       className="Modal"
       overlayClassName="Overlay"
    >
      <p>Reserva Aceptada!</p>
      <button onClick={this.handleCloseModal}>Close</button>
    </ReactModal>
  </div>;
  }
  else if(tag = 'Ongoing Reservation'){
    modalType = <div>
    <button onClick={this.handleOpenModal}>Trigger Modal</button>
    
    <ReactModal 
       isOpen={this.state.showModal}
       contentLabel="onRequestClose Example"
       onRequestClose={this.handleCloseModal}
       className="Modal"
       overlayClassName="Overlay"
    >
      <p>Petición Aceptada!</p>
      <button onClick={this.handleCloseModal}>Close</button>
    </ReactModal>
  </div>
  }
  else modalType = '';
  
  return (	
      <div className="msg">
      <div className="firstRow">
        <p className="">From: {this.props.from}</p>
        <p className="from">Received {date}</p>
      </div>
      <div className="secondRow">
        <p className="title">Información de reserva Nº{this.props.subject}</p>
      </div>
      <div className="thirdRow">
        <div>
          <span className="messageText">Content: {this.props.body}</span>
        </div>
      </div>
      {modalType}
    </div>
    );
  }
}

export default MessageDetail;
