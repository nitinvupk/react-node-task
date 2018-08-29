import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import User from "./userView";
import AdminPanel from "../containers/adminPanel";
import './styles/index.css';

class App extends Component {
  
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/admin" component={AdminPanel} />
          <Route path="/user" component={User} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;