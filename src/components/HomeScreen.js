import React from 'react';
import MessageList from "./MessageList";
//import "./css/HomeScreen.css";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {messages: [],username: ''}
    this.componentWillMount = this.componentWillMount.bind(this);
}

  componentWillMount() {
    fetch(`https://petcare-server.herokuapp.com/inboxes`,{method: 'GET', params: {to:(this.props.session)}})
      .then((response) => {
        return response.json()
      })
      .then((inboxes) => {
        this.setState({ messages: inboxes, username: 'mariogamarro97@gmail.com' })
      })
      console.log(this.props.messages)
  }

  render(){
    return(

      <div className="Home">
        <div className="Left">
        <MessageList messages = {this.state.messages} 
                          username = {this.state.username}
                          renderParent = {() => {
                            this.setState({messages: []});
                            this.componentWillMount()
                          }}

          />
        </div>
        <div className="Right">
        {/* Componente de vista de elemento  */ }
        </div>
      </div>
    )
  }
}
  
  export default HomeScreen;
