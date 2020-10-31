import React , {createContext ,useState , useEffect} from "react";
import Login from '../login';
import SignUP from "../signup";
import DatePicker from "react-datepicker"; 

export const AuthContext = createContext();

export  const AuthProvider = (props) => {

const user ={
    Token : null,
    user: null,
    setData : (data) => {
        console.log(data);
        user.Token = data.token;
        user.user = data.user;
        const userdata = JSON.stringify({"token" : user.Token, "id": data.user.id, "name": data.user.name})
        console.log(userdata)
        localStorage.setItem("userData" ,userdata) ;
        localStorage.setItem("userLoginDate", new Date().getTime()); 
        console.log(user);
        },
        checkUSer : () => {
            console.log("context api check user call");
    
            try {
                const data =JSON.parse(localStorage.getItem("userData"));
                console.log(data);
                var dt1 = localStorage.getItem("userLoginDate");
                var dt2 = new Date().getTime();
                var diff =(dt2 - dt1) / 1000;

                diff /= (60);
                console.log("difference");
                console.log(diff);
                diff = Math.abs(Math.round(diff))

 
                if(!data.token || diff > 2)return false;

                user.Token = data.token;
                user.user = {id: data.id , name:data.name};
                return true;
                
            } catch (error) {
               console.log("error in json"); 
               return false;
            }
        }      
    };

    

return (

    <AuthContext.Provider value={user}>
        {props.children}
    </AuthContext.Provider>
);
};