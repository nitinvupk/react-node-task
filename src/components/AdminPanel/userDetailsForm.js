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
    let users;
    if(this.props.createUser){
      const role = this.refs.role.value;
      await api.create('/users/create',{ name,email,password,role });
      users = await api.get("/users/");
      this.props.listUser(users);
    }
    else{
      await api.put(`/users/${this.props.user._id}`,{name,email,password});
      users = await api.get("/users/");
      this.props.listUser(users);
    }
  }

  render(){
    return(
      <div>
        <div className="container">
          <h1>{this.props.createUser ? 'Create User' : 'Update User'}</h1>
    
          <label><b>Name</b></label>
          <input type="text" ref="name" defaultValue={this.props.createUser ? '' : this.props.user.name} placeholder="Enter your name" name="name" required/>
    
          <label><b>Email</b></label>
          <input type="text" ref="email" defaultValue={this.props.createUser ? '' : this.props.user.email} placeholder="Enter Email" name="email" required/>
    
          <label><b>Password</b></label>
          <input type="password" ref="password" placeholder="Enter Password" name="psw" required/>
          <label><b>Role</b></label><br/>
          {this.props.createUser && (
            <select ref="role">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>)
          }
          <hr/>
          <button type="submit" onClick={this.handleSubmit} className="registerbtn">{this.props.createUser ? 'Create User' : 'Update User'}</button>
        </div>
      </div>
    );
  }
}

export default userDetailsForm;