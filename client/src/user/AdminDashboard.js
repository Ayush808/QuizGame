import React from "react"
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Navbar from "../components/Navbar"

const AdminDashboard = () => {

    const { user: { name, email, role } } = isAuthenticated()

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin Links</h4>
                <li className="list-group-item">
                    <Link className="nav-link" to='/admin/question/create'>Create Question</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to='/admin/viewrequseted'>View Requested Question</Link>
                </li>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Admin Information</h3>
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
        <div className="container-fluid bg-dark mb-4">
            <Navbar />
            <div className="row bgimg">
                <div className="col-sm-3">
                    {adminLinks()}
                </div>
                <div className="col-sm-9">
                    {adminInfo()}
                </div>
                <div className="col-sm-12">
                    <h2 style={{ textAlign: "center", color: "orange" }}><b>Quiz-Application</b></h2>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard