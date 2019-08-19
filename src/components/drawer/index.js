import { connect } from "react-redux";
import Component from "./component";

export default connect(
  state => ({
    drawerOpen: state.common.drawerOpen,
    drawerContent: state.common.drawerContent,
    drawerIsCanceled: state.common.isCancelled,
  }),
  dispatch => ({
    closeDrawer: () => dispatch({ type: "CLOSE_DRAWER" }),
    applyFilters: forceUpdate => dispatch({ type: "APPLY_FILTERS", forceUpdate }),
    resetFilters: () => dispatch({ type: "RESET_FILTERS" }),
  }),
)(Component)
