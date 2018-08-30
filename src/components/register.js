import React from "react";
import api from  "../utility/query"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './styles/register.css';

class Register extends React.Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e){
    let name = this.refs.name.value;
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    let role = this.refs.roles.value;
    const user = await api.create("/users/register", { name, email, password, role })
    this.props.currentUser(user);
    window.localStorage.clear();
    window.localStorage.setItem("token", user.token);
    this.props.history.push("/");
  }

  render(){
    return(
      <div>
        <div className="container">
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>

          <label><b>Name</b></label>
          <input type="text" ref="name" placeholder="Enter your name" name="name" required/>

          <label><b>Email</b></label>
          <input type="text" ref="email" placeholder="Enter Email" name="email" required/>

          <label><b>Password</b></label>
          <input type="password" ref="password" placeholder="Enter Password" name="psw" required/>
          <label><b>Role</b></label><br/>
          <select ref="roles">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <hr/>
          <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

          <button type="submit" onClick={this.handleSubmit} className="registerbtn">Register</button>
        </div>
        
        <div className="container signin">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    );
  }
}

export default Register;