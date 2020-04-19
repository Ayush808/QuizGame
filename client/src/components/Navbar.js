import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth'


const Navbar = ({ history }) => {

    const { user } = isAuthenticated();

    return (
        <header className="navbar navbar-dark bg-dark">
            <div className="container">
                <div className="navbar-brand">
                    <i className="fa fa-hourglass-end"></i> <b className="text-light">Lets Quiz</b>
                </div>
                <nav className="nav navbar-body">
                    <ul className="nav navbar-right">
                        {!isAuthenticated() && (
                            <Fragment>
                                <Link to='/signin' className="btn btn-success mr-4">Sign-In</Link>
                                <Link to='/signup' className="btn btn-outline-primary">New User</Link>
                            </Fragment>
                        )}
                        {isAuthenticated() && user.role === 0 && (
                            <Fragment>
                                <Link to='/user/dashboard' className="btn btn-success mr-4">Dashboard</Link>
                            </Fragment>
                        )}
                        {isAuthenticated() && user.role === 1 && (
                            <Fragment>
                                <Link to='/admin/dashboard' className="btn btn-success mr-4">Dashboard</Link>
                            </Fragment>
                        )}

                        {isAuthenticated() && (
                            <Fragment>
                                <Link to='/leaderboard' className="btn btn-warning mr-4">Leaderboard</Link>
                            </Fragment>
                        )}

                        {isAuthenticated() && (
                            <Fragment>
                                <li className="nav-item">
                                    <span
                                        className="btn btn-danger"
                                        style={{ cursor: "pointer", color: "black" }}
                                        onClick={() => signout(() => {
                                            history.push('/')
                                        })}>
                                        Signout
                                    </span>
                                </li>
                            </Fragment>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default withRouter(Navbar)