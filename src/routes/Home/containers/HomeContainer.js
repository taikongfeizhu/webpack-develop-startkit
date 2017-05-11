import { connect } from 'react-redux'
import HomeView from '../components/HomeView'
import { actions } from '../modules/'
const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  home: state.home

})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
