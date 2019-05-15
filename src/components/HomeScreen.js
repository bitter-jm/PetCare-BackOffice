import React from 'react';
import MessageList from "./MessageList";
import "./css/HomeScreen.css";

class HomeScreen extends React.Component {

  render(){
    return(
    
    <div/>  );
    /*
      <div className="Home">
        <div className="Left">
        <MessageList messages = {this.state.messages} 
                          username = {this.state.username}
                          userid = {this.state.userid}
                          renderParent = {() => {
                            this.setState({messages: []});
                            this.componentWillMount()
                          }}

          />
        </div>
        <div className="Right">
        {/* Componente de vista de elemento   }
        </div>
      </div>
    )
    */
  }
}
  
  export default HomeScreen;
