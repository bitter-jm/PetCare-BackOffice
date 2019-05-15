import React from 'react';
import _ from 'lodash';

class NavigationBar extends React.Component {

    render() {
      return (
      <div style={{backgroundColor:"#fff"}}>
        {JSON.stringify(this.props.session)}
      </div>
      );
    }
  }
  
  export default NavigationBar;
