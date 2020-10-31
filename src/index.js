import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {AuthProvider} from "./context/user-context"
import Login from './login';
import SignUp from './signup';
import Users from './Component/user/users';
import EditUser from './Component/user/edit';
import { BrowserRouter as Router, Route, Switch  , Redirect} from 'react-router-dom';


const fakeAuth = {
  isAuthenticated: false,
  authenticate() {
    
      this.isAuthenticated = localStorage.getItem('isAuthenticate');
      
    if(this.isAuthenticated && this.isAuthenticated== "true" )
    {
      this.isAuthenticated = true;
    }
    
    console.log("auth check");
    console.log(this.isAuthenticated);

    return this.isAuthenticated;
  },
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={
    (props) => (
    fakeAuth.authenticate() === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)
const routing =(
  <AuthProvider>
      <Router>
      <Switch>
                <PrivateRoute  path="/" component={App} exact />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route path="/user/edit/:userId" component={EditUser} />
                <PrivateRoute  path="/users" component= {Users}></PrivateRoute >
        </Switch>
        </Router>
        </AuthProvider>
);
ReactDOM.render(routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
