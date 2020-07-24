import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom';
import Logo from '../images/mainlogosolo.png';
import './Signin.css'
import { signin, authenticate, isAuthenticated } from '../auth/helper';
import { useDispatch } from 'react-redux';

const Signin = () => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: "a@roshan.com",
        password: "12345",
        error: "",
        loading: false,
        didRedirect: false
    })
    const { user } = isAuthenticated();

    const { email, password, error, loading, didRedirect } = values


    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })
    }

    const loadingMessage = () => {
        return(
            loading && (<div className="row">
                            <div className="col-md-6 offset-sm-3 text-left">
                                <div className="alert alert-info"
                                    style={{ display: loading ? "" : "none" }}>
                                    Loading ...
                                </div>
                            </div>
                        </div>
            )    
        )
    };

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to="/" />
            } else {
                return <Redirect to="/" />
            }
        }

        if (isAuthenticated()) {
            return <Redirect to = "/" />
        }
    }

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

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            error: false,
            loading: true
        });
        signin({
                email,
                password
            })
            .then(response => {
                if (response.data.error) {
                    console.log(response.data.error);
                    setValues({
                        ...values,
                        error: response.data.error,
                        loading: false
                    });
                } else {
                    authenticate(response.data, () => {
                        setValues({
                            ...values,
                            didRedirect: true,
                        });
                        dispatch({
                            type: "SET_CURRENT_USER",
                            payload: response.data.user,
                            token: response.data.token
                        });
                        
                    })
                }
            })
            .catch(err => console.log(error));
    }

    const signInForm = () => {
        return (
            <div className="form-body">
                <form className="form-signin">
                    <div className="text-center">
                        <img className="mb-4" src={Logo} alt="" width="150" />
                    </div>
                    <h4 className="text-center display-3"><strong>Welcome!</strong></h4>
                    <div className="form-label-group">
                        <input type="email" id="inputEmail" onChange={handleChange("email")} className="form-control" placeholder="Email address" required autoFocus />
                        <label htmlFor="inputEmail">Email address</label>
                    </div>

                    <div className="form-label-group">
                        <input type="password" id="inputPassword" onChange={handleChange("password")} className="form-control" placeholder="Password" required />
                        <label htmlFor="inputPassword">Password</label>
                    </div>
                    <p>Don't have an account! <Link to="/signup">Signup Here</Link></p>
                    <button className="btn btn-lg btn-dark btn-block" onClick={handleSubmit} type="button">Sign in</button>
                    <p className="mt-5 mb-3 pb-5 text-dark text-center border-bottom">&copy; 2020 - Solo-SOS</p>
                </form>
            </div>
        )
    }

    return (
        <div className="Signin">
            <div className="container-fluid">
                {loadingMessage()}
                {errorMessage()}
                {signInForm()}
                {performRedirect()}
            </div>
        </div>
    )
}

export default Signin;