import React, { Component } from 'react';
import './App.css';
import  {Route, Switch , withRouter} from 'react-router-dom';
import { faHome, faCross, faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class  Nav extends React.Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    
  }

  handleLogout(){
    localStorage.removeItem("isAuthenticate");
    this.props.history.push('/login');
  }

  render(){
    return (
      <div>
          <input type="checkbox" id="check"></input>
          <label htmlFor="check"> 
           <FontAwesomeIcon icon={faBars}  id="menu"/>
           <FontAwesomeIcon icon={faTimes} id="cancel" />
          </label>
        

      <div className="navCustom">
          <header>Asim Traders</header>
          
            <ul>
                <li> Sellers</li>
                <li>Inventory</li>
                <li>Sale</li>
                <li>Empty</li>
                <li>Debit</li>
                <li onClick={this.handleLogout} >Logout</li>
            </ul>        
      </div>
      </div>

    );
  }
}

export default withRouter(Nav);
