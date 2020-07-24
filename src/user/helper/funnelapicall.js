import {
    API
} from "../../backend";
import axios from 'axios';

//get lead details
export const getFunnelDetails = (funnelId, userId) => {
    return axios
        .get(`${API}/funnel/${funnelId}/${userId}`)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((err) => console.log(err));
};

//update lead
export const updateFunnel = (funnel, funnelId, userId) => {
    return axios
        .put(`${API}/funnel/${funnelId}/${userId}`, funnel)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((err) => console.log(err));
};