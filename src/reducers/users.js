
const users = (state = [], action) => {
  switch (action.type) {
    case "LIST_USERS":
    if (!action.payload.success) return state;
      return action.payload.user;
    break;
    default:
      return state
  }
}

export default users;