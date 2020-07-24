import {
    API
} from "../../backend";
import axios from 'axios';

//getAllBd or all users
export const getAllUsers = () => {
    return axios
        .get(`${API}/users`)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((err) => console.log(err));
};