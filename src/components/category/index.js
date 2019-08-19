import { connect } from "react-redux";
import Component from "./component";

export default connect(
  state => ({
    transactions: state.transactions.entries,
    darkMode: state.common.darkMode,
  }),

  dispatch => ({
    selectCategory: payload => dispatch({ type: "SELECT_CATEGORY", payload }),
    remove: category => dispatch({ type: "REMOVE_CATEGORY", category }),
  }),
)(Component);
