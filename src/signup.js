import React, { Component } from 'react';
import './App.css';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';
import AlertResponse from "./message";

import  service from "./userservice/userApi";

class  SignUp extends React.Component {
  constructor(props){
    super(props);

    this.state= {
      response:"",
      typeResponse:"",
      firstname : "",
      lastname: "",
      username:"",
      password:"",
      role:"manager",
      email:"",
      phone:"",
      dob:new Date()
    }

    this.halndleFirstnameChange = this.halndleFirstnameChange.bind(this);
    this.halndleLastnameChange = this.halndleLastnameChange.bind(this);
    this.halndlePhoneChange = this.halndlePhoneChange.bind(this);
    this.halndleRoleChange = this.halndleRoleChange.bind(this);
    this.halndleUsernameChange = this.halndleUsernameChange.bind(this);
    this.halndlepasswordChange = this.halndlepasswordChange.bind(this);
    this.halndleEmailChange = this.halndleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    

  }

  componentDidMount(){
    console.log(new Date());
    if(this.props.editUser)
    {
      console.log(this.props.editUser);
        service.getUserById(this.props.editUser, (result)=>{
            if(result)
            {
              var name = result.name.split(" ");
            
              if(!result.dob || result.dob=="")
              {
                result.dob = new Date();
              }
                console.log(result);
                console.log(Moment(new Date(result.dob)));
                this.setState({
                    id:result.id,
                    firstname : name[0],
                    lastname: name[1],
                    username: result.username,
                    email: result.email,
                    password: result.password,
                    phone:result.phone_number,
                    role: result.role,
                    dob:new Date(result.dob)
                  
                  });

                console.log(this.state);
            }

        })    }
  }


  halndleFirstnameChange(e){
    this.setState({firstname:e.target.value});
  }
  halndleDobhange(e){
    this.setState({dob:e.target.value})
    
  }

  halndleLastnameChange(e){
    this.setState({lastname:e.target.value})

  }

  halndlepasswordChange(e){
    this.setState({password:e.target.value})

  }

  halndleUsernameChange(e){
    this.setState({username:e.target.value})

  }

  halndleEmailChange(e){
    this.setState({email:e.target.value})
 
  }

  halndleRoleChange(e){
    this.setState({role:e.target.value})

  }
  halndlePhoneChange(e){
    this.setState({phone:e.target.value})

  }

  handleEdit(e){
    if(!this.state.firstname  || this.state.lastname=="" || this.state.email=="" ||
    this.state.phone=="" ||this.state.role=="" ||this.state.username=="" )
    {
      this.setState({response:"Please fill the required fields", typeResponse:"danger"});
    }
    else{
      this.state.dob = Moment(this.state.dob).format("YYYY-MM-DD");
      service.updateUser({name:this.state.firstname + " " +this.state.lastname,
      username:this.state.username, 
      password:this.state.password,
      email:this.state.email,
      role:this.state.role,
      dob:this.state.dob,
      phone_number:this.state.phone,
      id:this.state.id
    
    }, (result) =>{
        if(result){
          console.log(result);
        }
        else{
          this.setState({
            response : "Error in adding user", typeResponse: "danger"
          });
        }
      });

    }
    e.preventDefault();
    console.log(this.state.role);
  }

  handleSubmit(e){
    if(!this.state.firstname  || this.state.lastname=="" || this.state.email=="" ||
    this.state.phone=="" ||this.state.role=="" ||this.state.username=="" )
    {
      this.setState({response:"Please fill the required fields", typeResponse:"danger"});
    }
    else{
      this.state.dob = Moment(this.state.dob).format("YYYY-MM-DD");
  
      service.addUser({name:this.state.firstname + " " +this.state.lastname,
      username:this.state.username, 
      password:this.state.password,
      email:this.state.email,
      role:this.state.role,
      dob:this.state.dob,
      phone_number:this.state.phone
    
    }, (result) =>{
        if(result){
          console.log(result);
        }
        else{
          this.setState({
            response : "Error in adding user", typeResponse: "danger"
          });
        }
      });

    }
    e.preventDefault();
    console.log(Moment(this.state.dob).format("YYYY-MM-DD"));
    console.log(this.state.role);
  }
    
  render(){

    let alert = null;
    if(this.state.response){
      alert = <AlertResponse message={{type:this.state.typeResponse , message:this.state.response}}></AlertResponse>;
    }
    var userbtn = null;
    if(this.props.editUser)
    {
     userbtn = <button onClick={this.handleEdit} style={{width:"100%" , borderRadius:"10px" , marginTop:"10px", padding:"5px"}}> Edit</button>;

    }
    else{
      userbtn = <button onClick={this.handleSubmit} style={{width:"100%" , borderRadius:"10px" , marginTop:"10px", padding:"5px"}}> Add user</button>;

    }

    return (

        <div className="signupBox">
          {alert}
          <h1>Sign Up</h1>
        <form>

        <div className="signupInputName" >
        <input  type="text" value={this.state.firstname} onChange={this.halndleFirstnameChange} placeholder="First Name"></input>
        </div>
        <div className="signupInputName" style={{marginLeft:"30px"}}>
        <input  type="text" value={this.state.lastname} onChange={this.halndleLastnameChange} placeholder="Last Name"></input>
        </div>
        <div className="signupInput">
        <input  type="text" value={this.state.username} onChange={this.halndleUsernameChange} placeholder="username"></input>
        </div>
        <div className="signupInput">
        <input  type="password" value={this.state.password} onChange={this.halndlepasswordChange} placeholder="password"></input>
        </div>
        <div className="signupInput">
        <input  type="text" value={this.state.phone} onChange={this.halndlePhoneChange} placeholder="Phone Number"></input>
        </div>
        <div className="signupInput">
        <input  type="text" value={this.state.email} onChange={this.halndleEmailChange} placeholder="Email"></input>
        </div>
        <div className="signupInput">
          <label style={{color:"darkgray" , marginLeft:"20px"}}>Select Date</label>
        <DatePicker selected={this.state.dob}  onChange={date => (this.setState({dob:date}))} />
        </div>
        <div className="signupInput">
          <select value={this.state.role} onChange={this.halndleRoleChange}>
            <option value="admin"> Admin</option>
            <option value="saleman"> SaleMan</option>
            <option value="manager"> Manager</option>
          </select>
        </div>
        {userbtn}
        </form>
        
      </div>
    );
  }
}

export default SignUp;
