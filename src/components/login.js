import React from "react";
import axios from "axios";
import './styles/login.css';

class Login extends React.Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(){
   
    let email = this.refs.email.value; 
    let password = this.refs.password.value;
    axios.post("http://localhost:8000/users/login",{
      email: email,
      password: password
    })
    .then((res) =>{
      if(res.data.auth && res.data.token){
        window.localStorage.clear();
        window.localStorage.setItem("token", res.data.token);
        if(res.role === "admin"){
          this.props.history.push("/admin");
        }
        else{
          this.props.history.push("/user");
        }
      }
    })
    .catch()
  }
  
  render() {
    return(
      <div className="container">
        <h1>Login</h1>
  
        <label><b>Email</b></label>
        <input type="text" ref="email" placeholder="Enter Email" name="email" required/>

        <label><b>Password</b></label>
        <input type="password" ref="password" placeholder="Enter Password" name="psw" required/>

        <button type="submit" onClick={this.handleSubmit} >Login</button>
        <div className="container signin">
        <p>Don't have an account? <a href="/register">Sign up</a></p>
        </div>
      </div>
    );
  }
}

export default Login;