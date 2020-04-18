import React from "react"
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Navbar from "../components/Navbar"

const Dashboard = () => {

    return (
        <div className="container-fluid bg-dark">
            <Navbar />
            <h2 className="text-center"><mark>TEST INSTRUCTIONS</mark></h2>
            <hr />
            <p className="text-primary"><b>General Instructions</b></p>
            <p className="text-light" style={{ textAlign: "left" }}>The timer at the top of the screen will display the time left for the completion of the assessment.</p>
            <p className="text-light" style={{ textAlign: "left" }}>The result of this assessment will be diplayed to final Leader-Board along with top performer.</p>
            <p className="text-light" style={{ textAlign: "left" }}>Don't Back the window.</p>
            <p className="text-light" style={{ textAlign: "left" }}>Keep calm and do your best, Time matters</p>
            <br />
            <p className="text-primary"><b>Assessment related Instructions</b></p>
            <p className="text-light" style={{ textAlign: "left" }}>The duration of this assessment is 3 minutes.</p>
            <p className="text-light" style={{ textAlign: "left" }}>It consists of - Objective (MCQ) (10 questions) with (4 Options).</p>
            <br /><br />
            <div style={{ marginLeft: "44%" }}>
                <Link to='/starttest' className="btn btn-success">Start Test</Link>
            </div>
        </div>
    )
}

export default Dashboard