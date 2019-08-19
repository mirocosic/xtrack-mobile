import { connect } from "react-redux";
import Component from "./component";

export default connect(
  state => ({
    darkMode: state.common.darkMode,
    entries: state.transactions.entries,
    transferMode: state.transactions.transferMode,
    selectedTransaction: state.transactions.selectedTransaction,
    toAccount: state.accounts.toAccount,
    fromAccount: state.accounts.fromAccount,
    selectedLabel: state.labels.selectedLabel,
    accounts: state.accounts.items,
    categories: state.categories.items,
  }),

  dispatch => ({
    add: transaction => dispatch({ type: "ADD_TRANSACTION", transaction }),
    edit: transaction => dispatch({ type: "EDIT_TRANSACTION", transaction }),
    remove: transaction => dispatch({ type: "DELETE_TRANSACTION", transaction }),
    transfer: transaction => dispatch({ type: "TRANSFER_TRANSACTION", transaction }),
    setType: transactionType => dispatch({ type: "SET_TYPE", transactionType }),
    selectCategory: payload => dispatch({ type: "SELECT_CATEGORY", payload }),
    setTransferMode: value => dispatch({ type: "SET_TRANSFER_MODE", value }),
    clearSelectedCategory: () => dispatch({ type: "CLEAR_SELECTED_CATEGORY" }),
    attachLabel: payload => dispatch({ type: "ATTACH_LABEL", payload }),
    removeLabel: label => dispatch({ type: "REMOVE_LABEL", label }),
    changeAccountFilter: account => dispatch({ type: "CHANGE_ACCOUNT_FILTER", account }),
    setTo: payload => dispatch({ type: "SELECT_TO_ACCOUNT", payload }),
    setFrom: payload => dispatch({ type: "SELECT_FROM_ACCOUNT", payload }),
    changeTransactionAmount: amount => dispatch({ type: "CHANGE_TRANSACTION_AMOUNT", amount }),
    clearTransactionForm: defaultAccount => dispatch({ type: "CLEAR_TRANSACTION_FORM", defaultAccount }),
  }),
)(Component);
