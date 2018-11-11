import { connect } from 'react-redux';
import Component from './component';

export default connect(
  (state) => {
    return {
      darkMode: state.common.darkMode,
      entries: state.transactions.entries,
      transferMode: state.transactions.transferMode,
      
      selectedTransaction: state.transactions.selectedTransaction,
      toAccount: state.accounts.toAccount,
      fromAccount: state.accounts.fromAccount,
      selectedLabel: state.labels.selectedLabel
    }
  },

  (dispatch) => {
    return {
      add: (transaction) => dispatch({type: "ADD_TRANSACTION", transaction}),
      edit: (transaction) => dispatch({type: "EDIT_TRANSACTION", transaction}),
      delete: (transaction) => dispatch({type: "DELETE_TRANSACTION", transaction}),
      transfer: (transaction) => dispatch({type: "TRANSFER_TRANSACTION", transaction}),
      setType: (transactionType) => dispatch({type:"SET_TYPE", transactionType}),
      setTransferMode: (value) => dispatch({type:"SET_TRANSFER_MODE", value}),
      clearSelectedCategory: () => dispatch({type: "CLEAR_SELECTED_CATEGORY"}),
      attachLabel: (payload) => dispatch({type: "ATTACH_LABEL", payload}),
      removeLabel: (label) => dispatch({type: "REMOVE_LABEL", label})
    }
  }
)(Component);
