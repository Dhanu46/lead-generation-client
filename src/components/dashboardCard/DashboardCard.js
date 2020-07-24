import React from 'react'

function DashboardCard({ title, data, icon, color}) {
    return (
            <div className="card mb-4 shadow-sm" >
                <div className="card-header">
                    <h3 style={{ fontSize: "27px"}}>{title}</h3>
                </div>
                <div className="card-body">
                    <span className="card-title mr-3" style={{ fontSize: "32px"}}>{data}</span>
                    <span style={{ fontSize: "32px", color: {color} }}>
                        <i className={icon} aria-hidden="true"></i>
                    </span>
                </div>
            </div>
    );
}

export default DashboardCard;
