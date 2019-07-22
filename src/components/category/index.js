import { connect } from "react-redux";
import Component from "./component";

export default connect(
  state => ({
    transactions: state.transactions.entries,
  }),

  dispatch => ({
    selectCategory: payload => dispatch({ type: "SELECT_CATEGORY", payload }),
    deleteCategory: id => dispatch({ type: "DELETE_CATEGORY", id }),
  }),
)(Component);
