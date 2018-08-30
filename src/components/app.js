import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Login from "../containers/login"
import Register from "../containers/register"
import User from "../containers/user"
import AdminPanel from "../containers/adminPanel"
import api from "../utility/query"
import './styles/index.css'

class App extends Component {

  async componentWillMount () {
    if(window.localStorage.getItem("token")){
      const user = await api.get("/users/getuser/currentUser");
      this.props.currentUser(user);
    }
  }
  
  render() {
    const PrivateRoute = ({component: Component, authenticated, ...rest}) => (
      <Route
        {...rest}
        render={(props) => authenticated === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login'}} />}
      />
    )

    const UnAuthenticatedRoute = ({component: Component, authenticated, ...rest}) => (
      <Route
        {...rest}
        render={(props) => authenticated === true 
          ? <Redirect to={{pathname: '/'}} />
          : <Component {...props} />}
      />
    )
    const authenticated = !!window.localStorage.getItem("token")
    const isAdmin = this.props.user.role === "admin"
    return (
      <Router>
        <div className="App">
        <UnAuthenticatedRoute exact authenticated={authenticated} path="/login" component={Login} />
        <UnAuthenticatedRoute exact authenticated={authenticated} path="/register" component={Register} />
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