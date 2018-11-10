import initialState from './initial-state';

const makeId = (items) => {
  return (items.length) ? items[items.length-1].id+1 : 0
}

const labels = (state = initialState, action) => {
  switch(action.type){

    case "ADD_LABEL":
      return {
        ...state,
        items: [
          ...state.items,
          {id: makeId(state.items), name: action.payload.name, color: action.payload.color}
        ]
      }

    case "DELETE_LABEL":
      return {
        ...state,
        items: state.items.filter((item)=>{
          return item.id !== action.payload
        })
      }

     case "SELECT_LABEL":
       return {
        ...state,
        selectedLabel: action.payload
      }

    case "ERASE":
      return {
        ...initialState
      }

    default:
      return state;
  }

}

export default labels;
