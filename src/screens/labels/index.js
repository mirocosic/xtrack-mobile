import { connect } from "react-redux"
import Component from "./component"

export default connect(
  state => ({ labels: state.labels.items, transactions: state.transactions.entries }),

  dispatch => ({
    add: payload => dispatch({ type: "ADD_LABEL", payload }),
    deleteLabel: payload => dispatch({ type: "DELETE_LABEL", payload }),
    select: payload => dispatch({ type: "SELECT_LABEL", payload }),
  }),
)(Component)
