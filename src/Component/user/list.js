import React, { Component , useContext } from 'react';
import '../../App.css';
import '../styles/user.css';
import Nav from '../../nav';
import  {Route, Switch} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {  faBars, faArchive } from '@fortawesome/free-solid-svg-icons';
import {AuthContext} from '../../context/user-context';

class  UserList extends React.Component {
  static contextType = AuthContext;

      constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleupdate = this.handleupdate.bind(this);

      }

      handleupdate(key){
        console.log(this.props.users[key].username);
      }

      handleDelete(key){
        this.props.users[key].quantity = 10;
        console.log(this.props.users[key]);
      }

      componentDidMount(){
      const  user = this.context;
    }

  render(){
    console.log("user list");
    console.log(this.props.users);
    const users = this.props.users;
    const userlist = users.map((user,index) =>
      <tr key={user.id}>
        <td>{user.name }</td>
        <td>{user.email}</td>
        <td>{user.phone_number}</td>
        <td>{user.role}</td>
        <td>
        <span onClick={() => this.handleDelete(index)}  style={{cursor:"pointer"}}> 
        <FontAwesomeIcon icon={faArchive} ></FontAwesomeIcon> 
           </span>
          <span  style={{marginLeft:"10px"}} onClick={() => this.props.deleteUserdate(user.id)}>
          <FontAwesomeIcon icon={faArchive} ></FontAwesomeIcon>     </span>
        </td>
        </tr>
    );
    return (
      <tbody>
             <tr>
               <th>Name</th>
               <th>Email</th>
               <th>Phone Number</th>
               <th>Role</th>
               <th>Operation</th>
              </tr>
              {userlist}
      </tbody>
/*    <div>

       <div className="userContainer"  style={{width:"60%" , border:"1px black solid" , margin:"auto"}}>
              <span>{this.props.users.username}</span>
              <span>{this.props.users.role}</span>
              <button style={{ backgroundColor:"#85a3e0"}}>Dalete</button>
              <button>Update</button> 
             
      </div>
      </div>*/
    );
  }
}

export default UserList;
