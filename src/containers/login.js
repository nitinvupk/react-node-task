import { connect } from 'react-redux'
import { currentUser } from '../actions'
import Login from '../components/login'

const mapStateToProps = state => ({
  user: state.currentUser,
})

const mapDispatchToProps = {
  currentUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)