let initialState = {
    isAuthenticated: false,
    token: "",
    user: {}
};

function authReducer(state = initialState, action) {
    if (action.type === "SET_CURRENT_USER") {
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload,
            token: action.token
        };
    }
    if (action.type === "LOGOUT_CURRENT_USER") {
        return {
            ...state,
            isAuthenticated: false,
            token: "",
            user: {}
        };
    }
    return state;
}

export default authReducer;
