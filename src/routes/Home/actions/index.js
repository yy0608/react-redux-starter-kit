
let nextTodoId = 0

export const addTodo = (text) => {
  return {
    type: "ADD_TODO",
    id: nextTodoId,
    text
  }
}

export const setVisibility = (filter) => {
  type: "SET_VISIBILITY",
  filter
}

export const toggleTodo = (id) => {
  return {
    type: "TOGGLE_TODO",
    id
  }
}
