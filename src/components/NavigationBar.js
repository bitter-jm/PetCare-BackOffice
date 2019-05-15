import React from 'react';
import _ from 'lodash';

class NavigationBar extends React.Component {

    render() {
      return (
      <div style={{backgroundColor:"black", padding: "8px"}}>
        <div style={{display:"flex", width:"80%", margin:"auto", justifyContent:"space-between", alignItems:"center"}}>

          <div style={{display:"flex", alignItems:"center"}}>
            <img src="https://i.gyazo.com/b62bf8aaf9b653f6764dac8051edffed.png" style={{ width:"50px", height:"50px", borderRadius:"10px"}} />
            <h2 style={{color:"#fff", marginLeft:"10px"}}>PetCare</h2>
          </div>

          <p style={{color:"#fff"}}></p>

          <div style={{display:"flex", alignItems:"center"}}>
            <img src={this.props.session.userPicture} style={{ width:"40px", height:"40px", borderRadius:"20px"}} />
            <h3 style={{color:"#fff", marginLeft:"10px", marginRight:"20px"}}>{this.props.session.name}</h3>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/OOjs_UI_icon_logOut-ltr-invert.svg/1024px-OOjs_UI_icon_logOut-ltr-invert.svg.png" 
              style={{ width:"40px", height:"40px", borderRadius:"20px"}} 
              onClick={() => {
                localStorage.removeItem("session");
                this.props.logout()
              }}/>
          </div>
          
        </div>
      </div>
      );
    }
  }
  
  export default NavigationBar;
