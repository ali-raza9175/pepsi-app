import React, { Component ,useState} from 'react';
import './App.css';
import './login'
import Nav from './nav'
import Login from './login';
import SignUp from './signup';
import  {Route, Switch} from 'react-router-dom';
import { AuthContext ,AuthProvider} from "./context/user-context";
import AlertResponse from "./message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCross, faTimes, faBars } from "@fortawesome/free-solid-svg-icons";


class  App extends React.Component {

  constructor(){
    super();
    this.state = {response : "yes", typeResponse: "success"};

    this.showAgain = this.showAgain.bind(this);
  }

  showAgain(){
    this.setState({
      response : "yes again", typeResponse: "success"
    });


  }

  render(){
    let items = [10];
    for (let index = 0; index < 10; index++) {
      items[index] = index +1;
      
    }
    if(this.state.response){
      alert = <AlertResponse message={{type:this.state.typeResponse , message:this.state.response}}></AlertResponse>;
    }
    const options = items.map((num) => 
          <option value={num}>{num}</option> );
    return (

      <div className="App">
      <select value="Select Option" >
        {options}
      </select>
      </div>
    );
  }
}

export default App;
