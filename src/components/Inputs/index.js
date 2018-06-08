import { connect } from 'react-redux'
import Input from './presentational'

const mapStateToProps = (state) => ({
  keyCode: state.inputs.keyCode,
})

export default connect(mapStateToProps)(Input)
