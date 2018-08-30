import { connect } from 'react-redux'
import { currentUser } from '../actions'
import  User from '../components/user'

const mapDispatchToProps = {
  currentUser,
};

export default connect(
  null,
  mapDispatchToProps
)(User)