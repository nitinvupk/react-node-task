import React from "react";
import axios from "axios";

class User extends React.Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e){
    axios.get("http://localhost:8000/users/logout")
    .then((res) => {
      if(res.data.auth === false){
        window.localStorage.clear();
        this.props.history.push("/login");
      }
    })

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