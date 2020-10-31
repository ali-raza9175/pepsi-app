import React, { Component  , useState} from 'react';
import './App.css';
import {Alert , Button} from "react-bootstrap";

class  AlertResponse extends React.Component {
    constructor(){
        super();
        this.state = {show:true};
        
        this.setShow = this.setShow.bind(this);
    }

    setShow(){
      this.setState ({
        show :false
      });
        this.props.message.message = null;
    }

  render(){
    if(this.props.message.message)
    {
      this.state.show = true;
    }
    return (
    <>
      <Alert show={this.state.show} variant={this.props.message.type} onClick={this.setShow}>
      <Alert.Heading style={{textAlign:"center"}}>{this.props.message.message}</Alert.Heading>
      </Alert>
    </>
    );
  }
}

export default AlertResponse;
