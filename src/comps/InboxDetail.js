import React, { Component } from "react";
import "./css/MessageDetail.css"
import Moment from 'react-moment';
import './css/react-rater.scss'
import 'moment-timezone';
import AnimatedRater from "./AnimatedRater";
import ReactModal from 'react-modal';
import axios from 'axios'; 
import _ from 'lodash';
import "./css/InboxDetail.css"

class MessageDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: false,
      valoracion:'',
      rate: 5
    };
    this.handleRejection = this.handleRejection.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleRejection(event){
    
    event.preventDefault();
    var tag = this.props.tag;
    var otherId = this.props.otherId;
    var sessionId = this.props.sessionId;
    var auxId = this.props.auxId;
    console.log('ASADASD  '+otherId + ' ' +sessionId);
    if(tag  == 'Denied Carer') {
      this.handleRejectCarer(otherId,sessionId);
    }
    if(tag  == 'Denied Request') {
      this.handleRejectReservation(auxId);
    }
  }

  async handleRejectCarer(otherId,sessionId){
    console.log(otherId + ' ' + sessionId);
    var resp = await axios({
      method: 'put',
      url: "https://petcare-server.herokuapp.com/user/"+otherId+"/demote",
      data: {
        sessionID: sessionId
      }
    });
    console.log(resp.data);
  }

  async handleRejectReservation(auxId){
    var resp = await axios({
      method: 'delete',
      url: "https://petcare-server.herokuapp.com/reservation/"+auxId,
      // data: {
      //   sessionID: this.props.session._id
      // }
    });
    console.log(resp.data);
  }

  setRate({ rating }){
    console.log(rating);
  }

  updateInput(event){
    this.setState({valoracion:event.target.value});
    console.log(this.state.valoracion);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
    var tag = this.props.tag;
    if(tag  == 'Approval Request') {
      this.acceptCarer();
    }
    if(tag  == 'Caring Request') {
      this.acceptReservation();
    }
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  async acceptCarer() {
    var resp = await axios({
      method: 'put',
      url: "https://petcare-server.herokuapp.com/user/"+this.props.id+"/validate",
    });
    console.log(this.props.id);
  };

  async acceptReservation() {
    var resp = await axios({
      method: 'put',
      url: "https://petcare-server.herokuapp.com/reservations/"+this.props.id,
    });
    console.log(this.props.id);
  };

  async sendRate() {
    var resp = await axios({
      method: 'put',
      url: "https://petcare-server.herokuapp.com/ratings",
      data: {
        rating: this.state.rate,
        comment: this.state.valoracion,
        reservation: this.props.id,
        pet: this.props.auxField,
        carer: this.props.props.otherId,
        sessionId: this.props.session._id
      }
    });
    console.log(this.props.id);
  };

  render() {
	const date = <Moment fromNow date={this.props.createdDate}/>
  var modalType;
  var tag = this.props.tag;
  if(tag  == 'Approval Request') {
    modalType = 
    <div>
        <div>
            <img src={this.props.aux} style={{width:"300px", height:"300px", borderRadius: "5px"}} />
        </div>
        <div>
          <button className='buttonOK' onClick={this.handleOpenModal}>Accept carer</button> 
          <button className='button' onClick={this.handleRejectCarer}>Reject carer</button>
        </div>
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="onRequestClose Example"
           onRequestClose={this.handleCloseModal}
           className="Modal"
           overlayClassName="Overlay"
        >
          <div className="box-accept" style={{textAlign: "center", margin: "30px", fontSize:"15px"}}>
            <p className="text-w">New carer activated!</p>
            <hr></hr>
            <button className="button-w"  onClick={this.handleCloseModal}>Close</button>
          </div>
        </ReactModal>
      </div>
  }
  else if(tag == 'Caring Request'){
    modalType = 
    
  <div>
    <button className='buttonOK' onClick={this.handleOpenModal}>Accept request</button>
    <button className='button' onClick={this.handleRejectReservation}>Reject request</button>
    <ReactModal 
       isOpen={this.state.showModal}
       contentLabel="onRequestClose Example"
       onRequestClose={this.handleCloseModal}
       className="Modal"
       overlayClassName="Overlay"
    >
      <div className="box-accept" style={{textAlign: "center", margin: "30px", fontSize:"15px"}}>
        <p className="text-w" >Request accepted!</p>
        <hr></hr>
        <button className="button-w" onClick={this.handleCloseModal}>Close</button>
      </div>
    </ReactModal>
  </div>;
  }
  else if(tag == 'Ongoing Reservation'){
    modalType = <div>
    <button className='button' onClick={this.handleOpenModal}>Ir a reserva</button>
    
    <ReactModal 
       isOpen={this.state.showModal}
       contentLabel="onRequestClose Example"
       onRequestClose={this.handleCloseModal}
       className="Modal"
       overlayClassName="Overlay"
    >
      <div className="box-accept" style={{textAlign: "center", margin: "30px", fontSize:"15px"}}>
        <a></a>
        <hr></hr>
        <button className="button-w" onClick={this.handleCloseModal}>Close</button>
      </div>
          </ReactModal>
  </div>
  }
  else if(tag == 'Ended Reservation'){
    modalType = <div>
    <button className='button' onClick={this.handleOpenModal}>Valorar reserva</button>
    
    <ReactModal 
       isOpen={this.state.showModal}
       contentLabel="onRequestClose Example"
       onRequestClose={this.handleCloseModal}
       className="Modal"
       overlayClassName="Overlay"
    >
      <p>Review your reservation!</p>
      <AnimatedRater total={5} rating={2} onRate={this.setRate.bind(this)}/>
      <input value={this.state.valoracion} onChange={this.updateInput}></input>
      <button onClick={this.handleCloseModal}>Send Rating</button>
      <button onClick={this.handleCloseModal}>Close</button>
    </ReactModal>
  </div>
  }
  else if(tag == 'Denied Carer'){
    modalType = <div>
    
    <p>We're so sorry , {this.props.from} has denied your request to become a carer.<br/><br/><br/>Thank you for your comprehension,<br/>The Petcare team.</p>
    
  </div>
  }
  else if(tag == 'Denied Request'){
    modalType = <div>
    
    <p>We're so sorry , {this.props.from} has denied your caring request. Contact the carer for more details</p>
    
  </div>
  }
  else modalType = '';
  
  return (	
      <div className="msg" style={{margin:"20px", fontSize:"17px"}}>
      <div className="firstRow" style={{fontSize:"19px"}}>
        <p className="" style={{marginBottom: "6px"}}>{this.props.from}</p>
        <p className="" style={{marginBottom: "10px", fontStyle:"italic"}}>{date}</p>
      </div>
      <div className="secondRow">
        <p className="title">{this.props.subject}</p>
      </div>
      <div className="thirdRow">
        <div style={{marginBottom: "20px"}}>
          <span className="messageText">{this.props.body}</span>
        </div>
      </div>
      {modalType}
    </div>
    );
  }
}

export default MessageDetail;
