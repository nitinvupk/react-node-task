const currentUser = (state = {}, action) => {
    switch (action.type) {
      case "CURRENT_USER":
        if (!action.payload.auth) return action.payload;
          return action.payload.currentUser;
      default:
        return state
    }
  }
  
export default currentUser;