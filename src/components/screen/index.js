import { connect } from "react-redux"
import Component from "./component"

export default connect(state => ({ darkMode: state.common.darkMode }))(Component)
