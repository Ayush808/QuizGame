import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import signup from '../auth'
import Navbar from '../components/Navbar'

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const { name, email, password, success, error } = values

    // higher order function is the function that return the another function
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = e => {
        e.preventDefault()
        signup({ name, email, password }) // here key and value are same so dont need of name: name , password: password , etc: etc
            .then(data => {

                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }

            })
    }

    const signUpForm = () => (
        <div className="container h-100">
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
                                <input type="text" onChange={handleChange("name")} className="form-control input_user" value={name} placeholder="username" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-append">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input type="email" onChange={handleChange("email")} className="form-control input_user" value={email} placeholder="Email" />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-append">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input onChange={handleChange("password")} type="password" name="" className="form-control input_pass" value={password} placeholder="password" />
                            </div>
                            <div className="d-flex justify-content-center mt-3 login_container">
                                <button onClick={clickSubmit} type="button" name="button" className="btn login_btn">Register</button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-4">
                        <div className="d-flex justify-content-center links">
                            Don't have an account? <Link to='/signin' className="ml-2">Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    const showError = () => {
        return (
            <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                {error}
            </div>
        )
    }

    const showSuccess = () => {
        return (
            <div className="alert alert-info" style={{ display: success ? "" : "none" }}>
                New Account is created. Please SignIn : <Link to='/signin'>SignIn</Link>
            </div>
        )
    }

    return (
        <div>
            <Navbar />
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </div>
    )
}

export default Signup