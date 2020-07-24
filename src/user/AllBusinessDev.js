import React, { useState, useEffect } from 'react'
import Base from '../core/Base';
import Header from '../components/Header/Header';
import { getAllUsers } from './helper/userapicall';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import CreateRoom from './CreateRoom';
import { v1 as uuid } from "uuid";

function AllBusinessDev(props) {
    const [users, setUsers] = useState([]);
    const currentUserId = isAuthenticated().user._id;
    const allUsers = () => {
        getAllUsers()
            .then(response => {
                console.log(response);
                setUsers(response.data);
            })
            .catch(err => {
                console.log(err)
            });
    }

    const create = () => {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }

    useEffect(() => {
        allUsers();
    }, [])
    return (
        <Base>
            <Header title="All Team Members" />
            <div className="my-3 p-3 bg-white rounded shadow-sm">
                {
                    users.filter(user => user._id !== currentUserId)
                        .map((user, index) => {
                        return (
                            // <Link to={`room/${user._id}`} key={user._id} style={{ textDecoration: "none", marginTop: "6px", marginBottom: "15px" }}>
                            <React.Fragment key={user._id}>
                                <div className={`media p-3 rounded mb-1 text-muted bg-light my-3`} id="Lead-List-Item">
                                <svg className="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32" fill={index % 2 === 0 ? "#6f42c1" : "#e83e8c"}><title>Placeholder</title><rect width="100%" height="100%"/></svg>
                                <p className="media-body pb-3 mb-0 small lh-125">
                                    <strong className="d-block text-gray-dark">Call @ {user.name}</strong>
                                </p>
                                    <button onClick={create} className="btn btn-success">Create room</button>
                                </div>
                             </React.Fragment>
                        );
                    })
                }
                </div>
        </Base>
    )
}

export default AllBusinessDev
