import React, { Component  , useContext} from 'react';
import '../../App.css';
import UserList from "./list";
import '../styles/user.css';
import Nav from '../../nav';
import  service from "../../userservice/userApi";
import AlertResponse from "../../message";
import {AuthContext} from '../../context/user-context';

class  Users extends React.Component {
  static contextType = AuthContext;

  constructor(props){
    super(props);
    this.state={users:[],response : "", typeResponse: ""};
    this.deleteUser = this.deleteUser.bind(this);
  }

  deleteUser(data){
    console.log(data);
    const userData = this.state.users.filter(item => item.id !==data);
    this.setState({
      users : userData
    });
  }

  componentDidMount() {
    const  user = this.context;
    console.log("user after refresh");
    
    if(!user || !user.Token)
    {
      if(!user.checkUSer())
      {
        console.log("inside function");
      localStorage.removeItem("isAuthenticate");
      this.props.history.push('/login'); 
      }
    }

    service.getUsers(result =>{
      if(!result)
      {
        this.setState({
          response : "Server Error", typeResponse: "danger"
        });
      }
      else{
        this.setState({
          users : result
        });
        console.log(result);
      }
    },user.Token);

  }

  render(){
    let alert = null;
    if(this.state.response){
      alert = <AlertResponse message={{type:this.state.typeResponse , message:this.state.response}}></AlertResponse>;
    }
    return (
      <div >
          {alert}
            <Nav></Nav>
                  <table>
                    <UserList users = {this.state.users}  deleteUserdate={this.deleteUser} />
                    </table>

      </div>
      
    );
  }
}

export default Users;
