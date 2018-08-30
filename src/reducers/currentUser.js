const currentUser = (state = { currentUser: null, error: null }, action) => {
    switch (action.type) {
      case "CURRENT_USER":
        if (!action.payload.auth) return { ...state, error: action.payload.message};
          return { currentUser: action.payload.currentUser};
      default:
        return state
    }
  }
  
export default currentUser;