import { connect } from 'react-redux';
import Component from './component';

export default connect(
  (state) => {
    return {
      categories: state.categories.items
    }
  },

  (dispatch) => {
    return {
      selectCategory: (payload) => dispatch({type: "SELECT_CATEGORY", payload})
    }
  }
)(Component);
