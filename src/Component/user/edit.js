import React from "react";
import SignUp from "../../signup";
import  service from "../../userservice/userApi";

class  EditUser extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        console.log();
    
    
    }

    render(){
        return(
        <SignUp editUser={this.props.match.params.userId} ></SignUp>
        );
    }
}
export default EditUser;