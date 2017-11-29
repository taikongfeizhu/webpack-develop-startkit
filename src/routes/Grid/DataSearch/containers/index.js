import { connect } from 'react-redux'
import DataSearch from '../components/DataSearch'
import { actions } from '../modules/'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  curd: state.grid_curd
})

export default connect(mapStateToProps, mapDispatchToProps)(DataSearch)
