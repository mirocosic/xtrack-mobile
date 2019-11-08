import { connect } from "react-redux";
import Component from "./component";

export default connect(
  state => ({
    labels: state.labels.items,
    darkMode: state.common.darkMode,
  }),

  dispatch => ({
    add: label => dispatch({ type: "ADD_LABEL", label }),
    edit: label => dispatch({ type: "EDIT_LABEL", label }),
    delete: payload => dispatch({ type: "DELETE_LABEL", payload }),
    select: payload => dispatch({ type: "SELECT_LABEL", payload }),
  }),
)(Component)
