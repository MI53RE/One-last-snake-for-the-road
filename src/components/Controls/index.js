import { connect } from 'react-redux'
import { updateOptions } from 'store/ducks/options'
import Controls from './presentational'

const mapStateToProps = (state) => ({
  options: state.options
})

const mapDispatchToProps = (dispatch) => ({
  onUpdate: (data) => dispatch(updateOptions(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
