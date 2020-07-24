import React from 'react';
import Logo from '../../images/undraw_hey_email_liaa.svg';

function Header({title}) {
    return (
        <React.Fragment>
            <div className="d-flex align-items-center p-3 my-3 text-dark-50 rounded shadow-sm">
                <img className="mr-3" src={Logo} alt="" width="48" height="48"  />
                <div className="lh-100">
                <h6 className="mb-0 lh-100">{title}</h6>
                <small>Since 2020</small>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header;
