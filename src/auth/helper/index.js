import {
    API
} from "../../backend";
import axios from 'axios';
import { store } from "../../store/store";

//signup
export const signup = (user) => {
    return axios
    .post(`${API}/signup`, user)
    .then((response) => {
        console.log(response);
        return response;
    })
    .catch((err) => console.log(err));
};

//signin
export const signin = user => {
    return axios
      .post(`${API}/signin`, user)
      .then((response) => {
          console.log(response)
        return response;
      })
      .catch((err) => console.log(err));
};


//authenticate or save json web toke to local storage
export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

//signout of local storage and remove token
export const signout = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        store.dispatch({
                type: "LOGOUT_CURRENT_USER"
        });
        return fetch(`${API}/signout`, {
                method: "GET"
            })
            .then(response => console.log("signout success"))
            .catch(err => console.log(err));
     }
};

export const isAuthenticated = () => {
    if (typeof window === "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};