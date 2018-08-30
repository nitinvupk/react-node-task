import { connect } from 'react-redux'
import { listUser,currentUser } from '../actions'
import AdminPanel from '../components/AdminPanel'

const mapStateToProps = state => ({
  users: state.users,
})

const mapDispatchToProps = {
  listUser,
  currentUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel)