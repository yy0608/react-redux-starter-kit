const todo = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case TOGGLE_TODO:
      return {
        if(action.id !== state.id) {
          return state
        }
      }
      return Object.assign({}, state, {
        completed: !action.completed
      })
    default:
      return state
  }
}
