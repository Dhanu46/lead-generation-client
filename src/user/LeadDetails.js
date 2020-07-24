import React, { useState, useEffect } from 'react'
import Base from '../core/Base';
import Header from '../components/Header/Header';
import { getLeadDetails, moveLead } from './helper/leadapicall';
import { isAuthenticated } from '../auth/helper';
import Moment from 'react-moment';
import { useHistory, Link } from 'react-router-dom';
import { archiveLead } from './helper/leadapicall';

function LeadDetails(props) {
    const [leadDetails, setLeadDetails] = useState({});
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();
    console.log(props.match.params.leadId);
    const leadId = props.match.params.leadId;
    const userId = isAuthenticated().user._id;
    const goToUpdate = () => {
        history.push(`/update/lead/${leadId}`)
    }
    const getLeadInfo = () => {
        getLeadDetails(leadId, userId)
            .then(response => {
                console.log(response);
                setLeadDetails(response.data);
            })
            .catch(err => {
                console.log(err)
            });
    };

    const createArchiveLead = () => {
        archiveLead(leadDetails, leadId, userId)
            .then(response => {
                console.log(response);
                if (response.data) {
                    setSuccess(response.data.message);
                } else {
                    setError(response.data.error);
                }
            })
    }

    const moveLeadToFunnel = () => {
        moveLead(leadDetails, leadId, userId)
            .then(response => {
                console.log(response);
                if(!response) {
                    setError("Already in Funnel");
                }
                if (response.data) {
                    setSuccess(response.data.message);
                }
            })
    }

    useEffect(() => {
        getLeadInfo();
    }, []);

    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left mt-3">
                    <div className="alert alert-success"
                        style={{ display: success ? "" : "none" }}>
                        {success}
                    </div>
                </div>
            </div>    
        )
    };

    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left mt-1">
                    <div className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}>
                        {error}
                    </div>
                </div>
            </div>        
        )
    };
    return (
        <Base>
            <Header title="Lead Details" />
            <div className={`card p-3 rounded text-muted mb-5"}`} id="Lead-Details-Card" style={{ fontSize: "1.2rem"}}>
                                <svg className="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32" fill="#6f42c1"><title>Placeholder</title><rect width="100%" height="100%"/></svg>
                                {successMessage()}
                                {errorMessage()}
                                <p className="media-body pb-3 mb-3 small lh-125 border-bottom border-gray">
                                    <strong className="text-gray-dark mb-2">@{leadDetails.name}</strong>
                                    <span className="text-info mb-2 ml-1"> - {leadDetails.roleInOrganisation}
                                    </span>
                                    <strong className="d-block text-muted mb-2">Project Description : </strong>
                                    <textarea className="d-block text-muted mb-2 form-control" value={leadDetails.description} readOnly></textarea>
                                    {
                                        leadDetails.remarks && 
                                        (<React.Fragment><strong className="d-block text-muted mb-2">Last followup Remarks : </strong>
                                        <textarea className="d-block text-muted mb-2 form-control" value={leadDetails.remarks} readOnly></textarea></React.Fragment>)
                                    }
                                    <strong className="d-block text-muted mb-2">{leadDetails.company}</strong>
                                    <strong className="d-block text-muted mb-2"><a href={`mailto: ${leadDetails.email}`}><i className="fa fa-telegram mr-1" aria-hidden="true"></i>
                                    {leadDetails.email}</a></strong>
                                    <strong className="d-block text-muted mb-2">{leadDetails.country}</strong>
                                    {
                                        leadDetails.followups &&
                                            <strong className="d-block text-info mb-2"> Next Followup at {" "}
                                                <Moment>{leadDetails.followupTime}</Moment></strong>
                                    }
                                    <strong className="d-block text-muted mb-2">{leadDetails.city}</strong>
                                    <strong className="d-block text-muted mb-2">{leadDetails.phone}</strong>
                                    {/* <strong className="d-block text-muted mb-2">Contacted - {leadDetails.contacted ? "yes" : "no"}</strong> */}
                                    <strong className="d-block text-gray-dark mb-2">by {leadDetails.businessDev}{" "} 
                                        - <Moment fromNow>{leadDetails.createdAt}</Moment>
                                    </strong>
                                    {
                                        leadDetails.updatedby ? (
                                            <strong className="d-block text-gray-dark mb-2">last updated at{" "} 
                                                - <Moment fromNow>{leadDetails.updatedAt}</Moment> by {leadDetails.updatedby}
                                            </strong>
                                        ) : ""
                                    }
                                    <strong className={`mr-3 ${leadDetails.contacted ? "text-success" : "text-muted"}`}
                                    style={{ fontSize: "2rem" }} data-toggle="tooltip" data-placement="top"
                                        title={leadDetails.contacted ? "Contacted" : "Not contacted"}>
                                        <i className="fa fa-check-square-o" aria-hidden="true"></i>
                                    </strong>
                                    <strong className={`mr-5 ${leadDetails.followups ? "text-warning" : "text-muted"}`}
                                        style={{ fontSize: "2rem" }} data-toggle="tooltip" data-placement="top"
                                            title={leadDetails.followups ? "Need followup" : "No followup"}>
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                    </strong>
                                </p>
                    <div className="d-block btn-group">
                    <button type="button" onClick={createArchiveLead} className="btn btn-outline-danger ml-2 mr-1">Archive</button>
                    <button type="button" className="btn btn-outline-info mr-1" onClick={goToUpdate}>Update</button>
                    <button type="button" onClick={moveLeadToFunnel} className="btn btn-outline-success mr-1">Move to funnel</button>
                    <a type="button" className="btn btn-outline-primary mr-1" href={`mailto: ${leadDetails.email}`}>Email Lead</a>
                    <button type="button" className="btn btn-outline-dark" onClick={() => history.goBack()}>Go Back</button>
                    </div>
            </div>
        </Base>
    )
}

export default LeadDetails;
