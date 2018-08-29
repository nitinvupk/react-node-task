import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './styles/register.css';

class Register extends React.Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    let name = this.refs.name.value;
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    let role = this.refs.roles.value;
    axios.post("http://localhost:8000/users/register",
    {
      name: name,
      email: email,
      password: password,
      role: role
    })
    .then((res) =>{
      if(res.data.auth && res.data.token){
        window.localStorage.clear();
        window.localStorage.setItem("token", res.data.token);
        if(role === "admin"){
          this.props.history.push("/admin");
        }
        else{
          this.props.history.push("/user");
        }
      }
    })
    .catch()
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