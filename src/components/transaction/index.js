import { connect } from "react-redux";
import Component from "./component";

export default connect(
  state => ({
    darkMode: state.common.darkMode,
    categories: state.categories.items,
  }),

  dispatch => ({
    selectTransaction: transaction => dispatch({ type: "SELECT_TRANSACTION", transaction }),
    deleteTransaction: transaction => dispatch({ type: "DELETE_TRANSACTION", transaction }),
  }),
)(Component);
