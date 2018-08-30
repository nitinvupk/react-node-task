const currentUser = (state = {}, action) => {
    switch (action.type) {
      case "CURRENT_USER":
      debugger;
      if (!action.payload.auth) return state;
        return action.payload.currentUser;
      break;
      default:
        return state
    }
  }
  
export default currentUser;