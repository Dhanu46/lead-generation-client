import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { isAuthenticated } from '../auth/helper';
import { getLeadDetails, updateLead } from './helper/leadapicall';
import Header from '../components/Header/Header';
import Base from '../core/Base';
import { useHistory } from 'react-router-dom';

function UpdateLead(props) {
    const [values, setValues] = useState({
        name: "",
        email: "",
        company: "",
        roleInOrganisation: "",
        description: "",
        phone: "",
        country: "",
        businessDev: "",
        contacted: "",
        followups: "",
        followupTime: "",
        remarks: "",
        city: "",
        error: "",
        success: false
    });

    // const [startDate, setStartDate] = useState(new Date());
    const [nextFollowupTime, setNextFollowupTime] = useState();
    const history = useHistory();
    const { user } = isAuthenticated();
    const leadId = props.match.params.leadId;
    const userId = isAuthenticated().user._id;

    const {
        name,
        email,
        company,
        roleInOrganisation,
        description,
        phone,
        country,
        followups,
        businessDev,
        contacted,
        city,
        remarks,
        error,
        success
    } = values;

    const getLeadInfo = () => {
        getLeadDetails(leadId, userId)
            .then(response => {
                console.log(response);
                setValues({
                    ...values,
                    ...response.data
                });
            })
            .catch(err => {
                console.log(err)
            });
    }
    useEffect(() => {
        getLeadInfo();
    }, [])

    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })
    }

    const onSubmit = event => {
        event.preventDefault();
        console.log(values);
        console.log("time", nextFollowupTime);
        let userId = user._id;
        if (!name || !email || !country || !company 
            || !description || !city || !roleInOrganisation
            || !businessDev || !phone) {
            setValues({
                ...values,
                error: "All fields are mandatory"
            })
        } else {
            updateLead({
                    name,
                    email,
                    company,
                    roleInOrganisation,
                    description,
                    phone,
                    country,
                    businessDev,
                    contacted,
                    city,
                    followups,
                    remarks,
                    followupTime: nextFollowupTime
                },leadId, userId)
                .then(response => {
                    console.log(response);
                    if (response.data.error) {
                        setValues({
                            ...values,
                            error: response.data.error,
                            success: false
                        })
                    } else {
                        setValues({
                            ...values,
                            success: true
                        });
                    }
                })
                .catch(err => console.log(err));
        }
    }
    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left mt-3">
                    <div className="alert alert-success"
                        style={{ display: success ? "" : "none" }}>
                        Lead was updated successfully.
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
        <Header title="Update Lead" />
        {successMessage()}
        {errorMessage()}
        <form style={{ width: "100%" }} className="card mb-5 shadow-sm">
            <div className="row p-3">
                <div className="col-lg-6">
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input type="text" className="form-control" id="fullName" placeholder="Enter Full Name" 
                            onChange={handleChange("name")} value={name}  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange("email")}
                            placeholder="example@gmail.com" value={email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="company">Company</label>
                            <input type="text" className="form-control" id="company" aria-describedby="company" placeholder="Enter company name" onChange={handleChange("company")} value={company} />
                        </div>
                        <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="text" className="form-control" value={phone}
                                aria-describedby="phone" placeholder="Enter number" onChange={handleChange("phone")}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <input type="text" className="form-control" value={roleInOrganisation}
                            aria-describedby="role" placeholder="Enter role" onChange={handleChange("roleInOrganisation")}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Project Description</label>
                            <textarea type="text" rows="4" className="form-control" id="description"
                            onChange={handleChange("description")} aria-describedby="roleInCompany" placeholder="Enter project description ..." value={description} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="remarks">Call Remarks</label>
                            <textarea type="text" rows="4" className="form-control" id="remarks"
                            onChange={handleChange("remarks")} aria-describedby="roleInCompany" placeholder="Enter remarks ..." value={remarks} />
                        </div>
                </div>
                <div className="col-lg-6">
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input type="text" className="form-control" id="country" aria-describedby="country" placeholder="Country" onChange={handleChange("country")} value={country} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control" id="city" aria-describedby="city" placeholder="Enter city" onChange={handleChange("city")} value={city} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contacted">Contacted</label>
                            <select type="text" className="form-control" id="contacted" onChange={handleChange("contacted")}>
                                <option>Select Contacted</option>
                                <option>yes</option>
                                <option>no</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="followups">Followups</label>
                            <select type="text" className="form-control" id="followups" onChange={handleChange("followups")}>
                                <option>Select followups required today</option>
                                <option>yes</option>
                                <option>no</option>
                            </select>
                        </div>
                        <div className="form-group">
                        <label htmlFor="followup Date">Next Followup Date</label>
                        <div className="d-block">
                            <DateTimePicker
                                amPmAriaLabel="Select AM/PM"
                                calendarAriaLabel="Toggle calendar"
                                clearAriaLabel="Clear value"
                                dayAriaLabel="Day"
                                hourAriaLabel="Hour"
                                maxDetail="second"
                                minuteAriaLabel="Minute"
                                monthAriaLabel="Month"
                                nativeInputAriaLabel="Date and time"
                                onChange={date => setNextFollowupTime(date)}
                                secondAriaLabel="Second"
                                value={nextFollowupTime}
                                yearAriaLabel="Year"
                                />
                        </div>
                        </div>
                        <button type="button" onClick={onSubmit} className="btn btn-outline-success float-right">Submit</button>
                        <button type="button" onClick={() => history.goBack()} className="btn btn-outline-danger float-right mr-3">Cancel</button>
                        <button type="button" onClick={() => history.goBack()} className="btn btn-outline-dark float-right mr-3">Go back</button>
                </div>
            </div>
        </form>
    </Base>
    )
}

export default UpdateLead;
