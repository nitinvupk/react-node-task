import { connect } from 'react-redux'
import { currentUser } from '../actions'
import Register from '../components/register'

const mapStateToProps = state => ({
  user: state.currentUser,
})

const mapDispatchToProps = {
  currentUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)