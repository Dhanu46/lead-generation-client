import {
    combineReducers,
    createStore
} from "redux";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import leadReducer from "./reducers/leadReducer";

let reducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    leads: leadReducer
});

let store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
    console.log("dispatched: ", store.getState());
});

function stateMapper(state) {
    return state;
}

export {
    store,
    stateMapper
};
