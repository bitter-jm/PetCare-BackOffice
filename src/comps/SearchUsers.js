import Autosuggest from 'react-autosuggest';
import React, { Component } from "react";
import axios from 'axios';  
import "./css/SearchUsers.css"


var usuarios = [];
// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    console.log('USUARIOS: ' + usuarios);
    return inputLength === 0 ? [] : usuarios.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };
  
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = suggestion => suggestion.name;
  
  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => (

		<div style={{display:"flex", flexDirection: "row", marginTop:"10px", color:"#202020", fontSize:17}}>
                <img src={suggestion.picture} style={{width:"45px", height:"45px", borderRadius: "10px"}} />					<div style={{display:"flex", flexDirection: "column", justifyContent: "space-evenly", marginLeft: "10px"}}>
               <p style={{}}> {suggestion.name}</p>	
		</div>
	</div>

  );
  class searchUsers extends React.Component {
    constructor(props) {
        super(props);
  
      // Autosuggest is a controlled component.
      // This means that you need to provide an input value
      // and an onChange handler that updates this value (see below).
      // Suggestions also need to be provided to the Autosuggest,
      // and they are initially empty because the Autosuggest is closed.
      this.state = {
        value: '',
        suggestions: []
      };
    };

    componentWillMount() {
        let props = this.props;
        console.log('id:'+props.sessionId);
        this.getUserList(props);
    }

    async getUserList(props){
        var resp = await axios({
            method: 'get',
            url: "https://petcare-server.herokuapp.com/users",
            params:{
              sessionId: props.sessionId
            }
          });
          var result = resp.data;
          console.log(result);
          usuarios = [];
          for(var item in result){
              var obj = result[item];
              console.log('ITEM IS:' + obj);
              usuarios.push({name: obj.email,id: obj._id, picture:obj.userPicture});
          }
          console.log(usuarios);
    }
  
    onChange = (event, { newValue }) => {
      this.setState({
        value: newValue
      });
    };
  
    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value)
      });
    };
  
    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) =>{

		console.log('CHECK 1');
        console.log(JSON.stringify(suggestion));
        this.props.callbackFromParent({name:suggestionValue,id:suggestion.id});
	};
  
    render() {
      const { value, suggestions } = this.state;
  
      // Autosuggest will pass through all these props to the input.
      const inputProps = {
        placeholder: 'Choose a carer to start a chat',
        value,
        onChange: this.onChange,
        
      };
  
      // Finally, render it!
      return (
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          highlightFirstSuggestion={true}
          onSuggestionSelected={this.onSuggestionSelected}
        />
      );
    }
  }
  export default searchUsers;