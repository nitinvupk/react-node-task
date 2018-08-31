import React from 'react'
import api from  "../../utility/query"

class userDetailsForm extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e){
    const name = this.refs.name.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const token = false;
    let users;
    if(this.props.createUser){
      const role = this.refs.role.value;
      const user = await api.create('/users/register',{ name, email, password, role, token });
      window.alert(user.message);
      users = await api.get("/users/");
      this.props.listUser(users);
    }
    else{
      const user = await api.put(`/users/${this.props.user._id}`,{name,email,password});
      window.alert(user.message);
      users = await api.get("/users/");
      this.props.listUser(users);
    }
  }

  render(){
    return(
      <div>
        <h1>{this.props.createUser ? 'Create User' : 'Update User'}</h1>
  
        <label><b>Name</b></label>
        <input className="AdminInput" type="text" ref="name" defaultValue={this.props.createUser ? '' : this.props.user.name} placeholder="Enter your name" name="name" required/>
  
        <label><b>Email</b></label>
        <input className="AdminInput" type="text" ref="email" defaultValue={this.props.createUser ? '' : this.props.user.email} placeholder="Enter Email" name="email" required/>
  
        <label><b>Password</b></label>
        <input className="AdminInput" type="password" ref="password" placeholder="Enter Password" name="psw" required/>
        <label><b>Role</b></label><br/>
        {this.props.createUser && (
          <select ref="role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>)
        }
        <br/>
        <button className="AdminInput" type="submit" onClick={this.handleSubmit}>{this.props.createUser ? 'Create User' : 'Update User'}</button>
      </div>
    );
  }
}

export default userDetailsForm;