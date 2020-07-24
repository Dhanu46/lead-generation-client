import React, { useState, useEffect } from 'react'
import Base from '../core/Base';
import Logo from '../images/undraw_hey_email_liaa.svg';
import { getAllLeadsInFunnel } from './helper/leadapicall';
import Header from '../components/Header/Header';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

function Funnel() {
    const [funnels, setFunnels] = useState([]);
    const allLeads = () => {
        getAllLeadsInFunnel()
            .then(response => {
                console.log(response);
                setFunnels(response.data.reverse());
            })
            .catch(err => {
                console.log(err)
            });
    }
    useEffect(() => {
        allLeads();
    }, [])
    return (
        <Base>
            {/* <div className="d-flex align-items-center p-3 my-3 text-dark-50 bg-light rounded shadow-sm">
                <img className="mr-3" src={Logo} alt="" width="48" />
                <div className="lh-100">
                <h5 className="mb-0 text-dark lh-100">Leads in Funnel</h5>
                <small>Since 2020</small>
                </div>
            </div> */}
             <Header title="All Leads" />
            <div className="my-3 p-3 bg-white rounded shadow-sm">
                <h6 className="border-bottom border-gray pb-2 mb-3">Recent updates</h6>
                {
                    funnels.map((lead, index) => {
                        return (
                            <Link to={`funnel/${lead._id}`} key={lead._id} style={{ textDecoration: "none", marginTop: "6px", marginBottom: "15px" }}>
                                <div className={`media p-3 rounded mb-1 text-muted bg-light my-3`} id="Lead-List-Item">
                                <svg className="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32" fill={index % 2 ? "#6f42c1" : "#e83e8c"}><title>Placeholder</title><rect width="100%" height="100%"/></svg>
                                <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                    <strong className="d-block text-gray-dark">@{lead.name}</strong>
                                    {lead.description}
                                    <strong className="d-block text-primary">{lead.company}</strong>
                                    <strong className="d-block text-gray-dark">by {lead.businessDev}{" "} 
                                        - <Moment fromNow>{lead.createdAt}</Moment>
                                    </strong>
                                </p>
                                <strong className={`d-block mr-1 ${lead.contacted ? "text-success" : "text-muted"}`}
                                    style={{ fontSize: "2rem" }} data-toggle="tooltip" data-placement="top"
                                        title={lead.contacted ? "Contacted" : "Not contacted"}>
                                        <i className="fa fa-check-square-o" aria-hidden="true"></i>
                                </strong>
                                    <strong className={`d-block mr-5 ${lead.followups ? "text-warning" : "text-muted"}`}
                                            style={{ fontSize: "2rem" }} data-toggle="tooltip" data-placement="top"
                                                title={lead.followups ? "Need followup today" : "No followup today"}>
                                                <i className="fa fa-clock-o" aria-hidden="true"></i>
                                    </strong>
                                </div>
                            </Link>
                        );
                    })
                }
            </div>
        </Base>
    )
}

export default Funnel;
