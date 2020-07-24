import {
    API
} from "../../backend";
import axios from 'axios';

//createlead
export const createLead = (lead, userId) => {
    return axios
        .post(`${API}/create/lead/${userId}`, lead)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((err) => console.log(err));
};

//getAllleads
export const getAllLeads = () => {
    return axios
        .get(`${API}/leads`)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((err) => console.log(err));
};


//getAllleadsinfunnel
export const getAllLeadsInFunnel = () => {
    return axios
        .get(`${API}/funnels`)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((err) => console.log(err));
};

//get lead details
export const getLeadDetails = (leadId, userId) => {
    return axios
        .get(`${API}/lead/${leadId}/${userId}`)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((err) => console.log(err));
};

//update lead
export const updateLead = (lead, leadId, userId) => {
    return axios
        .put(`${API}/lead/${leadId}/${userId}`, lead)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((err) => console.log(err));
};

//archive lead
export const archiveLead = (lead,leadId, userId) => {
    return axios
        .post(`${API}/create/archive/${leadId}/${userId}`, lead)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((err) => console.log(err));
};

export const moveLead = (lead, leadId, userId) => {
    return axios
        .post(`${API}/create/funnel/${leadId}/${userId}`, lead)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((err) => console.log(err));
};