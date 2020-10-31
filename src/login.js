import React, { Component  , useContext} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import axios from "axios";
import  service from "./userservice/userApi";
import {AuthContext ,AuthProvider} from "./context/user-context";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import AlertResponse from "./message";

 
const api = axios.create({
baseURL : "http://localhost:5000/api/user"
});


class  Login extends React.Component {
  static contextType = AuthContext;
  

  constructor(){
    super();

    this.state={username:"",password:"",response : "", typeResponse: ""};
    this.handlePasswordchange = this.handlePasswordchange.bind(this);
    this.handleUsernamechange = this.handleUsernamechange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    

  }

  handleUsernamechange(e){
    this.setState({username:e.target.value})
  }

  handlePasswordchange(e){
    this.setState({password:e.target.value})

  }

  handleLogin(e){
    e.preventDefault();
    service.login({username:this.state.username, password:this.state.password}, (result)=>{
      if(result)
      {
        console.log(result);
        localStorage.setItem("isAuthenticate", true);
        const  user = this.context;
        user.setData({token:result.token, user:result.data});
        this.props.history.push('users');

      }
      else{
        this.setState({
          response : "Error while Login", typeResponse: "danger"
        });
        console.log(this.state);
      }
    });
//    this.props.history.push('/signup');



  }
    
  render(){
    let alert = null;
    if(this.state.response){
      alert = <AlertResponse message={{type:this.state.typeResponse , message:this.state.response}}></AlertResponse>;
    }
    return (
<div>
  {alert}
      <div className="login-box">
        <h1>login</h1>
        <div className="login-input">
            <FontAwesomeIcon icon={faUser} className="login-icon"></FontAwesomeIcon>
            <input type="text" value={this.state.username} id="username" placeholder="username" onChange={this,this.handleUsernamechange}></input>
        </div>

        <div className="login-input">
        <FontAwesomeIcon icon={faLock} className="login-icon"></FontAwesomeIcon>

        <input type="password" value={this.state.password} id="username" placeholder="Password" onChange={this,this.handlePasswordchange}></input>

        </div>

          <input type="button" id="loginbtn" onClick={this.handleLogin} value="Login"></input>

      </div>
      </div>
   /*<div className="login-box text-center">
         <h1>Login</h1>
        <hr></hr>
      <Form  onSubmit={this.handleLogin}> 
      <Form.Group controlId="forusername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text"  value={this.state.username} onChange={this.handleUsernamechange} placeholder="Enter email" />

      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={this.state.password} onChange={this.handlePasswordchange} placeholder="Password" />
      </Form.Group>
      <Button variant="primary btn-lg btn-block"  class="text-center" type="submit">
        Login
      </Button>
    </Form>
   </div>*/
        /*<div className="flex-box">
        <div className="wrapper-sgnup" >
          <h1>LOGIN</h1>
          <h1>{user.username}</h1>
        <form>
          <input className="wrapper-sgnup-input" type="text" placeholder="username"></input>
          <input className="wrapper-sgnup-input" type="password" placeholder="password"></input>
          </form> 
          <button className="wrapper-sgnup-submit">Login</button>
          <Link to="/signup"><button className="wrapper-sgnup-submit">Sign Up</button></Link>

        </div>
      </div>*/

    );
  }
}
/*
const Login = () => {
  const auth = useContext(AuthContext);
  return (<AuthProvider>
    <div>
  <h1>{auth.username}</h1>
  </div> </AuthProvider>);
}*/

export default Login;
