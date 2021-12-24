import { connect } from "react-redux"
import Component from "./component"

export default connect(
  state => ({
    transactions: state.transactions.entries,
    categories: state.categories.items,
    darkMode: state.common.darkMode,
    appVersion: state.common.appVersion
  }),

  dispatch => ({
    restoreBackup: data => dispatch({ type: "RESTORE_BACKUP", data }),
  }),
)(Component)