import { connect } from "react-redux";
import Component from "./component";

export default connect(
  state => ({
    drawerOpen: state.common.drawerOpen,
    drawerContent: state.common.drawerContent,
    drawerIsCanceled: state.common.isCancelled,
    accounts: state.accounts.items,
    accountFilter: state.accounts.accountFilter,
    categoryFilter: state.categories.categoryFilter,
    categories: state.categories.items,
  }),
  dispatch => ({
    closeDrawer: () => dispatch({ type: "CLOSE_DRAWER" }),
    applyFilters: forceUpdate => dispatch({ type: "APPLY_FILTERS", forceUpdate }),
    resetFilters: () => dispatch({ type: "RESET_FILTERS" }),
    changeAccountFilter: account => dispatch({ type: "CHANGE_ACCOUNT_FILTER", account }),
    changeCategoryFilter: category => dispatch({ type: "CHANGE_CATEGORY_FILTER", category }),
  }),
)(Component)
