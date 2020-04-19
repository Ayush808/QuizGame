import React from "react"
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Navbar from "../components/Navbar"

const Dashboard = () => {
    const { user: { _id, name, email, role } } = isAuthenticated()

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <li className="list-group-item">
                    <Link className="nav-link" to='/user/suggest/question'>Suggest Question</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to={`/user/dashboard`}>Dashboard</Link>
                </li>
            </div>
        )
    }

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {name}
                    </li>
                    <li className="list-group-item">
                        {email}
                    </li>
                    <li className="list-group-item">
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <div className="container-fluid bg-dark">
            <Navbar />
            <div className="row bgimg">
                <div className="col-3">
                    {userLinks()}
                    <Link to='/testlink' className="btn btn-primary btn-block">Take Test</Link>
                </div>
                <div className="col-9">
                    {userInfo()}
                </div>
            </div>
            <div className="align-items-center">
                <h2 style={{ textAlign: "center", color: "orange" }}><b>Quiz-Application</b></h2>
                <p style={{ textAlign: "center" }}><mark>Share your knowledge here...! (Take-Test and upscale knowledge)</mark></p>
            </div>
        </div>
    )
}

export default Dashboard