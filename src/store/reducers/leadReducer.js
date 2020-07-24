let initialState = {
    leads: []
};

function leadReducer(state = initialState, action) {
    if (action.type === "GET_LEADS") {
        return {
            ...state,
            leads: action.payload
        };
    }
    return state;
}

export default leadReducer;
