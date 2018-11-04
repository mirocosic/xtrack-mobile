import initialState from './initial-state';

const categories = (state = initialState, action) => {
  switch(action.type){

    case "ADD_NEW_CATEGORY":
      return {
        ...state,
        items: [
          ...state.items,
          {id: state.items[state.items.length-1].id+1, name: action.payload.name, note: action.payload.note}
        ]
      }

    case "SELECT_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload
      }

    default:
      return state;
  }

}

export default categories;
