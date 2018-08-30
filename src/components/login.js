import React from "react"
import api from  "../utility/query"
import './styles/login.css'

class Login extends React.Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(){
   
    let email = this.refs.email.value; 
    let password = this.refs.password.value;
    const user = await api.create("/users/login",{ email, password });

    if(user && user.auth){
      window.localStorage.clear();
      window.localStorage.setItem("token", user.token);
      this.props.currentUser(user);
      this.props.history.push("/");
    }
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