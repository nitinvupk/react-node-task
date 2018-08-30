import React from "react";
import api from "../utility/query"

class User extends React.Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleLogout(e){
    const logout = await api.logout("/users/logout");
    this.props.currentUser({auth: true,currentUser: {}});
    if(!logout.auth) this.props.history.push("/login");

  }

  render(){
    return(
      <div>
        <h2>Hello World!</h2>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }

}

export default User;