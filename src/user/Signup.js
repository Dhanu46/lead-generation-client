import React, { useState } from 'react'
import { signup } from '../auth/helper';
import { Link } from 'react-router-dom';
import './Signin.css';
import Logo from '../images/mainlogosolo.png';

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const {name, email, password, error, success} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value })
    }

    const onSubmit = event => {
        event.preventDefault();
        if(!name || !email || !password) {
            setValues({
                ...values,
                error: "All fields are mandatory"
            })
        } else {
            setValues({...values, error: false})
            signup({name, email, password})
            .then(response => {
                if (response.data.error) {
                    setValues({ ...values, error: response.data.error, success: false })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    })
                }
            })
            .catch(err => console.log(err));
        }
    }

    const signUpForm = () => {
        return (
            <div className="form-body">
                <form className="form-signin">
                    <div className="text-center">
                        <img className="img-fluid" src={Logo} alt="" width="150" />
                    </div>
                    <h4 className="text-center display-3"><strong>Welcome!</strong></h4>
                    <div className="form-label-group">
                        <input type="text" onChange={handleChange("name")} className="form-control" placeholder="Enter Name" required autoFocus />
                        <label>Name</label>
                    </div>
                    <div className="form-label-group">
                        <input type="email" onChange={handleChange("email")} className="form-control" placeholder="Email address" required autoFocus />
                        <label>Email address</label>
                    </div>

                    <div className="form-label-group">
                        <input type="password" id="inputPassword" onChange={handleChange("password")} className="form-control" placeholder="Password" required />
                        <label>Password</label>
                    </div>
                    <p>Already have an account! <Link to="/signin">Login Here</Link></p>
                    <button className="btn btn-lg btn-dark btn-block" type="button" onClick={onSubmit} >Submit</button>
                    <p className="mt-3 text-muted text-center">&copy;2020 - Solo-SOS</p>
                </form>
            </div>
        )
    };

    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left mt-3">
                    <div className="alert alert-success"
                        style={{ display: success ? "" : "none" }}>
                        New Account was created successfully. Please <Link to="/signin">Login Here</Link>
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
        <div className="Signin">
            <div className="container-fluid">
                {successMessage()}
                {errorMessage()}
                {signUpForm()}
            </div>
        </div>
    )
}

export default Signup;