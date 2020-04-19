import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";
import Navbar from "../components/Navbar";

const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated()

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(
                    data,
                    () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        })
                    }
                )
            }
        });
    };

    const signUpForm = () => (
        <div className="bgimg">
            <div className="container x h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="user_card">
                        <div className="d-flex justify-content-center">
                            <div className="brand_logo_container">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQzQVaaXz9t2NTS98epsrYqugBStZPz8LNz_OnVb0IobSWTOqXv&usqp=CAU" className="brand_logo" alt="Logo" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center form_container">
                            <form>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="email" onChange={handleChange("email")} className="form-control input_user" value={email} placeholder="username" />
                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input onChange={handleChange("password")} type="password" name="" className="form-control input_pass" value={password} placeholder="password" />
                                </div>
                                <div className="d-flex justify-content-center mt-3 login_container">
                                    <button onClick={clickSubmit} type="button" name="button" className="btn login_btn btn-inline">Login</button>
                                </div>
                            </form>
                        </div>

                        <div className="mt-4">
                            <div className="d-flex justify-content-center links">
                                Don't have an account? <Link to='/signup' className="ml-2">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to='/' />
        }

    };

    return (
        <div>
            <Navbar />
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </div>
    );
};

export default Signin;