import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Login from "../containers/login"
import Register from "../containers/register"
import User from "./userView"
import AdminPanel from "../containers/adminPanel"
import api from "../utility/query"
import './styles/index.css'

class App extends Component {

  async componentWillMount () {
    const user = await api.get("/users/getuser/currentUser");
    this.props.currentUser(user);
  }
  
  render() {
    debugger;
    const PrivateRoute = ({component: Component, authenticated, ...rest}) => (
      <Route
        {...rest}
        render={(props) => authenticated === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login'}} />}
      />
    )
    const authenticated = !!window.localStorage.getItem("token")
    const isAdmin = this.props.user.role === "admin"
    return (
      <Router>
        <div className="App">
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          { 
            isAdmin ? <PrivateRoute exact authenticated={authenticated} component={AdminPanel} path="/" />
            : <PrivateRoute exact authenticated={authenticated} component={User} path="/" />
          }
        </div>
      </Router>
    );
  }
}

export default App;