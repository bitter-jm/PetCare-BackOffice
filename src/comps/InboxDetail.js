import React, { Component } from "react";
import "./css/MessageDetail.css"
import Moment from 'react-moment';
import './css/react-rater.scss'
import 'moment-timezone';
import AnimatedRater from "./AnimatedRater";
import ReactModal from 'react-modal';
import axios from 'axios'; 
import _ from 'lodash';

class MessageDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: false,
      valoracion:'',
      rate: 5
    };
    this.updateInput = this.updateInput.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  setRate({newrate}){
    const { newrate: lastRate } = this.state
    this.setState({rate:lastRate});
    console.log(this.state.rate);
  }

  updateInput(event){
    this.setState({valoracion:event.target.value});
    console.log(this.state.valoracion);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
    var tag = this.props.tag;
    if(tag  = 'Approval Request') {
      this.acceptCarer();
    }
    if(tag  = 'Caring Request') {
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
        <button className='button' onClick={this.handleOpenModal}>Aceptar cuidador</button> 
        <img src={this.props.aux} style={{width:"300px", height:"300px", borderRadius: "5px"}} />
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
  else if(tag == 'Caring Request'){
    modalType = 
    
    <div>
    <button className='button' onClick={this.handleOpenModal}>Aceptar reserva</button>
    
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
      <p>Petición Aceptada!</p>
      <button onClick={this.handleCloseModal}>Close</button>
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
      <AnimatedRater total={5} rating={this.state.rate} onRate={this.setRate.bind(this)}/>
      <input value={this.state.valoracion} onChange={this.updateInput}></input>
      <button onClick={this.handleCloseModal}>Send Rating</button>
      <button onClick={this.handleCloseModal}>Close</button>


    </ReactModal>
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
