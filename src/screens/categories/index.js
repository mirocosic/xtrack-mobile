import { connect } from "react-redux";
import Component from "./component";

export default connect(
  (state) => {
    return {
      transactions: state.transactions.entries,
      categories: state.categories.items,
      darkMode: state.common.darkMode
    }
  },

  (dispatch) => {
    return {
      add: (payload) => dispatch({type: "ADD_CATEGORY", payload}),
      delete: (payload) => dispatch({type: "DELETE_CATEGORY", payload}),
      selectCategory: (payload) => dispatch({type: "SELECT_CATEGORY", payload})
    }
  }
)(Component);
