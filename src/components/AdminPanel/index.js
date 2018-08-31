import React from "react"
import api from  "../../utility/query"
import UsersList from "./usersList"
import UserDetailsForm from "./userDetailsForm"
import Pagination from "./pagination"

class AdminPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showCreateNewUser: false,
      showEditUser: false,
      updateUser: {},
      pageUsers: [],
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }


  onChangePage (pageUsers) {
    this.setState(prevProps => ({ ...prevProps, pageUsers }));
  }

  async componentDidMount(){
    const users = await api.get("/users/");
    this.props.listUser(users);
  }

  handleEdit(e){
    const updateUser = this.props.users.find(u => u._id === e.target.id);
    this.setState(prevState => ({
      ...prevState,
      showEditUser:  !prevState.showEditUser,
      updateUser, 
      showCreateNewUser: false})
    )
  }

  async handleDelete(e){
    await api.remove(`/users/${e.target.id}`);
    const users = await api.get("/users/");
    this.props.listUser(users);
  }

  async handleLogout(e){
    const logout = await api.get("/users/logout");
    this.props.currentUser({auth: true,currentUser: {}});
    if(!logout.auth) this.props.history.push("/login");
  }

  handleCreate(e){
    this.setState(prevState => ({ ...prevState, showCreateNewUser:  !prevState.showCreateNewUser, showEditUser: false}))
  }

  render(){
    const showListUsers = !this.state.showCreateNewUser && !this.state.showEditUser;
    return(
      <div className="container">
        <div className="row">
          <button onClick={this.handleLogout}>Logout</button>
          <h1>Admin Panel</h1>
          <div className="col-md-10 col-md-offset-1">
            <div className="panel panel-default panel-table">
              <div className="panel-heading">
                <div className="row">
                  <div className="col col-xs-6">
                    <button type="button" onClick={() => this.setState({showCreateNewUser: false, showEditUser: false})} className="btn btn-sm btn-primary btn-create">List Users</button>
                  </div>
                  <div className="col col-xs-6 text-right">
                    <button type="button" onClick={this.handleCreate} className="btn btn-sm btn-primary btn-create">Create New</button>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                {  showListUsers && <UsersList {...this.props} listUser={this.props.listUser} users={this.state.pageUsers} handleDelete={this.handleDelete} handleEdit={this.handleEdit} /> }
                {  this.state.showCreateNewUser && <UserDetailsForm createUser listUser={this.props.listUser}/> }
                {  this.state.showEditUser && <UserDetailsForm editUser listUser={this.props.listUser} user={this.state.updateUser}/> }
                { showListUsers && <Pagination items={this.props.users} onChangePage={this.onChangePage }/>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPanel;