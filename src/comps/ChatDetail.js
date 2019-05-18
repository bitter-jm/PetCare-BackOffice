import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/MessageDetail.css"
import Moment from 'react-moment';
import 'moment-timezone';
import ReactModal from 'react-modal';
import axios from 'axios'; 
import _ from 'lodash';
import 'react-chat-elements/dist/main.css';
import { MessageBox, MessageList } from 'react-chat-elements';

class ChatDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "mariogamarro97@gmail.com",
      from: "joan3pastor@gmail.com",
    };

  }

  render() {
    return (

      <div style={{}}>
        <div style={{padding:"30px"}}>


        <MessageList
          className='message-list'
          lockable={true}
          toBottomHeight={'100%'}
          dataSource={[
              {
                  position: 'right',
                  type: 'text',
                  text: 'Pene 1234.... :)',
                  date: new Date(),
              },
              {
                position: 'left',
                type: 'text',
                backgroungColor: "black",
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                date: new Date(),
            },
            {
              position: 'right',
              type: 'text',
              text: 'dhfsjgklherjkg',
              date: new Date(),
          },
          ]} />

        </div>
  
      </div>
      );
  }
}

export default ChatDetail;
