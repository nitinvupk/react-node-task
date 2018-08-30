import { connect } from 'react-redux'
import { currentUser } from '../actions'
import App from '../components/app'

const mapStateToProps = state => ({
  user: state.currentUser,
})

const mapDispatchToProps = {
  currentUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)