import { connect } from 'react-redux'
import DataSearch from '../components/DataSearch'
import { actions } from '../modules/'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  thunk: state.thunk_demo.toJS()
})

export default connect(mapStateToProps, mapDispatchToProps)(DataSearch)
