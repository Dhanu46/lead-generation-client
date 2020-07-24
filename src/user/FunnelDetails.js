import React, { useEffect, useState } from 'react'
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { useHistory } from 'react-router-dom';
import { getFunnelDetails } from './helper/funnelapicall';
import Header from '../components/Header/Header';
import Moment from 'react-moment';

function FunnelDetails(props) {
    const [funnelDetails, setFunnelDetails] = useState({});
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();
    console.log(props.match.params.funnelId);
    const funnelId = props.match.params.funnelId;
    const userId = isAuthenticated().user._id;
    const goToUpdate = () => {
        history.push(`/update/funnel/${funnelId}`)
    }

    const getFunnelInfo = () => {
        getFunnelDetails(funnelId, userId)
            .then(response => {
                console.log(response);
                setFunnelDetails(response.data);
            })
            .catch(err => {
                console.log(err)
            });
    };

    useEffect(() => {
        getFunnelInfo();
    }, []);

    const progressbarWidth = () => {
        if (funnelDetails.funnelStage === 'awareness') {
            return {
                width: "25%"
            }
        } else if (funnelDetails.funnelStage === 'interest') {
            return {
                width: "45%"
            }
        } else if (funnelDetails.funnelStage === 'consideration') {
            return {
                width: "65%"
            }
        } else {
            return {
                width: "100%"
            }
        }
    }

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
            <Header title="Funnel Leads" />
            <div className={`card p-3 rounded text-muted mb-5"}`} id="Lead-Details-Card" style={{ fontSize: "1.2rem"}}>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={progressbarWidth()} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                                {successMessage()}
                                {errorMessage()}
                                    <h5>
                                        <strong className="text-dark mb-2">@{funnelDetails.name}</strong>
                                        <span className="text-info mb-2 ml-1"> - {funnelDetails.roleInOrganisation}
                                        </span>
                                    </h5>
                                <p className="media-body pb-3 mb-3 small lh-125 border-bottom border-gray">
                                    <strong className="d-block text-muted mb-2">Project Description : </strong>
                                    <textarea className="d-block text-muted mb-2 form-control" value={funnelDetails.description} readOnly></textarea>
                                    {
                                        funnelDetails.remarks && 
                                        (<React.Fragment><strong className="d-block text-muted mb-2">Last followup Remarks : </strong>
                                        <textarea className="d-block text-muted mb-2 form-control" value={funnelDetails.remarks} readOnly></textarea></React.Fragment>)
                                    }
                                    <strong className="d-block text-muted mb-2">{funnelDetails.company}</strong>
                                    <strong className="d-block text-muted mb-2"><a href={`mailto: ${funnelDetails.email}`}><i className="fa fa-telegram mr-1" aria-hidden="true"></i>
                                    {funnelDetails.email}</a></strong>
                                    <strong className="d-block text-muted mb-2">{funnelDetails.country}</strong>
                                    {
                                        funnelDetails.followups &&
                                            <strong className="d-block text-info mb-2"> Next Followup at {" "}
                                                <Moment>{funnelDetails.followupTime}</Moment></strong>
                                    }
                                    <strong className="d-block text-muted mb-2">{funnelDetails.city}</strong>
                                    <strong className="d-block text-muted mb-2">{funnelDetails.phone}</strong>
                                    <strong className="d-block text-success mb-2">
                                        Current Stage : <span className="text-danger">{funnelDetails.funnelStage}</span></strong>
                                    {/* <strong className="d-block text-muted mb-2">Contacted - {funnelDetails.contacted ? "yes" : "no"}</strong> */}
                                    <strong className="d-block text-gray-dark mb-2">by {funnelDetails.businessDev}{" "} 
                                        - <Moment fromNow>{funnelDetails.createdAt}</Moment>
                                    </strong>
                                    {
                                        funnelDetails.updatedby ? (
                                            <strong className="d-block text-gray-dark mb-2">last updated at{" "} 
                                                - <Moment fromNow>{funnelDetails.updatedAt}</Moment> by {funnelDetails.updatedby}
                                            </strong>
                                        ) : ""
                                    }
                                    <strong className={`mr-3 ${funnelDetails.contacted ? "text-success" : "text-muted"}`}
                                    style={{ fontSize: "2rem" }} data-toggle="tooltip" data-placement="top"
                                        title={funnelDetails.contacted ? "Contacted" : "Not contacted"}>
                                        <i className="fa fa-check-square-o" aria-hidden="true"></i>
                                    </strong>
                                    <strong className={`mr-5 ${funnelDetails.followups ? "text-warning" : "text-muted"}`}
                                        style={{ fontSize: "2rem" }} data-toggle="tooltip" data-placement="top"
                                            title={funnelDetails.followups ? "Need followup" : "No followup"}>
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                    </strong>
                                </p>
                    <div className="d-block btn-group">
                    <a type="button" className="btn btn-outline-primary mr-1" href={`mailto: ${funnelDetails.email}`}>Email Lead</a>
                    <button type="button" className="btn btn-outline-info mr-1" onClick={goToUpdate}>Update</button>
                    <button type="button" className="btn btn-outline-dark" onClick={() => history.goBack()}>Go Back</button>
                    </div>
            </div>
        </Base>
    )
}

export default FunnelDetails;
