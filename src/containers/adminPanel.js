import { connect } from 'react-redux'
import { listUser } from '../actions'
import AdminPanel from '../components/AdminPanel'

const mapStateToProps = state => ({
  users: state.users,
})

const mapDispatchToProps = {
    listUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel)