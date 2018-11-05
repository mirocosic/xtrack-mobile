import initialState from './initial-state';

const makeId = (items) => {
  return (items.length) ? items[items.length-1].id+1 : 0
}
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

    case "ADD_CATEGORY":
      return {
        ...state,
        items: [
          ...state.items,
          {id: makeId(state.items), name: action.payload}
        ]
      }

    case "DELETE_CATEGORY":
      return {
        ...state,
        items: state.items.filter((item)=>{
          return item.id !== action.payload
        })
      }

    case "SELECT_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload
      }

    case "ERASE":
      return {
        ...initialState
      }

    default:
      return state;
  }

}

export default categories;
